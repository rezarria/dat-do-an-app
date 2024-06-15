import { compare } from "fast-json-patch";

export { default as useApi } from "./hooks/useApi"
export { default as useAXIOS } from "./store/useAXIOS"
export type Unpacked<T> =
	T extends (infer U)[] ? U :
	T extends (...args: any[]) => infer U ? U :
	T extends Promise<infer U> ? U :
	T;

export function createPatch(oldData: any, newData: any) {
	return compare(oldData, newData)
}