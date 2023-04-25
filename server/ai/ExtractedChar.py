import typing


class ExtractedChar(typing.NamedTuple):
    char: str
    font_size: float
    font_type: str
    x_top_left: float
    y_top_left: float
    x_bottom_right: float
    y_bottom_right: float
