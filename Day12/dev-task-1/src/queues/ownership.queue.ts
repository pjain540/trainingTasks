// queues/ownership.queue.ts
import { Queue } from "bullmq";
import { redis } from "../config/redis";

export const ownershipQueue = new Queue("ownership-transfer", {
    connection: redis,
    defaultJobOptions: {
        attempts: 5,
        backoff: {
            type: "exponential",
            delay: 1000,
        },
        removeOnComplete: true,
        removeOnFail: false,
    },
});