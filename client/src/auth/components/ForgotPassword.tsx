import { Input, Button } from "../../ui/UI.tsx";

const ForgotPassword = () => {
  return (
    <form
      onSubmit={handleSubmit}
      className="text-white-80 flex flex-col gap-10"
    >
      <div className="text-white-80 flex flex-col gap-[10px]">
        <div className="text-white-80 flex flex-col gap-[20px]">
          <Input
            variant="secondary"
            placeholder="Email or Username"
          />
          <Input
            variant="secondary"
            placeholder="Password"
            iconType="hidePassword"/>
        </div>

        <Link
          to="#"
          className="text-[11px] text-white-64 underline transition-colors hover:text-white-80 flex self-end"
        >
          Try another way?
        </Link>
      </div>

      <Button
        text={isSubmitting ? "Signing in..." : "Reset Password"}
        variant="primary"
        type="submit"
        disabled={!isFormValid || isSubmitting}
      />
    </form>
  );
};

export default ForgotPassword;
