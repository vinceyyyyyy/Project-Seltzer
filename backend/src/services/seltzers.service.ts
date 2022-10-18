import https from "https";

import { SeltzerDTO } from "../DTOs/seltzer.dto";
import { Seltzer, SeltzerModel } from "../models/seltzer.model";

export async function createSeltzer(seltzer: SeltzerDTO) {
  const newSeltzer = new SeltzerModel(seltzer);
  try {
    await newSeltzer.save();
  } catch (err) {
    throw new Error("DB error: " + err);
  }
}

export async function getSeltzer(barcode: string): Promise<SeltzerDTO | undefined> {
  // get it from local DB
  try {
    const localResult = await getSeltzerFromDB(barcode);
    if (localResult) return localResult;
  } catch (err) {
    throw new Error(err as string);
  }

  // get it from vendor
  try {
    return await getSeltzerFromVendor(barcode);
  } catch (err) {
    throw new Error(err as string);
  }
}

export async function getAllInStockSeltzers() {
  return SeltzerModel.query("isInStock").eq("x").exec();
}

async function getSeltzerFromDB(barcode: string): Promise<Seltzer | undefined> {
  try {
    const seltzer = await SeltzerModel.get(barcode);
    if (!seltzer) return;
    return seltzer;
  } catch (err) {
    throw new Error("DB error: " + err);
  }
}

export async function removeSeltzerFromStock(barcode: string) {
  try {
    return SeltzerModel.update({ upc: barcode }, { $REMOVE: ["upc"] } as any);
  } catch (err) {
    throw new Error("DB error: " + err);
  }
}

async function getSeltzerFromVendor(barcode: string) {
  const vendorResult = (await httpRequest(`https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`)) as any;
  if (vendorResult.code !== "OK" || vendorResult.items.length === 0) throw new Error(JSON.stringify(vendorResult));

  // create item
  const newSeltzer = {
    upc: barcode,
    title: vendorResult.items[0].title,
    brand: vendorResult.items[0].brand,
    isInStock: "x",
    inStockHistory: [new Date().toISOString()],
    flavor: "",
  };
  await createSeltzer(newSeltzer);

  return newSeltzer;
}

function httpRequest(url: string) {
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
