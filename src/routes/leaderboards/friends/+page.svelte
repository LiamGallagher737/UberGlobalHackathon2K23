<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  function backgroundColor(n: number) {
    switch (n) {
      case 0:
        return 'bg-yellow-300';
      case 1:
        return 'bg-gray-400';
      case 2:
        return 'bg-yellow-600';
    }
    return 'bg-white';
  }
</script>

<section class="w-screen h-screen flex flex-col items-center justify-center">
  {#if data.leaderboard && data.leaderboard.length !== 0}
    <ol class="w-5/6">
      {#each data.leaderboard as entry, n}
        <li
          class="flex justify-between w-full shadow-md rounded-md items-stretch p-5 mb-2 {backgroundColor(
            n
          )}"
        >
          <div class="flex flex-row gap-4">
            <span class="font-bold">{n + 1}.</span>
            <p class="italic">{entry.name}</p>
          </div>
          <p>{entry.points}</p>
        </li>
      {/each}
    </ol>
  {:else}
    <h1 class="text-2xl text-center w-3/4 [text-wrap:balance]">
      You'll need to add some friends first!
    </h1>
  {/if}
  <a
    href="/leaderboards/global"
    class="px-4 py-2 bg-accent text-white font-semibold text-xl rounded-md mt-4"
    >View global leaderboard</a
  >
</section>