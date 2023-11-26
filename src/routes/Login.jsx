import { useContext, useState } from "react";
import { UserContext } from "../components/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const User = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const userContext = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = () => {
    setError(null);
    try {
      const user = User.parse({
        email,
        password,
      });
      const query = new URLSearchParams(user).toString();
      fetch(`http://localhost:5001/users?${query}`)
        .then((r) => r.json())
        .then((users) => users[0])
        .then((user) => {
          if (user) {
            userContext.onChange(user);
            setError(null);
            navigate("/");
          } else
            setError((currentError) => {
              return { ...currentError, general: "Invalid User" };
            });
        });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const { email, password } = err.format();
        setError((currentError) => {
          return { ...currentError, email, password };
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 ">
      <h1 className=" text-2xl">Log In</h1>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-2/5  h-10 border-2 border-emerald-950 pl-2"
      />
      {error?.email && (
        <div className="text-red-500">{error?.email?._errors[0]}</div>
      )}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-2/5  h-10 border-2 border-emerald-950 pl-2"
      />
      {error?.password && (
        <div className="text-red-500">{error?.password?._errors[0]}</div>
      )}
      <button
        onClick={handleLogin}
        className="block w-2/5 h-10   bg-emerald-900 text-white font-medium"
      >
        Log in
      </button>
      {error?.general && <div className="text-red-500">{error?.general}</div>}
      <p
        onClick={() => navigate("/signup")}
        className=" cursor-pointer underline"
      >
        Don't have accont?
      </p>
    </div>
  );
}
