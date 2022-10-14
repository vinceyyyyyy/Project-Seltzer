import { DynamoDBClient, ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyResult } from "aws-lambda";
import { SeltzerDTO } from "/opt/nodejs/Seltzer.dto";

export const lambdaHandler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const inventory = await getInventory();
    return {
      statusCode: 200,
      body: JSON.stringify(inventory),
    };
  } catch (err) {
    throw err;
  }
};

async function getInventory(): Promise<SeltzerDTO[]> {
  const client = new DynamoDBClient({ region: "us-east-1" });
  const params: ScanCommandInput = {
    TableName: "seltzers",
    FilterExpression: "isInStock = :a ",
    ExpressionAttributeValues: {
      ":a": { BOOL: true },
    },
  };
  const command = new ScanCommand(params);

  try {
    const result = await client.send(command);
    return result.Items?.map((item) => unmarshall(item)) as SeltzerDTO[];
  } catch (err) {
    throw new Error("DB error: " + err);
  }
}
