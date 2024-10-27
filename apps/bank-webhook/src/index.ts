import express from "express";
import db from "@repo/db";

const app = express();
app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  //TODO: Add zod validation here?
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  // Update balance in db, add txn
  try {
    const onRampTransaction = await db.onRampTransaction.findFirst({
      where: {
        token: paymentInformation.token,
        userId: Number(paymentInformation.userId),
      },
    });
    if (["Success", "Failure"].includes(onRampTransaction?.status || "")) {
      throw new Error("Transaction already captured");
    }
    if (onRampTransaction?.amount != Number(paymentInformation?.amount)) {
      throw new Error("Incorrect transaction amount");
    }
    await db.$transaction(async (tx) => {
      await tx.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      });

      const balance = await tx.balance.findUnique({
        where: {
          userId: Number(paymentInformation.userId),
        },
      });

      if (!balance) {
        await tx.balance.create({
          data: {
            userId: Number(paymentInformation.userId),
            amount: Number(paymentInformation.amount),
            locked: 0,
          },
        });
      } else {
        await tx.balance.update({
          where: {
            userId: Number(paymentInformation.userId),
          },
          data: {
            amount: {
              increment: Number(paymentInformation.amount),
            },
          },
        });
      }
    });
    res.json({
      message: "Captured",
    });
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(411).json({
      error: "Error while processing webhook",
      errorInfo: errorMessage,
    });
  }
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
