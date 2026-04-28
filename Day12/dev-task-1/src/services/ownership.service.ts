// services/ownership.service.ts
import { ownershipQueue } from "../queues/ownership.queue";

export const transferOwnership = async (data: any) => {
    const jobId = `transfer-${data.assetId}`;

    await ownershipQueue.add("transfer", data, {
        jobId, // ✅ idempotency
    });
};