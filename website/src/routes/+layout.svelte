<script>
  import '../app.css';
  import { page } from '$app/stores';
  import Menu from 'svelte-material-icons/Menu.svelte';
  import Close from 'svelte-material-icons/Close.svelte';

  let mobileNavOpen = false;

  const navLinks = [
    { title: 'Home', route: '/' },
    { title: 'Page 2', route: '/2' },
    { title: 'Page 3', route: '/3' },
    { title: 'Page 4', route: '/4' },
  ];
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<header class="h-14 w-full flex justify-center fixed top-0 z-50">
  <nav class="flex justify-between items-center w-11/12 h-full max-w-screen-xl lg:w-10/12">
    <!-- Don't show logo on homepage -->
    {#if $page.route.id !== '/'}
      <span>RideHop</span>
    {:else}
      <span />
    {/if}
    <button on:click={() => (mobileNavOpen = !mobileNavOpen)}>
      {#if !mobileNavOpen}
        <Menu width="40" height="40" class="text-primary" />
      {:else}
        <Close width="40" height="40" class="text-dark" />
      {/if}
    </button>
  </nav>
</header>

<div
  class="rounded-full bg-primary fixed -right-10 -top-10 p-[10px] transition duration-700 ease-in-out z-10 {!mobileNavOpen
    ? 'scale-0'
    : 'scale-[250]'}"
/>

<nav
  class="fixed w-screen h-screen z-20 origin-top-right transition duration-700 ease-in-out {!mobileNavOpen
    ? 'scale-0'
    : 'scale-1'}"
>
  <ul class="flex flex-col justify-center items-center h-full gap-10">
    {#each navLinks as { title, route }}
      <li>
        <a href={route} on:click={() => (mobileNavOpen = false)} class="text-dark text-5xl"
          >{title}</a
        >
      </li>
    {/each}
  </ul>
</nav>

<main class="bg-dark min-h-screen">
  <div class="pb-14" />
  <slot />
</main>
