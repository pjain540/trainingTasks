// middleware/ability.middleware.ts
//@ts-nocheck
import { defineAbilities } from "../auth/ability.factory";
import type { Request, Response, NextFunction } from "express";

export const attachAbility = (req: Request, res: Response, next: NextFunction) => {
    req.ability = defineAbilities(req.user);
    next();
};