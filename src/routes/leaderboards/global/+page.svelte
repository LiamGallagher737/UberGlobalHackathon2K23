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
  <ol class="w-5/6">
    {#each data.result as entry, n}
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
  <a href="/leaderboards/friends" class="px-4 py-2 bg-accent text-white font-semibold text-xl rounded-md mt-4">View friends leaderboard</a>
</section>
