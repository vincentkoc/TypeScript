// @strict: true
// @noEmit: true
// @target: es2015
// @allowJs: true
// @checkJs: true

// @filename: /rest.ts
// Rest bindings must carry the remaining tuple or array type into nested defaults.
export function tupleRest([... [{ value } = {}]]: [{ value?: number }]) {
    const text: string = value;
}
export function arrayRest([... [{ value } = {}]]: { value?: number }[]) {
    const text: string = value;
}
export function tupleRestOffset([, ...[{ value } = {}]]: [boolean, { value?: number }]) {
    const text: string = value;
}
export const contextualRest: (options: { value?: number }[]) => void = ([... [{ value } = {}]]) => {
    const text: string = value;
};
export function iterableRest([... [{ value } = {}]]: Iterable<{ value?: number }>) {
    const text: string = value;
}
export function constrainedTupleRest<T extends [boolean, { value?: number }]>([, ...[{ value } = {}]]: T) {
    const text: string = value;
}
export function anyRest([... [{ value } = {}]]: any) {
    const text: string = value;
}

// Property names and generic constraints still provide the element type.
declare const key: unique symbol;
export function symbolKey({ [key]: { value } = {} }: { [key]?: { value?: number } }) {
    const text: string = value;
}
export function genericConstraint<T extends { inner?: { value?: number } }>({ inner: { value } = {} }: T) {
    const text: string = value;
}

export class Accessor {
    get options(): { inner?: { value?: number } } { return {}; }
    set options({ inner: { value } = {} }) {
        const text: string = value;
    }
}

// A default with no supplied type must keep its implicit-any diagnostic.
export function untypedRest([... [{ value } = {}]] = []) {
    value;
}
export function missingRestTuple([, ...[{ value } = {}]]: [boolean]) {
    value;
}

// The originally reported object cases and their array counterpart stay well typed.
interface IssueInner {
    a?: number;
    b?: number;
}
interface IssueOuter {
    inner?: IssueInner;
}
export function withSibling({ inner: { a = 1, b } = {} }: IssueOuter) {
    const first: number = a;
    const second: number | undefined = b;
    return [first, second];
}
export function alone({ inner: { b } = {} }: IssueOuter) {
    const second: number | undefined = b;
    return second;
}
export function arrayForm({ inner: [a = 1, b] = [] }: { inner?: number[] }) {
    const first: number = a;
    const second: number | undefined = b;
    return [first, second];
}

// @filename: /returnedCallback.ts
// A promised callback receives its contextual parameter type through the return.
export async function prepareDeletion(): Promise<(options?: {
    assertCurrent?: () => void;
    sessionEntryCurrent?: () => boolean;
    retainedSessionKeys?: ReadonlySet<string>;
}) => Promise<void>> {
    return async ({ assertCurrent, sessionEntryCurrent, retainedSessionKeys } = {}) => {
        const assertion: (() => void) | undefined = assertCurrent;
        const current: (() => boolean) | undefined = sessionEntryCurrent;
        const keys: ReadonlySet<string> | undefined = retainedSessionKeys;
        const wrongAssertion: string = assertCurrent;
        const wrongCurrent: string = sessionEntryCurrent;
        const wrongKeys: string = retainedSessionKeys;
    };
}

// @filename: /genericCallback.ts
// Indexed generic signatures retain the intersection's optional property types.
interface WriteContext {
    write: <T>(operation: () => T, options?: { busyTimeoutMs?: number; operationLabel?: string }) => T;
    writeAdmitted: <T>(operation: () => T, options?: Parameters<WriteContext["write"]>[1] & {
        receipt?: "result";
        transactionEnvironment?: "process";
    }) => T;
}
export const writeAdmitted: WriteContext["writeAdmitted"] = (
    operation,
    { receipt, transactionEnvironment, ...options } = {},
) => {
    const kind: "result" | undefined = receipt;
    const environment: "process" | undefined = transactionEnvironment;
    const timeout: number | undefined = options.busyTimeoutMs;
    const wrongKind: "other" = receipt;
    const wrongEnvironment: "other" = transactionEnvironment;
    const wrongTimeout: boolean = options.busyTimeoutMs;
    return operation();
};
const writtenNumber = writeAdmitted(() => 1, { receipt: "result", transactionEnvironment: "process" });
const numberResult: number = writtenNumber;
const wrongResult: string = writtenNumber;

// @filename: /signature.js
// JSDoc function signatures type parameters even without contextual functions.
/** @type {(options?: { value?: number }) => void} */
export function fullSignature({ value } = {}) {
    /** @type {string} */
    const text = value;
}

/** @type {(options?: { inner?: { value?: number } }) => void} */
export function nestedSignature({ inner: { value } = {} } = {}) {
    /** @type {string} */
    const text = value;
}

/** @param {{ value?: number }} options */
export function parameterTag({ value } = {}) {
    /** @type {string} */
    const text = value;
}
