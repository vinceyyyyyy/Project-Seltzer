import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  PutItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { unmarshall, marshall } from "@aws-sdk/util-dynamodb";
import * as https from "https";

import { SeltzerDTO } from "../DTOs/Seltzer.dto";

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
export const lambdaHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  const barcode = event.queryStringParameters;

  // must have query parameters
  if (!barcode) throw new Error("No barcode payload");

  // payload bust be legal
  if (!barcode.type || !barcode.data) throw new Error("Barcode payload must have type and data properties");

  // get item from DB
  const localItem = await getItemFromDB(barcode.data);
  if (localItem) return { statusCode: 200, body: JSON.stringify(localItem) };

  // item does not exists in DB, get from vendor
  const r = (await getItemFromVendor(
    `https://api.upcitemdb.com/prod/trial/lookup?${barcode.type}=${barcode.data}`,
  )) as any;

  // vendor API blows up
  if (r.code !== "OK") throw new Error(JSON.stringify(r));

  // cannot accurately locate the product
  if (r.items.length !== 1) throw new Error("Cannot accurately locate the product");

  // create item
  const item: SeltzerDTO = {
    upc: barcode.data,
    title: r.items[0].title,
    brand: r.items[0].brand,
    isInStock: true,
    inStockHistory: [new Date(Date.now()).toUTCString()],
    flavor: "",
  };
  await addItemToDB(item);

  return {
    statusCode: 200,
    body: JSON.stringify(item),
  };
};

async function addItemToDB(item: SeltzerDTO) {
  const client = new DynamoDBClient({ region: "us-east-1" });
  const params: PutItemCommandInput = {
    TableName: "seltzers",
    Item: marshall(item),
  };
  const command = new PutItemCommand(params);

  try {
    await client.send(command);
  } catch (err) {
    throw new Error("DB error: " + err);
  }
}

async function getItemFromDB(barcode: string): Promise<SeltzerDTO | undefined> {
  const client = new DynamoDBClient({ region: "us-east-1" });
  const params: GetItemCommandInput = {
    TableName: "seltzers",
    Key: { upc: { S: barcode } },
  };
  const command = new GetItemCommand(params);

  try {
    const result = await client.send(command);
    if (!result.Item) return;
    return unmarshall(result.Item) as SeltzerDTO;
  } catch (err) {
    throw new Error("DB error: " + err);
  }
}

function getItemFromVendor(url: string) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let rawData = "";

      res.on("data", (chunk) => {
        rawData += chunk;
      });

      res.on("end", () => {
        try {
          resolve(JSON.parse(rawData));
        } catch (err: any) {
          reject(new Error(err));
        }
      });
    });

    req.on("error", (err) => {
      reject(new Error(err.message));
    });
  });
}
