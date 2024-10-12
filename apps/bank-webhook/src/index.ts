
import express from "express";
import db from "@repo/db";

const app = express();

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    const paymentInformation:{
      token: string,
      userId: string,
      amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    // Update balance in db, add txn
    try {
      await db.$transaction(async (tx) => {
        const balance = await tx.balance.findUnique({
          where: {
            userId: Number(paymentInformation.userId)
          }
        });

        if (!balance) {
          await tx.balance.create({
            data: {
              userId: Number(paymentInformation.userId),
              amount: Number(paymentInformation.amount),
              locked: 0
            }
          });
        } else {
          await tx.balance.update({
            where: {
              userId: Number(paymentInformation.userId)
            },
            data: {
              amount: {
                increment: Number(paymentInformation.amount)
              }
            }
          });
        }

        await tx.onRampTransaction.updateMany({
          where: {
            token: paymentInformation.token
          },
          data: {
            status: 'Success',
            // token: paymentInformation.token,
            // provider: 'HDFC',
            // amount: Number(paymentInformation.amount),
            // startTime: new Date(),
            // userId: Number(paymentInformation.userId)
          }
        });
      });
      res.json({
        message: "Captured"
      })
    } catch (error) {
      console.error(error);
      res.status(411).json({ error: "Error while processing webhook" });
    }
});

// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });