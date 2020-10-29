export const required = (value) => value.trim().length >= 1;
export const minLen = len => (value) => value.trim().length >= len;
export const maxLen = len => (value) => value.trim().length <= len;
export const regex = (pattern) => (value) => pattern.test(value);


