<script lang="ts">
  import DepositInfo from "../components/DepositInfo.svelte";
  import Voucher from "../components/Receipt.svelte";
  import Bottle from "../components/Bottle.svelte";
  import Button from "../components/Button.svelte";
  import {
    createBottleStore,
    type TypeOfBottle,
  } from "../stores/bottle.svelte.js";
  import { createVoucherStore } from "../stores/voucher.svelte.js";
  import { Confetti } from "svelte-confetti";

  let showConfetti = $state(false);

  const {
    state: bottleStoreState,
    depositBottle,
    updateSelectedBottleType,
    updateAllCollectedBottles,
    collectBottles: requestVoucher,
    resetState: resetBottleState,
  } = createBottleStore();

  const {
    state: voucherStoreState,
    updateVoucher,
    updateVoucherCredit,
  } = createVoucherStore();

  function handleDepositBottle(type: TypeOfBottle) {
    depositBottle(type);
    updateSelectedBottleType(type);
    updateAllCollectedBottles(type);
    updateVoucherCredit(0);
  }

  function resetState() {
    resetBottleState();
    updateVoucherCredit(0);
    showConfetti = false;
  }

  async function collectBottles() {
    const voucher = await requestVoucher();
    if (voucher.voucherId) {
      updateVoucher(voucher.voucherId);
      resetBottleState();
    }
  }
</script>

<div class="flex justify-start gap-8 h-full w-full p-4">
  <div class="flex flex-col rounded shadow-lg h-full p-6">
    <h2 class="p4">Trykk på flasken for å begynne med panting</h2>
    <div class="flex p-4 my-3">
      <Bottle
        height="200px"
        width="300px"
        type="small"
        title="Pant liten flaske"
        onDeposited={() => handleDepositBottle("small")}
      ></Bottle>
      <Bottle
        height="300px"
        width="300px"
        type="large"
        title="Pant stor flaske"
        onDeposited={() => handleDepositBottle("large")}
      ></Bottle>
    </div>
    <div class="my-3">
      <DepositInfo
        amountOfLargeBottles={bottleStoreState.allCollectedBottles.large}
        amountOfSmallBottles={bottleStoreState.allCollectedBottles.small}
        amountOfMoney={bottleStoreState.amountOfMoney}
      ></DepositInfo>
    </div>
    <div class="flex justify-start my-3 gap-2">
      <Button type="primary" text="Ferdig" onSubmit={collectBottles}></Button>
      <Button type="secondary" text="Start på nytt" onSubmit={resetState}
      ></Button>
    </div>
  </div>

  <div>
    <Voucher
      onClaimedVoucher={() => (showConfetti = true)}
      amountOfMoney={voucherStoreState?.credit}
    ></Voucher>
  </div>
</div>

{#if showConfetti}
  <div
    style="
   position: fixed;
   top: -50px;
   left: 0;
   height: 100vh;
   width: 100vw;
   display: flex;
   z-index: 99;
   justify-content: center;
   overflow: hidden;
   pointer-events: none;"
  >
    <Confetti
      x={[-5, 5]}
      y={[0, 0.1]}
      delay={[500, 2000]}
      infinite
      duration={5000}
      amount={1000}
      fallDistance="100vh"
    />
  </div>
{/if}
