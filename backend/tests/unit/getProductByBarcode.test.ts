import { lambdaHandler } from "../../functions/getProductByBarcode";

import { goodRequest, badRequest, randomRequest } from "../../events/requests.js";

describe("Unit test for getProductByBarcode handler", function () {
  it("verifies successful response", async () => {
    const result = await lambdaHandler(goodRequest as any);
    expect(result.statusCode).toEqual(200);

    const resultBody = JSON.parse((result as any).body);
    expect(resultBody.code).toEqual("OK");
    expect(resultBody.items[0].title).toEqual(
      "Bowknot Jingle Bell Rings Pendant for Christmas Tree And Door Hanging Decor",
    );
  });

  it("should fail with bad response", async () => {
    const result = await lambdaHandler(badRequest as any);
    expect(result.statusCode).not.toEqual(200);
  });

  it("should fail with random response", async () => {
    const result = await lambdaHandler(randomRequest as any);
    expect(result.statusCode).toEqual(400);
    expect((result as any).message).toEqual("No barcode payload");
  });
});
