// src/components/TransactionTable/TransactionTable.tsx
//@ts-nocheck
import React from "react";
import { useTransactions } from "../../hooks/useTransaction";
import { useVirtualRows } from "./useVirtualRows";
import { TransactionRow } from "./TransactionRow";
import { useMemo, useEffect } from "react";
import { useRevoke } from "../../mutation/useRevoke";

export const TransactionTable = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useTransactions();

    const revoke = useRevoke();

    const transactions = useMemo(
        () => data?.pages.flatMap((p) => p.data) ?? [],
        [data]
    );

    const { parentRef, virtualizer } = useVirtualRows(transactions.length);

    const items = virtualizer.getVirtualItems();

    useEffect(() => {
        const lastItem = items[items.length - 1];
        if (
            lastItem &&
            lastItem.index >= transactions.length - 5 &&
            hasNextPage &&
            !isFetchingNextPage
        ) {
            fetchNextPage();
        }
    }, [items, transactions.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <div ref={parentRef} style={{ height: "500px", overflow: "auto" }}>
            <div
                style={{
                    height: virtualizer.getTotalSize(),
                    position: "relative",
                }}
            >
                {items.map((vRow) => {
                    const tx = transactions[vRow.index];

                    if (!tx) return null;

                    return (
                        <div
                            key={tx.id}
                            style={{
                                position: "absolute",
                                transform: `translateY(${vRow.start}px)`,
                                width: "100%",
                            }}
                        >
                            <TransactionRow tx={tx} />
                            <button onClick={() => revoke.mutate(tx.id)}>
                                Revoke
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};