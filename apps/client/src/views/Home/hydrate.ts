import { hydrate } from "svelte";
import Home from "./Index.svelte";

declare global {
    interface Window {
        __PRELOADED_STATE__: {
            name: string
        }
    }
}

hydrate(Home, {
    target: document.getElementById("app")!,
    props: window.__PRELOADED_STATE__
})
