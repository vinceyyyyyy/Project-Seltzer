import React from "react";
import { Outlet } from "react-router-dom";

import Nav from "../components/Nav";

export default function Root(props: {
  menuItems: { name: string; path: string }[];
}) {
  return (
    <>
      <Nav menuItems={props.menuItems} />
      <Outlet />
    </>
  );
}
