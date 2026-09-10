import { useState } from "react";
import SignIn from "./components/SignIn";
import Register from "./components/Register";

const AuthPage = () => {
    const [authState, setAuthState] = useState('sign-in')
    const [active, setActive] = useState(true)

    return (
      <div className="absolute w-full h-full flex flex-col items-center justify-center">
        <div className="flex justify-between w-3/4 bg-bg-secondary max-w-[500px]">
          <button
            onClick={() => setAuthState("sign-in")}
            className={`${
              authState === "sign-in"
                ? "text-white sign-in-border"
                : "text-white-64 hover:text-white-80 transition-colors border-l border-primary"
            }  p-[10px] w-1/2 `}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthState("register")}
            className={`${
              authState === "register"
                ? "text-white register-border"
                : "text-white-64 hover:text-white-80 transition-colors  border-r border-primary"
            } p-[10px] w-1/2`}
          >
            Register
          </button>
        </div>
        <div className="bg-bg-secondary p-8 w-3/4 max-w-[500px] auth-border">
          {authState === "sign-in" && <SignIn />}

          {authState === "register" && <Register />}
        </div>
      </div>
    );
}

export default AuthPage