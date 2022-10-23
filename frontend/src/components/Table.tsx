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
type SeltzerRow = Seltzer & { action: (rowID: number) => any };
const columnHelper = createColumnHelper<SeltzerRow>();

const columns = [
  columnHelper.accessor("title", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("brand", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("action", {
    cell: (info) => (
      <button
        value={info.row.id}
        onClick={(e) => info.getValue()(parseInt(info.row.id))}
      >
        remove
      </button>
    ),
  }),
];

const defaultData: SeltzerRow[] = [
  {
    title: "default",
    brand: "default",
    action: () => window.alert("default"),
  },
];

export default function Table(props: {
  seltzers: Seltzer[];
  action: (rowID: number) => any;
}) {
  const [data, setData] = useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    setData(
      props.seltzers.map((seltzer) => ({
        ...seltzer,
        action: props.action,
      }))
    );
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
