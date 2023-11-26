import { useContext } from "react";
import { UserContext } from "../components/UserContextProvider";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <main className="flex flex-col items-center gap-12 pt-4 pb-4">
      <h1 className=" w-1/2 text-4xl font-bold text-center mb-6">About me</h1>
      <div className=" text-lg">
        <p>
          Email: <span className=" text-gray-500 ">{user.email}</span>
        </p>
        <p>
          Date sign up: <span className=" text-gray-500 ">{user.date}</span>
        </p>
      </div>
      <Link
        className=" flex justify-center items-center bg-emerald-900 text-white text-xl font-medium w-1/4 h-12"
        to={`/notes/${user.id}`}
      >
        Go to notes
      </Link>
    </main>
  );
}
