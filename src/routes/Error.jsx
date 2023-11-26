import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div>
      <h1 className=" text-3xl">404</h1>
      <p className=" text-5xl">Page not found</p>
      <p className=" text-2xl">
        Go{" "}
        <Link className=" text-blue-700 underline" to="/">
          Home
        </Link>
      </p>
    </div>
  );
}
