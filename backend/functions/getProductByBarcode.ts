import getRequest from "../helpers/getRequest";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

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

  const r = (await getRequest(`https://api.upcitemdb.com/prod/trial/lookup?${barcode.type}=${barcode.data}`)) as any;

  // vendor API blows up
  if (r.code !== "OK") throw new Error(JSON.stringify(r));

  // cannot accurately locate the product
  if (r.items.length !== 1) throw new Error("Cannot accurately locate the product");

  return {
    statusCode: 200,
    body: JSON.stringify(
      r.items[0] as { title: string; description: string; upc: string; brand: string; image: string },
    ),
  };
};
