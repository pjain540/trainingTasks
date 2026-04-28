// hooks/mongoose-ability.plugin.ts
//@ts-nocheck
export const abilityPlugin = (schema) => {
    schema.pre("save", function (next) {
        const ability = this.$locals?.ability;

        if (!ability) return next();

        const canUpdate = ability.can("update", this);

        if (!canUpdate) {
            return next(new Error("Forbidden: Cannot update this resource"));
        }

        next();
    });
};