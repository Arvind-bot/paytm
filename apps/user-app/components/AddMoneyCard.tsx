"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textInput";
import { createOnRampTransaction } from "../lib/actions/onRampTransactions";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [amount, setAmount] = useState<string>("");

  return (
    <Card title="Add Money">
      <div className="w-full flex flex-col gap-2">
        <div>
          <TextInput
            label={"Amount"}
            placeholder={"Amount"}
            onChange={(value) => {
              const enteredAmount = value;
              setAmount(enteredAmount);
            }}
            value={amount}
          />
        </div>
        <div>
          <div className="mb-2 text-left">Bank</div>
          <Select
            onSelect={(value) => {
              setRedirectUrl(
                SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
              );
              setProvider(
                SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
              );
            }}
            options={SUPPORTED_BANKS.map((x) => ({
              key: x.name,
              value: x.name,
            }))}
          />
        </div>
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              await createOnRampTransaction(Number(amount) * 100, provider);
              window.location.href = redirectUrl || "";
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
