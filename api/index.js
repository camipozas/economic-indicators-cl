import main from "../src/index.js";

export default async function handler(request, response) {
    const data = await main();

    console.log({ data });
    response.status(200).json(data);
}
