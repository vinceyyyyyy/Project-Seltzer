import { Context } from "aws-lambda";

import { lambdaHandler } from "../../functions/getProductByBarcode";
import { goodRequest, badRequest, randomRequest } from "../../events/requests.js";

describe("Unit test for getProductByBarcode handler", function () {
  it("verifies successful response", async () => {
    const result = await lambdaHandler(goodRequest as any, {} as Context);
    expect(result.statusCode).toEqual(200);

    const resultBody = JSON.parse(result.body);
    expect(resultBody.title).toEqual("Bowknot Jingle Bell Rings Pendant for Christmas Tree And Door Hanging Decor");
  });

  it("should fail with bad response", async () => {
    const result = lambdaHandler(badRequest as any, {} as Context);
    return expect(result).rejects.toThrow();
  });

  it("should fail with random response", async () => {
    const result = lambdaHandler(randomRequest as any, {} as Context);
    return expect(result).rejects.toThrow();
  });
});
