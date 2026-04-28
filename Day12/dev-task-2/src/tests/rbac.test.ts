// tests/rbac.test.ts
//@ts-nocheck
import request from "supertest";
import app from "../app";

describe("RBAC Tests", () => {
    it("Manufacturer can update own unit", async () => {
        const res = await request(app)
            .put("/units/1")
            .send({ name: "updated" })
            .set("user", JSON.stringify({
                role: "Manufacturer",
                participantId: "123"
            }));

        expect(res.status).toBe(200);
    });

    it("Manufacturer cannot update others unit", async () => {
        const res = await request(app)
            .put("/units/1")
            .send({ name: "updated" })
            .set("user", JSON.stringify({
                role: "Manufacturer",
                participantId: "999"
            }));

        expect(res.status).toBe(403);
    });
});