type Unarray<T> = T extends Array<infer U> ? U : T;

export function arrayify<T>(value: T | null | undefined): Array<Unarray<T>> {
    if (value == null) return [];
    return (Array.isArray(value) ? value : [value]) as Array<Unarray<T>>;
}
