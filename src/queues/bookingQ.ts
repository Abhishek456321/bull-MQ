import { Queue } from "bullmq";

import redis from "../config/redis";

export const bookingQ = new Queue("notify", {
  connection: redis.duplicate(),
});

export async function addToBookingQ(type: any, data: any, delay: any) {
  await bookingQ.add(
    type,
    { data, type },
    {
      delay,
      attempts: 3,
      backoff: 3000,
      removeOnComplete: true,
    }
  );
}
