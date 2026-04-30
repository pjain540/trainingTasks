// src/components/TransactionTable/TransactionRow.tsx
// @ts-nocheck
import React from "react";
import { Transaction } from "../../types/transaction";

export const TransactionRow = React.memo(({ tx }: { tx: Transaction }) => {
    return (
        <div style={{ display: "flex", gap: "20px", padding: "10px" }}>
            <span>{tx.id}</span>
            <span>{tx.from}</span>
            <span>{tx.to}</span>
            <span>{tx.status}</span>
        </div>
    );
});