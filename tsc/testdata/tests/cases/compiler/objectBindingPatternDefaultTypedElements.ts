// @strict: true
// @noEmit: true
// @target: es2015

// Explicit any already supplies a type; it must not become an implicit-any error.
export function annotatedAny({ value }: any = {}) {
    const text: string = value;
}
export const contextualAny: (options?: any) => void = ({ value } = {}) => {
    const text: string = value;
};

// Index signatures supply types even without named properties.
export const stringIndex: (options?: { [key: string]: number }) => void = ({ value } = {}) => {
    const text: string = value;
};
export const numberIndex: (options?: { [key: number]: number }) => void = ({ 0: value } = {}) => {
    const text: string = value;
};
export const nestedIndex: (options?: { [key: string]: { value?: number } }) => void = ({ entry: { value } = {} } = {}) => {
    const text: string = value;
};

// A nested object can obtain its declared type through an array or iterable.
export function annotatedArray([{ value } = {}]: { value?: number }[]) {
    const text: string = value;
}
export const contextualArray: (options?: { value?: number }[]) => void = ([{ value } = {}] = []) => {
    const text: string = value;
};
export function annotatedTuple([, { value } = {}]: [number, { value?: number }?]) {
    const text: string = value;
}
export function annotatedIterable([{ value } = {}]: Iterable<{ value?: number }>) {
    const text: string = value;
}

// Missing tuple elements and untyped parameters must keep their diagnostics.
export function missingTuple([, { value } = {}]: [number]) {
    value;
}
export const untyped = ({ value } = {}) => value;
