<script lang="ts">
  import { fade } from 'svelte/transition';

  export let positions: [number, number][];
  let scroll_y = 0;
</script>

<svelte:window bind:scrollY={scroll_y} />

{#each positions as [x, y]}
  <div
    transition:fade
    class="p-[25px] rounded-full bg-primary absolute shadow-circle"
    style="left: {x}px; top: {y}px; opacity: {(scroll_y - (y - 500)) / 100};"
  />
{/each}
