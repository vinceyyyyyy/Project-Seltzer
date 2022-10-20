import { APIGatewayProxyResult } from "aws-lambda";

import { getAllInStockSeltzers } from "../services/seltzers.service";

export const lambdaHandler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const inventory = await getAllInStockSeltzers();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(inventory),
    };
  } catch (err) {
    throw err;
  }
};
