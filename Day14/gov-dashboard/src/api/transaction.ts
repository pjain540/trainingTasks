// src/api/transactions.ts

const generateData = (cursor: number, limit: number) => {
    return Array.from({ length: limit }, (_, i) => {
        const id = cursor + i;
        return {
            id: id.toString(),
            from: "User " + id,
            to: "User " + (id + 1),
            status: "ACTIVE",
            timestamp: new Date().toISOString(),
        };
    });
};

export const fetchTransactions = async ({ pageParam = 0 }) => {
    await new Promise((r) => setTimeout(r, 300)); // simulate delay

    const data = generateData(pageParam, 50);

    return {
        data,
        nextCursor: pageParam + 50 < 100000 ? pageParam + 50 : null,
    };
};