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

const goodRequest = {
  ...baseEvent,
  queryStringParameters: {
    type: "upc",
    data: "728771091989",
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

module.exports = {
  goodRequest,
  badRequest,
  randomRequest,
};
