<script lang="ts">
  import { onMount } from 'svelte';
  import { expoIn, expoOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';

  export let data: {
    id: number;
    email: string;
    name: string;
    points: number;
    code: string;
    friends: number[] | null;
    private: boolean;
  };

  let friendURIPromise: Promise<string> = new Promise<string>((resolve) => {
    onMount(() => {
      const BASE_URI = window.location.host;
      resolve(`${BASE_URI}/user/${data.code}`);
    });
  });
</script>

<div class="bg-green-500 flex flex-col justify-center items-center p-12">
  <p
    class="text-green-500 font-bold text-xl drop-shadow-xl {!data.private
      ? 'bg-blue-200'
      : 'bg-orange-200'} rounded-lg p-1 mt-20"
  >
    {data.private ? 'Private' : 'Public'}
  </p>
  <p class="mb-4 text-green-200 text-5xl filter drop-shadow-xl">{data.name}</p>
  <p class="mb-20 text-green-800 text-3xl filter drop-shadow-xl">
    {data.points} <span class="text-sm">points</span>
  </p>
  <div class="mb-60">
    {#await friendURIPromise }
        <div></div>
    {:then friendURI}
        <p class="bg-green-800 rounded-lg text-green-100 p-1" transition:fade={{delay: 0, duration:1000, easing:expoIn}}>
            {friendURI}
            <button
                class="hover:underline text-xs text-bold"
                on:click={() => {
                    navigator.clipboard.writeText(friendURI);
                }}
            >
                copy
            </button>
        </p>
    {/await}
  </div>
</div>
