export const assetsFetchMock = <T>(assets: T) =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: async () => assets,
  } as Response);
