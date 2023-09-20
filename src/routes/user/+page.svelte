<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import Profile from '$lib/components/Profile.svelte';
  import { onMount } from 'svelte';
  import { expoIn } from 'svelte/easing';
  import { fade } from 'svelte/transition';
  import type { PageData } from './$types';
  import CarSelector from './CarSelector.svelte';
  import * as emissions from '$lib/emissions';

  export let data: PageData;

  let carModal = false;
  let carName: string | null = null;
  let vehicleId: string | null = null;

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

  async function addCar() {
    await fetch('/api/user/cars', {
      method: 'POST',
      body: JSON.stringify({
        name: carName,
        id: vehicleId,
      }),
    });

    invalidateAll();
  }
</script>

<div class="bg-grad w-screen min-h-screen">
  <div class="flex flex-col justify-center items-center pt-6">
    <Profile
      name={data.name}
      isPrivate={data.private}
      points={data.points}
      pfp={data.pfp ?? 'https://tenor.com/view/milksuck-cuteguy-filter-gif-25312572'}
    />

    <div class="flex flex-col justify-center items-center mt-5">
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
        class="gradient-border rounded-lg p-1 mt-2"
        >Make {data.private ? 'public' : 'private'}</button
      >
    </div>
  </div>

  <div class="px-10 mt-6">
    <ul class="flex flex-col gap-4 w-full text-[#444444] font-semibold text-xl">
      {#each data.cars ?? [] as car}
        <li class="px-6 py-3 bg-white rounded-full">
          <p>{car.name}</p>
        </li>
      {/each}
    </ul>

    <button
      class="px-4 py-2 mt-4 rounded-full border-dashed border-4 border-white text-white w-full text-xl font-semibold"
      on:click={() => (carModal = true)}
    >
      Add Car
    </button>
  </div>
</div>

{#if carModal}
  <div class="w-screen h-screen bg-black opacity-60 fixed left-0 top-0 z-40" />
  <div class="w-screen h-screen fixed left-0 top-0 z-50 flex items-center justify-center">
    <div class="bg-white rounded-md w-3/4 h-96 flex flex-col px-4 py-8 text-xl gap-4">
      <CarSelector bind:option={vehicleId} />

      {#if vehicleId}
        <input type="text" bind:value={carName} placeholder="Car Nickname" />
        {#await emissions.vehicle(vehicleId)}
          Loading...
        {:then data}
          {#if data.emissionsList}
            <button
              disabled={carName === null || carName.length < 3}
              class="bg-gradient-to-br from-[#F3ED47] to-[#2ADC7D] px-4 py-2 text-white rounded-xl font-semibold disabled:opacity-70 transition"
              on:click={() => {
                carModal = false;
                addCar();
              }}
            >
              Add Car
            </button>
          {:else}
            <span>{"Car hasn't been scored :("}</span>
          {/if}
        {:catch}
          <p>An error occured</p>
        {/await}
      {/if}
    </div>
  </div>
{/if}

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
