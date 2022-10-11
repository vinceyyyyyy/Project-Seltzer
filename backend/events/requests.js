const goodRequest = {
  barcode: {
    type: "upc",
    data: "728771091989",
  },
};

const badRequest = {
  barcode: {
    type: "upc",
    data: "728412324",
  },
};

const randomRequest = {
  key1: "value1",
  key2: "value2",
  key3: "value3",
};

module.exports = {
  goodRequest,
  badRequest,
  randomRequest,
};
