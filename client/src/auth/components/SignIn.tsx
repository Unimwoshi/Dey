import {PiKey} from 'react-icons/pi'
import { Input, Button } from "../../ui/UI.tsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface UserLogin {
  loginType: "email" | "username" | "";
  user: string;
}

const SignIn = () => {
  const [user, setUser] = useState<UserLogin>({ loginType: "", user: "" });
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUser({
      loginType:
        value === "" ? "" : emailRegex.test(value) ? "email" : "username",
      user: value,
    });
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);
    try {
      console.log(user, password);
    } catch {
      setFormError("Incorrect email/username or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = user.user.length > 0 && password.length > 0;

  function useIsMd():boolean {
    const[isMdScreen, setIsMdScreen] = useState<boolean>(
      typeof window !== 'undefined' ? window.innerWidth>=768: false
    )

    useEffect(()=> {
      const handleResize = ():void => setIsMdScreen(window.innerWidth>=768)
      handleResize()
      window.addEventListener('resize', handleResize)
      return ()=> window.removeEventListener('resize', handleResize)
    },[])

    return isMdScreen
  }

  const isMd = useIsMd()

  return (
    <form
      onSubmit={handleSubmit}
      className="text-white-80 flex flex-col gap-10"
    >
      <div className="text-white-80 flex flex-col gap-[10px]">
        <Button
        variant="secondary"
        text="Sign in with Passkey"
        icon={<PiKey/>}
        iconPosition="leading"
        size={isMd ? "standard" : "small"}
        />
        <div className="flex justify-between items-center">
          <div className = "w-[45%] h-px border border-primary inline-flex "
          /> <span>Or</span>
          <div className = "w-[45%] h-px border border-primary inline-flex "
          />
        </div>
        <div className="text-white-80 flex flex-col gap-[20px]">
          <Input
            variant="secondary"
            placeholder="Email or Username"
            value={user.user}
            onChange={handleUserChange}
          />
          <Input
            variant="secondary"
            placeholder="Password"
            iconType="hidePassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Link
          to="#"
          className="text-[11px] text-white-64 underline transition-colors hover:text-white-80 flex self-end"
        >
          Forgot Password?
        </Link>
      </div>

      {formError && (
        <p className="text-[12px] text-red-400 -mt-6">{formError}</p>
      )}

      <Button
        text={isSubmitting ? "Signing in..." : "Welcome Back!"}
        variant="primary"
        type="submit"
        disabled={!isFormValid || isSubmitting}
      />
    </form>
  );
};

export default SignIn;
