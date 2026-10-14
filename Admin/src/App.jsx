import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import Add from "./pages/Add";
import List from "./pages/List";
import Order from "./pages/Order";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Add />,
      },
      {
        path: "/list",
        element: <List />,
      },
      {
        path: "/order",
        element: <Order />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
