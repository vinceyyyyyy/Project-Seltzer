import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import Root from "./routes/Root";
import Inventory from "./pages/inventory";
import Scan from "./pages/scan";
import History from "./pages/history";

const menuItems = [
  { name: "Inventory", path: "/inventory" },
  { name: "Scan", path: "/scan" },
  { name: "History", path: "/history" },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root menuItems={menuItems} />,
    children: [
      { path: "/", element: <Inventory /> },
      { path: "inventory", element: <Inventory /> },
      { path: "scan", element: <Scan /> },
      { path: "history", element: <History /> },
    ],
  },
]);

function App() {
  return (
    <div className={"w-full"}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
