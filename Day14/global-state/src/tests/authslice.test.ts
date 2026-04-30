// src/tests/authSlice.test.ts
//@ts-nocheck
import { describe, it, expect } from "vitest";
import { useStore } from "../store";

describe("authSlice", () => {
    it("should login", () => {
        useStore.getState().login("abc123");

        expect(useStore.getState().token).toBe("abc123");
    });

    it("should logout", () => {
        useStore.getState().logout();

        expect(useStore.getState().token).toBe(null);
    });
});