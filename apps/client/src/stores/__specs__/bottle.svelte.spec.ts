import type { CollectDtoSchema } from "@panteautomaten/server-types";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockInstance,
} from "vitest";
import { collectDto } from "../__fixtures__/fixtures.js";
import { createBottleStore, type BottleStore } from "../bottle.svelte.js";
import { assetsFetchMock } from "./commons.js";

describe("BottleStore", () => {
  let store: BottleStore;
  let fetchMock: MockInstance;

  beforeEach(() => {
    fetchMock = vi
      .spyOn(global, "fetch")
      .mockImplementation(() => assetsFetchMock<CollectDtoSchema>(collectDto));

    store = createBottleStore();
  });

  it("should have a state", () => {
    expect(store.state).toStrictEqual({
      allCollectedBottles: {
        large: 0,
        small: 0,
      },
      amountOfMoney: 0,
      typeOfBottle: undefined,
    });
  });

  it("should increase amount of money by 2", () => {
    store.depositBottle("small");

    expect(store.state.amountOfMoney).toBe(2);
  });

  it("should increase amount of money by 3", () => {
    store.depositBottle("large");

    expect(store.state.amountOfMoney).toBe(3);
  });

  it("should not increase amount of money", () => {
    store.depositBottle(undefined);

    expect(store.state.amountOfMoney).toBe(0);
  });

  it("should not update selected bittke", () => {
    store.updateSelectedBottleType(undefined);

    expect(store.state.typeOfBottle).toBe(undefined);
  });

  it("should increate amount of money by multiple amount", () => {
    store.depositBottle("small");
    store.depositBottle("small");
    store.depositBottle("large");

    expect(store.state.amountOfMoney).toBe(7);
  });

  it("should update the selected bottle type", () => {
    store.updateSelectedBottleType("small");

    expect(store.state.typeOfBottle).toBe("small");
  });

  it("should update all collected bottles", () => {
    store.updateAllCollectedBottles("small");

    expect(store.state.allCollectedBottles).toStrictEqual({
      small: 1,
      large: 0,
    });
  });

  it("should not update all collected bottles", () => {
    store.updateAllCollectedBottles(undefined);

    expect(store.state.allCollectedBottles).toStrictEqual({
      small: 0,
      large: 0,
    });
  });

  it("should update all collected bottles", () => {
    store.updateAllCollectedBottles("large");

    expect(store.state.allCollectedBottles).toStrictEqual({
      small: 0,
      large: 1,
    });
  });

  it("should update all collected bottles", () => {
    store.updateAllCollectedBottles("large");
    store.updateAllCollectedBottles("large");

    expect(store.state.allCollectedBottles).toStrictEqual({
      small: 0,
      large: 2,
    });
  });

  it("should update all collected bottles", () => {
    store.updateAllCollectedBottles("large");
    store.updateAllCollectedBottles("small");

    expect(store.state.allCollectedBottles).toStrictEqual({
      small: 1,
      large: 1,
    });
  });

  it("should update all collected bottles", () => {
    store.updateAllCollectedBottles("large");
    store.updateAllCollectedBottles("small");
    store.updateAllCollectedBottles("small");

    expect(store.state.allCollectedBottles).toStrictEqual({
      small: 2,
      large: 1,
    });
  });

  it("should send collected bottles and return a voucher", () => {
    store.depositBottle("large");
    store.updateAllCollectedBottles("large");

    const response = store.collectBottles();

    expect(response).resolves.toStrictEqual(collectDto);
  });

  it("should throw error if failed to collect bottles", () => {
    fetchMock.mockImplementationOnce(() => Promise.resolve({ ok: false }));

    expect(store.collectBottles()).rejects.toThrow("Failed to collect bottles");
  });
});
