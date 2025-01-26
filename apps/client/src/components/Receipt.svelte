<script lang="ts">
  import logo from "../assets/logo.png";
  import Button from "./Button.svelte";

  type Props = {
    amountOfMoney: number;
    onClaimedVoucher: () => void;
  };
  let { amountOfMoney = 0, onClaimedVoucher }: Partial<Props> = $props();
</script>

<div class="slot">
  <div class="paper-holder" class:print={amountOfMoney > 0}>
    <div class="paper shadow">
      <div class="company-info my-3">
        <h2>KVITTERING</h2>
        <hr style="border-top: dotted 1px; color:#f1f1f1" />
        <p>Selskap: Panteautomaten AS</p>
        <p>Adresse: Panteuatomaten Gate 14F, 0463 Oslo, Norway</p>
        <p>Tlf: +47 123 45 678</p>
        <hr style="border-top: dotted 1px; color:#f1f1f1" />
        <b>Beløp: {amountOfMoney} NOK</b>
        <div class="flex w-full justify-center my-3">
          <img width="200px" alt="logo" src={logo} />
        </div>
      </div>
      <Button
        class="my-3"
        onSubmit={onClaimedVoucher}
        type="primary"
        text="Løs inn"
      ></Button>
    </div>
  </div>
</div>

<style>
  .slot {
    width: 400px;
    height: 5px;
    background-color: black;
    border-radius: 5px;
    margin: 8px 0;
    position: relative;
  }
  .paper-holder {
    position: absolute;
    overflow: hidden;
    height: 0;
    top: 3px;
    left: 0;
    right: 0;
    transition: height 1s linear;
  }
  .paper {
    position: absolute;
    width: 390px;
    left: 5px;
    bottom: 0;
    height: 500px;
    line-height: 30px;
    text-align: center;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);

    border-top: 0;
  }
  .paper-holder.print {
    height: 501px;
  }
</style>
