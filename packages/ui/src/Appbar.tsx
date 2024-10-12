import { Button } from "./button";
// import { SignInOptions, SignOutParams } from "next-auth/react";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: () => void,
    onSignout: () => void,
    // onSignin: (options?: SignInOptions) => Promise<void>,
    // onSignout: (options?: SignOutParams) => Promise<void>
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between border-b border-slate-300 px-4">
        <div className="text-lg flex flex-col justify-center">
          PayTM
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}