import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

import { removeSeltzerFromStock } from "../services/seltzers.service";

/**
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 */
export const lambdaHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  const upcBarcode = JSON.parse(event.body ?? "").upc as string;

  // must have query parameters
  if (!upcBarcode) throw new Error("No barcode payload");

  // get item from DB
  await removeSeltzerFromStock(upcBarcode);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Seltzer removed from stock" }),
  };
};
