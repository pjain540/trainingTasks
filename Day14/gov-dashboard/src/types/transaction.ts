// src/types/transaction.ts
export interface Transaction {
    id: string;
    from: string;
    to: string;
    status: "ACTIVE" | "REVOKED";
    timestamp: string;
}