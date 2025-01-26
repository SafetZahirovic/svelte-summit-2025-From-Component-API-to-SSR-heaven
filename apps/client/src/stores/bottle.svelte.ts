import {
  collectDtoSchema,
  type CollectBodySchema,
} from "@panteautomaten/server-types";

export type BottleStore = ReturnType<typeof createBottleStore>;
export type TypeOfBottle = "small" | "large" | undefined;

type BottleStoreState = {
  amountOfMoney: number;
  typeOfBottle: TypeOfBottle;
  allCollectedBottles: {
    small: number;
    large: number;
  };
};

export const createBottleStore = () => {
  const initState: BottleStoreState = {
    amountOfMoney: 0,
    typeOfBottle: undefined,
    allCollectedBottles: {
      small: 0,
      large: 0,
    },
  };

  const state = $state(initState);

  return {
    get state() {
      return state;
    },
    depositBottle(type: TypeOfBottle) {
      if (type === undefined) {
        return;
      }
      state.amountOfMoney += type === "small" ? 2 : 3;
    },
    updateAllCollectedBottles(type: TypeOfBottle) {
      if (type === undefined) {
        return;
      }
      state.allCollectedBottles[type] += 1;
    },
    updateSelectedBottleType(type: TypeOfBottle) {
      if (type === undefined) {
        return;
      }
      state.typeOfBottle = type;
    },
    async collectBottles() {
      const body: CollectBodySchema = {
        amountOfMoney: state.amountOfMoney,
        amountOfBottles: {
          small: state.allCollectedBottles.small,
          large: state.allCollectedBottles.large,
        },
      };
      const response = await fetch("http://localhost:3000/api/bottle/collect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to collect bottles");
      }
      return collectDtoSchema.parse(await response.json());
    },
    resetState() {
      state.allCollectedBottles = initState.allCollectedBottles;
      state.amountOfMoney = initState.amountOfMoney;
      state.typeOfBottle = initState.typeOfBottle;
    },
  };
};
