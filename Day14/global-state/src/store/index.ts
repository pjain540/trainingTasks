// src/store/index.ts
//@ts-nocheck
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createAuthSlice } from "./authSlice";
import { createDashboardSlice } from "./dashboardSlice";
import { createSocketSlice } from "./socketSlice";

export const useStore = create(
    devtools(
        persist(
            immer((...a) => ({
                ...createAuthSlice(...a),
                ...createDashboardSlice(...a),
                ...createSocketSlice(...a),
            })),
            {
                name: "auth-storage",
                storage: sessionStorage,
                partialize: (state: any) => ({
                    token: state.token, // only persist auth
                }),
            }
        )
    )
);