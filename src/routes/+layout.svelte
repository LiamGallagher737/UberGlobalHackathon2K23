<script lang="ts">
  import Nav from '$lib/components/Nav.svelte';
  import '../app.css';
</script>

<div class="w-full px-4 fixed z-30 bottom-6 max-w-md left-1/2 -translate-x-1/2">
  <Nav />
</div>

<div class="bg-black opacity-70 h-screen w-screen z-[100] fixed hidden sm:block">
  <h1 class="text-white text-4xl font-medium px-12">
    Please enter mobile view or decrease your window width
  </h1>
</div>

<main class="">
  <slot />
</main>

<style>
  :global(body) {
    background-color: white;
  }

  main {
    background-color: white;
    overflow-x: hidden;
    scroll-behavior: smooth !important;
  }
</style>
