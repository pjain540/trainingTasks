// src/mutations/useRevoke.ts
//@ts-nocheck
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRevoke = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await new Promise((r) => setTimeout(r, 500)); // fake API
        },

        onMutate: async (id) => {
            await qc.cancelQueries(["transactions"]);

            const prev = qc.getQueryData(["transactions"]);

            qc.setQueryData(["transactions"], (old: any) => ({
                ...old,
                pages: old.pages.map((p: any) => ({
                    ...p,
                    data: p.data.map((tx: any) =>
                        tx.id === id ? { ...tx, status: "REVOKED" } : tx
                    ),
                })),
            }));

            return { prev };
        },

        onError: (_err, _id, ctx) => {
            qc.setQueryData(["transactions"], ctx?.prev);
        },

        onSettled: () => {
            qc.invalidateQueries(["transactions"]);
        },
    });
};