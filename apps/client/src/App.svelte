<script lang="ts">
  import type { Route } from "@mateothegreat/svelte5-router";
  import { route, Router } from "@mateothegreat/svelte5-router";
  import Home from "./pages/Home.svelte";
  import Admin from "./pages/Admin.svelte";
  import logo from "./assets/logo.png";

  const routes: Route[] = [
    {
      path: "/",
      component: Home,
    },
    {
      path: "admin",
      component: Admin,
    },
  ];
</script>

<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div
    class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
  >
    <a
      href="http://localhost:5173/"
      class="flex items-center space-x-3 rtl:space-x-reverse"
    >
      <img src={logo} class="h-8" alt="Panteautomaten" />
      <span
        class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
        >Panteautomaten</span
      >
    </a>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul
        class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
      >
        <li class="text-white">
          <a use:route href="/">Home</a>
        </li>
        <li class="text-white">
          <a use:route href="/admin">Admin</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<Router basePath="/" {routes} />
