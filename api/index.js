import main from "../src/index.js";

export default async function handler(request, response) {
    const data = await main();
    response.status(200).send(data);
}
