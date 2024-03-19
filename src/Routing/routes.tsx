import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Registration from "../Pages/Registration";

const routes = createBrowserRouter([
	{
		path: "/register",
		element: <Registration />,
	},
	{
		path: "/login",
		element: <h1>Login</h1>,
	},
	{
		path: "/",
		element: <h1>Home</h1>,
	},
]);

export default function BaseRoutes(): JSX.Element {
	return <RouterProvider router={routes} />;
}
