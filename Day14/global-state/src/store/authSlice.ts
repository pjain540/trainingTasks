// src/store/authSlice.ts
//@ts-nocheck
export const createAuthSlice = (set: any) => ({
    token: null,

    login: (token: string) =>
        set((state: any) => {
            state.token = token;
        }),

    logout: () =>
        set((state: any) => {
            state.token = null;
        }),
});