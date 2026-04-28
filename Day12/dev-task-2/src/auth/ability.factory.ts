// auth/ability.factory.ts
import { AbilityBuilder, createMongoAbility } from "@casl/ability";

export type AppAbility = ReturnType<typeof defineAbilities>;

export const defineAbilities = (user: any) => {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (!user) return build();

  switch (user.role) {
    case "Gov":
      can("manage", "all");
      break;

    case "Manufacturer":
      can("read", "Unit");
      can("update", "Unit", {
        currentOwner: user.participantId, // 🔥 ABAC
      });
      break;

    case "Pharmacy":
      can("read", "Unit");
      break;

    case "Citizen":
      can("read", "Unit", { isPublic: true });
      break;
  }

  return build();
};