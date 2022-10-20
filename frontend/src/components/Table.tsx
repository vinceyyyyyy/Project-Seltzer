import React, { useState, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Seltzer = {
  title: string;
  brand: string;
};
const columnHelper = createColumnHelper<Seltzer>();

const columns = [
  columnHelper.accessor("title", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("brand", {
    cell: (info) => info.getValue(),
  }),
];

const defaultData: Seltzer[] = [{ title: "default", brand: "default" }];

export default function Table(props: { seltzers: Seltzer[] }) {
  const [data, setData] = useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    setData(props.seltzers);
  }, [props.seltzers]);

  return (
    <div className="p-2 ">
      <table className="table-auto w-full text-sm text-left text-gray-200">
        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="py-3 px-6">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-gray-700">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-4 px-6">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
