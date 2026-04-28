// queues/dlq.queue.ts
import { Queue } from "bullmq";
import { redis } from "../config/redis";

export const dlqQueue = new Queue("dlq", {
    connection: redis,
});