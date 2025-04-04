"use server";
import { auth } from "@/auth";

const headerToken = async () => {
	const session = await auth();

	return {
		accept: "*/*",
		"Content-Type": "application/json",
		Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9VU0VSIn1dLCJzdWIiOiJ5YW11QGdtYWlsLmNvbSIsImlhdCI6MTc0MzY5NjY1MiwiZXhwIjoxNzQzNzgzMDUyfQ.dH_kLm_pSKiu0jTGOnNJJCVu-iRH238KYihzZ0a_kr661bA3oqKzhwqb-Wr_xpoPIvLE_Kp_at_cRuqbNjawqg`,
	};
};

export default headerToken;
