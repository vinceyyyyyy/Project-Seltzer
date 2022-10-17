import * as dynamoose from "dynamoose";
import { Item } from "dynamoose/dist/Item";

const schema = new dynamoose.Schema(
  {
    upc: {
      type: String,
      index: true,
    },
    title: String,
    brand: String,
    flavor: String,
    isInStock: {
      type: String,
      index: {
        name: "isInStock-index",
      },
    },
    inStockHistory: {
      type: Array,
      schema: [String],
    },
  },
  {
    saveUnknown: true,
    timestamps: true,
  },
);

export class Seltzer extends Item {
  upc: string;
  title: string;
  brand: string;
  flavor: string;
  isInStock: string;
  inStockHistory: string[];
}

export const SeltzerModel = dynamoose.model<Seltzer>("seltzers", schema);
