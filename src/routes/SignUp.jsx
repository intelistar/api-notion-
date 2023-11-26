import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";
import { z } from "zod";
import { server } from "../App";

const User = z.object({
  id: z.number(),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one digit" }),
  date: z.string(),
});

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const userContext = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const newUser = User.parse({
        id: Date.now(),
        email,
        password,
        date: new Date().toLocaleString(),
      });

      const r = await server.getUserByEmail(newUser.email);

      if (r[0]) {
        throw new Error("This email is already registered");
      }

      await server.addUser(newUser);
      userContext.onChange(newUser);
      setError(null);
      navigate("/");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const { email, password } = err.format();
        setError((currentError) => {
          return { ...currentError, email, password };
        });
      } else if (err instanceof Error) {
        setError((currentError) => {
          return {
            ...currentError,
            emailCheck: err.message,
          };
        });
      }
    }
  };

  const handleCheckPassword = (e) => {
    if (!(e.target.value === password))
      setError((currentError) => {
        return { ...currentError, pswdCheck: "passwords is not equal" };
      });
    else
      setError((currentError) => {
        return { ...currentError, pswdCheck: null };
      });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl">Sign Up</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-2/5 h-10 border-2 border-emerald-950 pl-2 "
      />
      {error?.email && (
        <div className="text-red-500">{error?.email?._errors[0]}</div>
      )}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-2/5 h-10 border-2 border-emerald-950 pl-2"
      />
      {error?.password && (
        <div className="text-red-500">{error?.password?._errors[0]}</div>
      )}
      <input
        type="password"
        placeholder="Repeat password"
        onChange={handleCheckPassword}
        className="block w-2/5 h-10 border-2 border-emerald-950 pl-2"
      />
      {error?.pswdCheck && (
        <div className="text-red-500">{error?.pswdCheck}</div>
      )}
      <button
        onClick={handleLogin}
        className="block w-2/5 h-10  bg-emerald-900 text-white font-medium"
      >
        Sign up
      </button>
      {error?.emailCheck && (
        <div className="text-red-500">{error?.emailCheck}</div>
      )}
      <p
        onClick={() => navigate("/login")}
        className=" cursor-pointer underline"
      >
        Already have accont?
      </p>
    </div>
  );
}
