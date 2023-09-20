<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import Profile from '$lib/components/Profile.svelte';
  import { onMount } from 'svelte';
  import { expoIn } from 'svelte/easing';
  import { fade } from 'svelte/transition';
  import type { PageData } from './$types';

  export let data: PageData;

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

<div class="bg-grad flex flex-col justify-center items-center pt-5 pb-[50vh]">
  <Profile
    name={data.name}
    isPrivate={data.private}
    points={data.points}
    pfp={data.pfp ?? 'https://tenor.com/view/milksuck-cuteguy-filter-gif-25312572'}
  />

  <div class="mb-60 flex flex-col justify-center items-center mt-5">
    {#await friendURIPromise}
      <div />
    {:then friendURI}
      <button
        class="gradient-border hover:underline rounded-lg p-1"
        on:click={() => {
          navigator.clipboard.writeText(friendURI);
        }}
        transition:fade={{ delay: 0, duration: 1000, easing: expoIn }}
      >
        {friendURI}
        <span class="text-xs text-bold"> copy </span>
      </button>
    {/await}

    <button
      on:click={() => {
        setPrivate(!data.private);
      }}
      class="gradient-border rounded-lg p-1 mt-2">Make {data.private ? 'public' : 'private'}</button
    >
  </div>
</div>

<style>
  .gradient-border {
    background: linear-gradient(#fff, #fff) padding-box,
      linear-gradient(135deg, #f3ed47, #2adc7d) border-box;
    border: 5px solid transparent;
  }

  .bg-grad {
    background-image: linear-gradient(to bottom right, #f3ed47, #2adc7d);
  }
</style>
