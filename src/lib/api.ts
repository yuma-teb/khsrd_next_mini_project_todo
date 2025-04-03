import headerToken from "./header";

export async function fetchAPI<T>(
	url: string,
	options: RequestInit = {}
): Promise<APIResponse<T>> {
	const headers = await headerToken();
	try {
		const response = await fetch(url, {
			...options,
			headers,
			credentials: "include",
		});
		console.log("Rsponsenesnsen", response);
		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}

		const data: APIResponse<T> = await response.json();
		return data;
	} catch (error) {
		console.error("API Fetch Error:", error);
		throw error;
	}
}
