import { Worker, Job } from "bullmq";
import redis from "../config/redis";

export function startBookingWorker() {
  const bookingWorker = new Worker(
    "notify",
    async (job: Job) => {
      const { type, data } = job.data;
      console.log(
        ".................//////---> whatever job to performed mail, sms,etc ."
      );
    },
    { connection: redis.duplicate({ maxRetriesPerRequest: null }) }
  );

  bookingWorker.on("completed", (job) =>
    console.log(`Job ${job?.data.type} type completed.`)
  );
  bookingWorker.on("failed", (job) =>
    console.log(`Job ${job?.data.type} type failed.`)
  );
}
