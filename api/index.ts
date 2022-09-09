import type { VercelRequest, VercelResponse } from "@vercel/node";
import main from "../src/index.js";

export default async function handler(
    request: VercelRequest,
    response: VercelResponse
) {
    const currency = request.query?.currency;
    if (typeof currency !== "string") {
        // response.status(400).send("Invalid currency");
    }

    console.log(currency);

    const data = await main();

    console.log({ data });
    response.status(200).json(data);
}
