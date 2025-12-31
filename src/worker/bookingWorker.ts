import { Worker, Job } from "bullmq";
import redis from "../config/redis";

export function startBookingWorker() {
  // first argument same hunuparxa queue name sanga so that it will perform the job schedule in the queue  new Queue()
  const bookingWorker = new Worker(
    "notify",
    async (job: Job) => {
      // job.data is 2 argu in queue.add("",data)
      // job.name is 1 argu in queue.add(name,data,)
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
