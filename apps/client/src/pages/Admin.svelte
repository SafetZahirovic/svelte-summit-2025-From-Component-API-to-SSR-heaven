<script lang="ts">
  import { createVoucherStore } from "../stores/voucher.svelte.js";

  const { allVouchers, getAllVouchers } = createVoucherStore();

  getAllVouchers();
</script>

<div class="flex flex-col rounded shadow-lg p-6 h-full">
  <h2 class="p4"><b>Oversikt over pant</b></h2>
  <div
    class="relative flex flex-col w-full h-[83vh] overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border"
  >
    <table class="w-full text-left table-auto min-w-max">
      <thead>
        <tr>
          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
            <p
              class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"
            >
              Id
            </p>
          </th>
          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
            <p
              class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"
            >
              Dato kjøpt
            </p>
          </th>
          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
            <p
              class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"
            >
              Antall små flasker pantet
            </p>
          </th>
          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
            <p
              class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"
            >
              Antall store flasker pantet
            </p>
          </th>
          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
            <p
              class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"
            >
              Pris
            </p>
          </th>
        </tr>
      </thead>
      <tbody>
        {#each allVouchers as voucher}
          <tr>
            <td class="p-4 border-b border-blue-gray-50">
              <p
                class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
              >
                {voucher.id}
              </p>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              <p
                class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
              >
                {voucher.createdAt}
              </p>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              <p
                class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
              >
                {voucher.bottlesDeposited?.small}
              </p>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              <p
                class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
              >
                {voucher.bottlesDeposited?.large}
              </p>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
              <p
                class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
              >
                {voucher.credit}
              </p>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
