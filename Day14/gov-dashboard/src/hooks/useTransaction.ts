// src/hooks/useTransactions.ts
//@ts-nocheck
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../api/transaction";

export const useTransactions = () => {
    return useInfiniteQuery({
        queryKey: ["transactions"],
        queryFn: fetchTransactions,
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    });
};