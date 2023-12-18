import type { VercelRequest, VercelResponse } from "@vercel/node";
import { main } from "../src/index.js";
import { query } from "../src/query.js";

/**
 * It takes a request, and returns a response
 * @returns a promise that resolves to an array of objects.
 */
export default async function handler(
	request: VercelRequest,
	response: VercelResponse
) {
	const currency = request.query?.currency;

	console.log(currency);
	if (currency === undefined) {
		try {
			console.log("querying");
			const data = await main();
			console.log({ data });
			return response.status(200).json(data);
		} catch (error) {
			console.log(error);
		}
	}

	const currencies =
		typeof currency === "string" ? currency.split(",") : currency;

	const data = await query(currencies);
	response.status(200).json(data);
}
