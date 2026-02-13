export const arrayify = <T>(
    value?: T | null
): Array<T> => {
    if (!value) {
        return [];
    }

    return Array.isArray(value) ? value : [value];
};
