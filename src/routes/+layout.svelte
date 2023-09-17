<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '../app.css';
</script>

<Navbar />
<main class="">
  <slot />
</main>
<Footer />

<style>
  main {
    background-color: white;
    overflow-x: hidden;
    scroll-behavior: smooth !important;
  }
</style>
