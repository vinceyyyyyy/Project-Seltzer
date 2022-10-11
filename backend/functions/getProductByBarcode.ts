import getRequest from "../helpers/getRequest";
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler } from "aws-lambda";

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: BarcodeRequestDTO): Promise<BarcodeResponseDTO> => {
  const barcode = event.barcode;

  // must have payload
  if (!barcode) return { statusCode: 400, message: "No barcode payload" };

  // payload bust be legal
  if (!barcode.type || !barcode.data)
    return {
      statusCode: 400,
      message: "Barcode payload must have type and data properties",
    };

  const r = (await getRequest(`https://api.upcitemdb.com/prod/trial/lookup?${barcode.type}=${barcode.data}`)) as any;

  // vendor API blows up
  if (r.code !== "OK") return { statusCode: 500, message: JSON.stringify(r) };

  return {
    statusCode: 200,
    body: JSON.stringify(r),
  };
};

type BarcodeRequestDTO = APIGatewayProxyEventV2 & {
  barcode: {
    type: string;
    data: string;
  };
};

type goodBarcodeResponseDTO = {
  statusCode: 200;
  body: string;
  // {
  //     code: string;
  //     total: number;
  //     items: { title: string; description: string; upc: string; brand: string; image: string }[];
  // };
};

type badBarcodeResponseDTO = {
  statusCode: number;
  message: string;
};

type BarcodeResponseDTO = goodBarcodeResponseDTO | badBarcodeResponseDTO;
