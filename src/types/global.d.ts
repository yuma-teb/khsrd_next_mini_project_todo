export {};

declare global {
	interface APIResponse<T> {
		message: string;
		status: string;
		payload: T;
	}
}
