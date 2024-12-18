"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import { p2pTransfer } from "../lib/actions/p2pTransfer";

export function SendMoneyCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="h-full">
      <Card title="Send">
        <div className="min-w-72 pt-2">
          <TextInput
            placeholder={"Number"}
            label="Number"
            onChange={(value) => {
              setNumber(value);
            }}
            value={number}
          />
          <TextInput
            placeholder={"Amount"}
            label="Amount"
            onChange={(value) => {
              setAmount(value);
            }}
            value={amount}
          />
          <div className="pt-4 flex justify-center">
            <Button
              onClick={async () => {
                await p2pTransfer(Number(amount) * 100, number);
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
