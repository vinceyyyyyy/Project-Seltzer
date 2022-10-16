import { Context } from "aws-lambda";

import { lambdaHandler } from "../../src/handlers/logItem";

describe("Unit test for getProductByBarcode handler", function () {
  it("should get item from local DB", async () => {
    const result = await lambdaHandler(localDBEvent as any, {} as Context);
    expect(result.statusCode).toEqual(200);

    const resultBody = JSON.parse(result.body);
    expect(resultBody.title).toEqual("TANGERINE NATURALLY ESSENCED SPARKLING WATER, TANGERINE");
  });

  it("should get item from vendor", async () => {
    const result = await lambdaHandler(vendorEvent as any, {} as Context);
    expect(result.statusCode).toEqual(200);

    const resultBody = JSON.parse(result.body);
    expect(resultBody.title).toEqual("Lacroix Sparkling Water, Cran-Raspberry, 12 Count by LaCroix");
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

const baseEvent = {
  version: "2.0",
  resource: "/getProductByBarcode",
  path: "/getProductByBarcode",
  httpMethod: "GET",
  headers: {
    Header1: "value1",
    Header2: "value1,value2",
  },
  requestContext: {
    accountId: "123456789012",
    apiId: "api-id",
    http: {
      method: "GET",
      path: "/getProductByBarcode",
      protocol: "HTTP/1.1",
      sourceIp: "192.168.0.1/32",
      userAgent: "agent",
    },
    requestId: "id",
    time: "12/Mar/2020:19:03:58 +0000",
    timeEpoch: 1583348638390,
  },
  body: "eyJ0ZXN0IjoiYm9keSJ9",
  isBase64Encoded: false,
};

const localDBEvent = {
  ...baseEvent,
  queryStringParameters: {
    type: "upc",
    data: "012993112066",
  },
};

const vendorEvent = {
  ...baseEvent,
  queryStringParameters: {
    type: "upc",
    data: "786173903071",
  },
};

const badRequest = {
  ...baseEvent,
  queryStringParameters: {
    type: "upc",
    data: "728412324",
  },
};

const randomRequest = {
  ...baseEvent,
  queryStringParameters: {
    key1: "value1",
    key2: "value2",
    key3: "value3",
  },
};
