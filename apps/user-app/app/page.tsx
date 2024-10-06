import { Balance } from "@repo/ui/balance";
import { Button } from "@repo/ui/button";

export default function Home() {
  return (
    <div className="text-4xl">
      <Button appName="turbo-app">Hi there</Button>
      <Balance />
    </div>
  );
}
