// src/components/TransactionTable/useVirtualRows.ts
//@ts-nocheck
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

export const useVirtualRows = (count: number) => {
    const parentRef = useRef<HTMLDivElement>(null);

    const virtualizer = useVirtualizer<HTMLDivElement, HTMLDivElement>({
        count,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 60,
        overscan: 10,
    });

    return { parentRef, virtualizer };
};