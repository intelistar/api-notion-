import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";

export default function Layout() {
  const { user, onChange } = useContext(UserContext);

  const handleLogOut = () => {
    onChange(null);
    localStorage.clear();
  };
  return (
    <div className=" w-full  flex justify-center">
      <div className=" w-4/5 flex flex-col gap-11">
        <header className="w-full flex items-center justify-between h-10 text-lg">
          <p className=" text-emerald-800">Hello, {user.email}</p>
          <nav className="flex gap-7 ">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? " font-semibold text-emerald-800" : ""
              }
            >
              About
            </NavLink>
            <NavLink
              to={`/notes/${user.id}`}
              end={true}
              className={({ isActive }) =>
                isActive ? " font-semibold text-emerald-800" : ""
              }
            >
              Notes
            </NavLink>
            <NavLink onClick={handleLogOut}>Log out</NavLink>
          </nav>
        </header>
        <Outlet className="w-full" />
        <footer className="flex flex-col justify-center gap-5 text-gray-600">
          <hr />
          <div className="w-full flex justify-between items-center">
            <p>Created by: Garkusha Nikita</p>
            <p>{new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
