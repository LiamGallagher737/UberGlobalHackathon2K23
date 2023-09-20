<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import '../app.css';
</script>

<Navbar />
<main class="">
  <slot />
</main>

<style>
  :global(body) {
    background-color: white;
  }
</style>
