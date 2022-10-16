import { lambdaHandler } from "../../src/handlers/getInventory";

describe("Unit test for getItemsFromDB handler", function () {
  it("verifies successful response", async () => {
    const result = await lambdaHandler();
    expect(result.statusCode).toEqual(200);
  });
});
