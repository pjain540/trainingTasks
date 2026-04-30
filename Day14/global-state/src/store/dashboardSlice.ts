// src/store/dashboardSlice.ts
export const createDashboardSlice = (set: any) => ({
    transactions: [],

    setTransactions: (data: any[]) =>
        set((state: any) => {
            state.transactions = data;
        }),

    updateTransaction: (id: string, update: any) =>
        set((state: any) => {
            const tx = state.transactions.find((t: any) => t.id === id);
            if (tx) Object.assign(tx, update);
        }),
});