// Add type-safe to Omit utility.
export type OmitTyped<T, K extends keyof T> = Omit<T, K>;

// Prevents T props.
export type Never<T> = { [P in keyof T]: never };
