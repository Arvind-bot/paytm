'use client';

import { useBalance } from "@repo/store/useBalance";

export const Balance = () => {
  const balance = useBalance();
  return <div>
    hi there {balance}
  </div>
}