<script lang="ts">
  import Profile from '$lib/components/Profile.svelte';
  import { onMount } from 'svelte';
  import { expoIn } from 'svelte/easing';
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

<div class="bg-green-400 flex flex-col justify-center items-center p-12">
  <Profile name={data.name} isPrivate={data.private} points={data.points} />

  <div class="mb-60">
    {#await friendURIPromise}
      <div />
    {:then friendURI}
      <p
        class="bg-green-800 rounded-lg text-green-100 p-1"
        transition:fade={{ delay: 0, duration: 1000, easing: expoIn }}
      >
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
