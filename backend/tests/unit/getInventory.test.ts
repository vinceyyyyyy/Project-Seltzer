import { lambdaHandler } from "../../functions/getInventory";

describe("Unit test for getItemsFromDB handler", function () {
  it("verifies successful response", async () => {
    const result = await lambdaHandler();
    expect(result.statusCode).toEqual(200);

    const resultBody = JSON.parse(result.body);
    expect(resultBody.brand).toEqual("LaCroix");
  });
});
