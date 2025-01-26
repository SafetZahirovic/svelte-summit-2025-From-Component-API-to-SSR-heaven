import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockInstance,
} from "vitest";
import { createVoucherStore, type VoucherStore } from "../voucher.svelte.js";
import { assetsFetchMock } from "./commons.js";
import { voucherDto } from "../__fixtures__/fixtures.js";
import type { VoucherDtoSchema } from "@panteautomaten/server-types";

describe("VoucherStore", () => {
  let store: VoucherStore;
  let fetchMock: MockInstance;

  beforeEach(() => {
    fetchMock = vi
      .spyOn(global, "fetch")
      .mockImplementation(() => assetsFetchMock<VoucherDtoSchema>(voucherDto));
    store = createVoucherStore();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("should be defined", () => {
    expect(store.state).toStrictEqual({
      bottlesDeposited: 0,
      credit: 0,
    });
  });
  it("should update voucher credit", () => {
    store.updateVoucherCredit(10);

    expect(store.state.credit).toBe(10);
  });

  it("should update voucher", async () => {
    await store.updateVoucher("123");

    expect(store.state).toStrictEqual({
      bottlesDeposited: voucherDto.bottlesDeposited,
      credit: voucherDto.credit,
    });
  });

  it("should throw error if voucher not found", async () => {
    fetchMock.mockImplementationOnce(() => Promise.resolve({ ok: false }));

    await expect(store.updateVoucher("123")).rejects.toThrow(
      "Voucher not found"
    );
  });
});
