<script lang="ts">
  import Nav from '$lib/components/Nav.svelte';
  import '../app.css';
</script>

<div class="w-full px-4 fixed z-30 bottom-6 max-w-md left-1/2 -translate-x-1/2">
  <Nav />
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
