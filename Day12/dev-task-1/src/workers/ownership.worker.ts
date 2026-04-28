// workers/ownership.worker.ts
import { Worker } from "bullmq";
import { redis } from "../config/redis";
import { isDuplicate } from "../utils/idempotency";
import { dlqQueue } from "../queues/dlq.queue";

export const ownershipWorker = new Worker(
    "ownership-transfer",
    async (job: any) => {
        if (isDuplicate(job.id)) return;

        const { assetId, newOwner } = job.data;

        try {
            console.log(`Transferring ${assetId} to ${newOwner}`);

            // simulate DB update
            if (!assetId) throw new Error("Invalid asset");

            return { success: true };
        } catch (err: any) {
            await dlqQueue.add("failed-job", {
                jobData: job.data,
                reason: err.message,
            });
            throw err;
        }
    },
    {
        connection: redis,
        concurrency: 5,

        limiter: {
            max: 10, // per duration
            duration: 1000, // 1 sec
        },
    }
);