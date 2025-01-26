<script lang="ts">
  type Props = {
    amountOfSmallBottles: number;
    amountOfLargeBottles: number;
    amountOfMoney: number;
  };
  const {
    amountOfSmallBottles = 0,
    amountOfLargeBottles = 0,
    amountOfMoney = 0,
  }: Props = $props();
</script>

<div class="w-[34%]">
  <h2 class="p-1 font-bold">Pantet flasker</h2>
  <div class="flex p-1 justify-between">
    <p>Liten flaske</p>
    <p>{amountOfSmallBottles}</p>
  </div>
  <div class="flex p-1 justify-between">
    <p>Stor flaske</p>
    <p>{amountOfLargeBottles}</p>
  </div>
  <div class="flex p-1 justify-between">
    <p>Totalt</p>
    <p>{amountOfMoney} NOK</p>
  </div>
</div>
