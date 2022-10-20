import React, { useState, useEffect } from "react";

import Table from "../../components/Table";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetch("https://p7do7aywv5.execute-api.us-east-1.amazonaws.com/Prod")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) =>
        setInventory(
          data.map((seltzer: any) => ({
            title: seltzer.title,
            brand: seltzer.brand,
          }))
        )
      );
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <h1 className="text-4xl font-bold">Inventory</h1>
          <Table seltzers={inventory} />
        </div>
      </div>
    </div>
  );
}
