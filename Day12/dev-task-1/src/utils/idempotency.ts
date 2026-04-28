// utils/idempotency.ts
const processedJobs = new Set();

export const isDuplicate = (jobId: string) => {
    if (processedJobs.has(jobId)) return true;
    processedJobs.add(jobId);
    return false;
};