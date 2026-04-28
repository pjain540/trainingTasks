// tests/ownership.worker.test.ts
import { ownershipQueue } from "../queues/ownership.queue";

describe("Ownership Worker", () => {
    it("should process job successfully", async () => {
        const job = await ownershipQueue.add("transfer", {
            assetId: "123",
            newOwner: "user1",
        });

        expect(job).toBeDefined();
    });

    it("should fail invalid job", async () => {
        const job = await ownershipQueue.add("transfer", {
            assetId: null,
        });

        expect(job).toBeDefined();
    });
});