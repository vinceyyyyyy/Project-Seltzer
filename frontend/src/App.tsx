import { useState } from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import Root from "./routes/Root";
import Inventory from "./pages/inventory";
import Scan from "./pages/scan";
import Wishlist from "./pages/wishlist";

const menuItems = [
  { name: "Inventory", path: "/inventory" },
  { name: "Scan", path: "/scan" },
  { name: "Wishlist", path: "/wishlist" },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root menuItems={menuItems} />,
    children: [
      { path: "inventory", element: <Inventory /> },
      { path: "scan", element: <Scan /> },
      { path: "wishlist", element: <Wishlist /> },
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={"w-full"}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
