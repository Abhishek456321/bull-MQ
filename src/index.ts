import dotenv from "dotenv";
import express from "express";
import { bookingData } from "./data/dummyData";
import { addToBookingQ } from "./queues/bookingQ";
import { startBookingWorker } from "./worker/bookingWorker";
dotenv.config();

const app = express();

app.get("/", async (req, res) => {
  await init();
  console.log("done");
});

async function init() {
  await addToBookingQ(
    "bookingConfirmation",

    bookingData.bookingConfirmation[0].template,
    parseInt(bookingData.bookingConfirmation[0].timing) * 6000
  );

  await addToBookingQ(
    "firstFollowUp",

    bookingData.firstFollowUp.template,
    parseInt(bookingData.firstFollowUp.timing) * 6000
  );

  await addToBookingQ(
    "finalFollowUp",

    bookingData.finalFollowUp.template,
    parseInt(bookingData.finalFollowUp.timing) * 6000
  );
}

app.listen(3000, () => {
  console.log("Server started on port 3000");
  startBookingWorker();
});
