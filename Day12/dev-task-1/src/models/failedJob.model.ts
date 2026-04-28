// models/failedJob.model.ts
import mongoose from "mongoose";

const FailedJobSchema = new mongoose.Schema({
    jobData: Object,
    reason: String,
    createdAt: { type: Date, default: Date.now },
});

export const FailedJob = mongoose.model("FailedJob", FailedJobSchema);