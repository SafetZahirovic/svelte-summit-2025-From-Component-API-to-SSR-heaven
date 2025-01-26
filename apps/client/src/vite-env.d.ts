/// <reference types="svelte" />
/// <reference types="vite/client" />

declare interface Window {
  LottieInteractivity: {
    create: (options: {
      player: unknown;
      mode: string;
      actions: Array<{
        type: string;
        forceFlag?: boolean;
        reset?: boolean;
      }>;
    }) => void;
  };
}

declare interface HTMLLottieElement extends HTMLElement {
  getLottie: () => {
    play: () => void;
    pause: () => void;
    stop: () => void;
  };
}
