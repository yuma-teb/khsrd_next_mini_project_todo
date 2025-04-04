import headerToken from "./header";

export async function fetchAPI<T>(
	url: string,
	options: RequestInit = {}
): Promise<APIResponse<T>> {
	const headers = await headerToken();
	try {
		console.log(url, options, headers);
		const response = await fetch(url, {
			...options,
			headers,
		});

		const text = await response.text();
		if (!text.trim()) {
			return { message: "", status: "OK", payload: [] } as APIResponse<T>;
		}

		const data: APIResponse<T> = JSON.parse(text);
		return data;
	} catch (error) {
		console.error("API Fetch Error:", error);
		throw error;
	}
}
