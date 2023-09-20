<script lang="ts">
  import { invalidateAll } from '$app/navigation';
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

  async function setPrivate(isPrivate: boolean) {
    const req = await fetch('/api/user/private', {
      method: 'put',
      body: JSON.stringify({ private: isPrivate }),
    });

    invalidateAll();
    return req.ok;
  }
</script>

<div class="bg-green-400 flex flex-col justify-center items-center p-12">
  <Profile name={data.name} isPrivate={data.private} points={data.points} />

  <div class="mb-60 flex flex-col justify-center items-center">
    {#await friendURIPromise}
      <div />
    {:then friendURI}
      <button
        class="bg-green-800 hover:underline rounded-lg text-green-100 p-1"
          on:click={() => {
            navigator.clipboard.writeText(friendURI);
          }}

        transition:fade={{ delay: 0, duration: 1000, easing: expoIn }}
      >
        {friendURI}
        <span
          class="text-xs text-bold"
          
        >
          copy
        </span>
      </button>
    {/await}
    <button
      on:click={() => {
        setPrivate(!data.private);
      }}
      class="bg-green-800 rounded-lg text-green-100 p-1 mt-2"
      >Make {data.private ? 'public' : 'private'}</button
    >
  </div>
</div>
