import { derived, type Readable } from 'svelte/store'

export function dedupe<T>(store: Readable<T>): Readable<T> {
	let previous: T;

	return derived(store, ($value, set) => {
		if ($value !== previous) {
			previous = $value
			set($value)
		}
	})
}
