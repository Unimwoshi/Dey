import { Input, Button } from "../../ui/UI";
import { useState} from 'react';
import { Link } from "react-router-dom";



type UsernameError =
  | "tooShort"
  | "tooLong"
  | "invalidChars"
  | "edgeUnderscore"
  | null;

const usernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9_]{1,18}[a-zA-Z0-9])?$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateUsername = (value: string): UsernameError => {
  if (value.length === 0) return null; // don't show errors on empty
  if (value.length < 3) return "tooShort";
  if (value.length > 20) return "tooLong";
  if (/^_|_$/.test(value)) return "edgeUnderscore";
  if (!/^[a-zA-Z0-9_]+$/.test(value)) return "invalidChars";
  return null;
};

const usernameErrorMessages: Record<Exclude<UsernameError, null>, string> = {
  tooShort: "Username must be at least 3 characters",
  tooLong: "Username must be under 20 characters",
  invalidChars: "Only letters, numbers, and underscores allowed",
  edgeUnderscore: "Username can't start or end with an underscore",
};

const Register = () => {
    const [fullName, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const passwordMismatch =
      confirmPassword.length > 0 && confirmPassword !== password;

    const isFormValid =
      fullName.length > 0 &&
      username.length >= 3 &&
      !usernameError &&
      email.length > 0 &&
      !emailError &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      !passwordMismatch;

    const usernameError = validateUsername(username);
    const emailError =
      email.length > 0 && !emailRegex.test(email)
        ? "Enter a valid email"
        : null;

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setFormError(null);
      setIsSubmitting(true);
      try {
        console.log(username, fullName, email, password);
      } catch {
        setFormError("Something went wrong creating your account");
      } finally {
        setIsSubmitting(false);
      }
    };

     return (
       <form onSubmit={handleSubmit} className="flex flex-col gap-10">
         <div className="flex flex-col gap-5">
           <div className="flex gap-[20px] flex-col sm:flex-row sm:gap-[10px]">
             <Input
               variant="secondary"
               placeholder="Full name"
               value={fullName}
               onChange={(e) => setFullName(e.target.value)}
             />
             <div>
               <Input
                 variant="secondary"
                 placeholder="Username"
                 customClassName="w-1/2"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
               />
               {usernameError && (
                 <p className="text-[11px] text-red-400 mt-1">
                   {usernameErrorMessages[usernameError]}
                 </p>
               )}
             </div>
           </div>
           <div>
             <Input
               variant="secondary"
               placeholder="Email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
             />
             {emailError && (
               <p className="text-[11px] text-red-400 mt-1">{emailError}</p>
             )}
           </div>
           <Input
             variant="secondary"
             placeholder="Password"
             iconType="hidePassword"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
           />
           <div>
             <Input
               variant="secondary"
               placeholder="Confirm password"
               iconType="hidePassword"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
             />
             {passwordMismatch && (
               <p className="text-[11px] text-red-400 mt-1">
                 Passwords don't match
               </p>
             )}
           </div>

           <div className="flex items-center justify-center ">
             <p className="text-xs md:text-sm w-[80%] text-white-64">
               By clicking the button below, you acknowledge and agree to Dey's{" "}
               <Link to="/" className="text-white-80 underline">Terms & Privacy Policy</Link>
             </p>
           </div>
         </div>
         <Button
           text="Let's get started"
           variant="primary"
           onClick={() => handleSubmit()}
           type="submit"
           disabled={!isFormValid || isSubmitting}
           iconType="arrowRight"
         />
       </form>
     );
};

export default Register;
