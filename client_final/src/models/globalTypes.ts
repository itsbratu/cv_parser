export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;

export type TupleUnion<U extends string, R extends string[] = []> = {
  [S in U]: Exclude<U, S> extends never
    ? [...R, S]
    : TupleUnion<Exclude<U, S>, [...R, S]>;
}[U] &
  string[];
