interface IUserInfo {
	email: string;
	password: string;
}
export async function loginService(credentails: IUserInfo) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/auth/login`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credentails),
		}
	);

	console.log("Await userussdfsafdasdf", res);

	return;
}
