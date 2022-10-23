import React, { useState, useEffect } from "react";

import Table from "../../components/Table";

export default function Inventory() {
  const [inventory, setInventory] = useState(
    [] as { upc: string; title: string; brand: string }[]
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await (
        await fetch(
          "https://p7do7aywv5.execute-api.us-east-1.amazonaws.com/Prod"
        )
      ).json();

      setInventory(
        data.map((seltzer: any) => ({
          upc: seltzer.upc,
          title: seltzer.title,
          brand: seltzer.brand,
        }))
      );
    };

    fetchData().catch(console.error);
  }, []);

  const removeSeltzer = (id: number) => {
    console.log("remove: ", inventory[id].upc);
    return fetch(
      "https://p7do7aywv5.execute-api.us-east-1.amazonaws.com/Prod",
      {
        method: "PATCH",
        // mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Methods": "PATCH",
        },
        referrerPolicy: "origin-when-cross-origin", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(inventory[id].upc),
      }
    );
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <h1 className="text-4xl font-bold">Inventory</h1>
          <Table seltzers={inventory} action={removeSeltzer} />
        </div>
      </div>
    </div>
  );
}
