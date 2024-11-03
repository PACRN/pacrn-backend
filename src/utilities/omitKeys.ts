type OmitKeys<T, K extends keyof T> = {
    [P in Exclude<keyof T, K>]: T[P];
};

export function omit<T, K extends keyof T>(obj: T, keys: K[]): OmitKeys<T, K> {
    const result: Partial<T> = {}; // Use Partial<T> to initialize the result as an object with optional properties.

    (Object.keys(obj) as Array<keyof T>).forEach((key) => {
        if (!keys.includes(key as K)) {
            result[key] = obj[key]; // Type assertion to satisfy TypeScript.
        }
    });

    return result as OmitKeys<T, K>; // Cast result to the correct return type.
}