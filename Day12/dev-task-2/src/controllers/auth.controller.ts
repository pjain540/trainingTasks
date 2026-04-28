// controllers/auth.controller.ts
//@ts-nocheck
export const getAbilities = (req, res) => {
    const rules = req.ability.rules;

    res.json({
        rules,
    });
};