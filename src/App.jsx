import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import UserContextProvider from "./components/UserContextProvider";
import RequireAuth from "./components/RequireAuth";
import Layout from "./routes/Layout";
import Notes, { loader as notesLoader } from "./routes/Notes";
import Add from "./routes/Add";
import Note, { loader as noteLoader } from "./routes/Note";
import Edit, { loader as editLoader } from "./routes/Edit";
import Error from "./routes/Error";
import { FetchService } from "./utils/fetchService";

export const server = new FetchService("http://localhost:5001");

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/notes/:authorId",
        element: <Notes />,
        loader: notesLoader,
      },
      {
        path: "/notes/:authorId/add",
        element: <Add />,
      },
      {
        path: "/notes/:authorId/:id",
        element: <Note />,
        loader: noteLoader,
      },
      {
        path: "/notes/:authorId/:id/edit",
        element: <Edit />,
        loader: editLoader,
      },
    ],
  },
]);

export default function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}
