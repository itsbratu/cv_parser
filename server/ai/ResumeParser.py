import aiofiles
import tqdm
import typing
import numpy as np
import math
import pprint

from sklearn.cluster import DBSCAN
from ai.ExtractedChar import ExtractedChar
from generics import Singleton


class ResumeParser(metaclass=Singleton):
    fs_gap: float
    eps_constant_interval_size: float
    eps_interval_start: float
    eps_interval_final: float
    eps_interval_size: float 
    
    def __init__(self, fs_gap: float, eps_constant_interval_size: float, eps_interval_start: float, eps_interval_final: float, eps_interval_size: float) -> None:
        self.fs_gap = fs_gap
        self.eps_constant_interval_size = eps_constant_interval_size
        self.eps_interval_start = eps_interval_start
        self.eps_interval_final = eps_interval_final
        self.eps_interval_size = eps_interval_size
    
    def __sort_characters_by_fs(
        self, chars: typing.List[ExtractedChar]
    ) -> dict[float, typing.List[ExtractedChar]]:
        characters_by_fs = {}
        for c in chars:
            assigned_to_group = False
            for fs in characters_by_fs.keys():
                print(fs)
                if c.font_size == fs or (
                    c.font_size >= fs - self.fs_gap and c.font_size <= fs + self.fs_gap
                ):
                    characters_by_fs[fs].append(c)
                    assigned_to_group = True
                    break
            if not assigned_to_group:
                characters_by_fs[c.font_size] = [c]

        sorted_chars_by_fs = dict(sorted(characters_by_fs.items()))
        return sorted_chars_by_fs

    def __get_input_clustering(self, chars: typing.List[ExtractedChar]) -> np.ndarray:
        return np.array(
            [
                [
                    (c.x_top_left + c.x_bottom_right) / 2,
                    (c.y_top_left + c.y_bottom_right) / 2,
                ]
                for c in chars
            ]
        )

    def __calculate_clustering_eps(
        self, chars: typing.List[ExtractedChar]
    ) -> dict[float, float]:
        fs_picked_eps = {}
        
        for fs in enumerate(chars):
            current_fs_chars = chars[fs]
            X_trial = self.__get_input_clustering(current_fs_chars)

            eps_range = np.linspace(self.eps_interval_start, self.eps_interval_final, self.eps_interval_size)
            interval_size = -1
            interval_num_clusters = -1

            for eps_trial in tqdm.tqdm(eps_range):
                if interval_size == self.eps_constant_interval_size:
                    fs_picked_eps[fs] = eps_trial
                    break
                clustering = DBSCAN(eps=eps_trial).fit(X_trial)
                num_clusters = len(set([l for l in clustering.labels_ if l != -1]))
                if num_clusters != 0:
                    if interval_num_clusters == num_clusters:
                        interval_size += 1
                    else:
                        interval_size = 1
                        interval_num_clusters = num_clusters

        return fs_picked_eps

    def __calculate_cluster_centroid(
        self,
        chars: typing.List[ExtractedChar],
    ) -> tuple[float, float, float]:
        mean_X = 0
        mean_Y = 0
        avg_fs = 0
        nmb_chars = len(chars)
        for char in chars:
            mean_X += (char.x_top_left + char.x_bottom_right) / 2
            mean_Y += (char.y_top_left + char.y_bottom_right) / 2
            avg_fs += char.font_size
        return (mean_X / nmb_chars, mean_Y / nmb_chars, avg_fs / nmb_chars)

    def __get_chars_per_cluster(
        self, chars: typing.List[ExtractedChar]
    ) -> dict[int, typing.List[ExtractedChar]]:
        sorted_chars_by_fs = self.__sort_characters_by_fs(chars)
        fs_picked_eps = self.__calculate_clustering_eps(sorted_chars_by_fs)
        clusters_chars = {}
        cluster_id = 0

        for fs in fs_picked_eps:
            chars_by_font = sorted_chars_by_fs[fs]
            X_font = self.__get_input_clustering(chars_by_font)
            clustering = DBSCAN(eps=fs_picked_eps[fs]).fit(X_font)
            labels = clustering.labels_

            for currentLabel in set(labels):
                for index, l in enumerate(labels):
                    if l == -1:
                        continue
                    if l == currentLabel:
                        if not cluster_id in clusters_chars:
                            clusters_chars[cluster_id] = []
                            clusters_chars[cluster_id].append(chars_by_font[index])
                cluster_id += 1

        pprint.pprint(clusters_chars)
        return clusters_chars

    def __filter_clusters_centroids_by_position_and_fs(
        self,
        current_cluster_centroid_value: tuple[float, float, float],
        other_cluster_centroid_value: tuple[float, float, float],
    ) -> True | False:
        if other_cluster_centroid_value[1] <= current_cluster_centroid_value[1]:
            return False
        if other_cluster_centroid_value[2] <= current_cluster_centroid_value[2]:
            return False
        return True

    def __get_Euclidian_distance_between_clusters_centroids(
        self,
        first_cluster_centroid: tuple[float, float, float],
        second_cluster_centroid: tuple[float, float, float],
    ) -> float:
        return math.sqrt(
            (second_cluster_centroid[0] - first_cluster_centroid[0]) ** 2
            + (second_cluster_centroid[1] - first_cluster_centroid[1]) ** 2
        )
        
    def __generate_clusters_tree(self, chars: typing.List[ExtractedChar]) -> tuple[int, dict[int, typing.List[int]]]:
        clusters_chars = self.__get_chars_per_cluster(chars)
        clusters_centroids = {}
        clusters_tree = {}
        head_clusters_tree_index = -1

        for cluster_index in clusters_chars.keys():
            clusters_centroids[cluster_index] = self.__calculate_cluster_centroid(clusters_chars[cluster_index])

        cluster_centroid_values = [(*v, idx) for idx, v in clusters_centroids.items()]
        
        for cluster_centroid_value in cluster_centroid_values:
            viable_clusters = [l for l in cluster_centroid_values if self.__filter_clusters_centroids_by_position_and_fs(cluster_centroid_value, l)]
            clusters_distance = -1
            found_cluster = ()
            for viable_cluster in viable_clusters:
                current_Euclidian_distance = self.__get_Euclidian_distance_between_clusters_centroids(cluster_centroid_value, viable_cluster)
                if(current_Euclidian_distance < clusters_distance or clusters_distance == -1):
                    clusters_distance = current_Euclidian_distance
                    found_cluster = viable_cluster
            if found_cluster == ():
                head_clusters_tree_index = cluster_centroid_value[3]
            else:
                child_index = cluster_centroid_value[3]
                parent_index = found_cluster[3]
                if not parent_index in clusters_tree:
                    clusters_tree[parent_index] = []
                clusters_tree[parent_index].append(child_index)

        return (head_clusters_tree_index, clusters_tree)

    def parse(self, chars: typing.List[ExtractedChar]):
        pprint.pprint(self.__generate_clusters_tree(chars))
    