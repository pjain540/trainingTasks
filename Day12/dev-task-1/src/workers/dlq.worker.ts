// workers/dlq.worker.ts
import { Worker } from "bullmq";
import { redis } from "../config/redis";
import { FailedJob } from "../models/failedJob.model";
import { emitAlert } from "../utils/socket";

export const dlqWorker = new Worker(
    "dlq",
    async (job) => {
        const { jobData, reason } = job.data;

        await FailedJob.create({ jobData, reason });

        emitAlert({
            message: "Job Failed",
            reason,
        });
    },
    {
        connection: redis,
    }
);