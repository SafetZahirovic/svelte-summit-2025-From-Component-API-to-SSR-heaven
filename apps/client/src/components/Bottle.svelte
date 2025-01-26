<script lang="ts">
  type Props = {
    title: string;
    width?: number | string;
    height?: number | string;
    onDeposited: () => void;
    type: "small" | "large";
  };

  let preventClick = $state(false);
  let hover = $state(false);

  const {
    width = "400px",
    height = "400px",
    onDeposited,
    title: title,
    type,
  }: Props = $props();

  function onButtonClick() {
    if (preventClick) return;

    preventClick = true;
    ref.getLottie().play();

    const timeout = setTimeout(
      () => {
        ref.getLottie().stop();
        preventClick = false;
        clearTimeout(timeout);
      },
      type === "small" ? 500 : 1000
    );

    onDeposited();
  }

  let ref: HTMLLottieElement;
</script>

<svelte:head>
  <script
    src="https://unpkg.com/@lottiefiles/lottie-interactivity@latest/dist/lottie-interactivity.min.js"
  ></script>

  <script
    src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"
    type="module"
  ></script>
</svelte:head>

<div class="relative">
  {#if hover}
    <div class="absolute top-[70%] left-[30%] right-0 p-2 bg-white rounded-t">
      <b>{title}</b>
    </div>
  {/if}

  <div
    {title}
    class:overlay={hover}
    class:disable={preventClick}
    class="flex relative p-1 flex-col h-full items-center rounded justify-center cursor-pointer m-1 hover:border hover:border-gray-300"
  >
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <dotlottie-player
      onclick={onButtonClick}
      src="https://lottie.host/88c1c7cd-4ad5-4747-955a-229ad8bd0ea7/8tCrcVRw3v.lottie"
      background="transparent"
      speed={type === "small" ? 2.5 : 1}
      onmouseleave={() => (hover = false)}
      onmouseenter={() => (hover = true)}
      bind:this={ref}
      style="position:relative; z-index: 1;width: {width}; height: {height};"
    ></dotlottie-player>
  </div>
</div>

<style>
  .disable {
    pointer-events: none;
    opacity: 0.5;
  }
  .overlay {
    filter: blur(1px) opacity(0.5);
  }
</style>
