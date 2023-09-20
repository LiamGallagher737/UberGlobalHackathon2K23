<script lang="ts">
  import { onMount } from 'svelte';
  import type { RouteFinderData } from '../api/route/finder/+server';
  import Map from './Map.svelte';
  import type { Loader } from '@googlemaps/js-api-loader';
  import plus from '$lib/assets/icons/plus.svg';
  import minus from '$lib/assets/icons/minus.svg';
  import mapMarker from '$lib/assets/icons/mapMarker.svg';
  import { fade } from 'svelte/transition';
  import type { PageData } from './$types';

  export let data: PageData;

  const FINDER_API_URL = '/api/route/finder';

  let loader: Loader;

  let points: number = 0;

  let mapComponent: Map;

  let vehicleId: string | null = data.cars?.[0].id;

  // eslint-disable-next-line
  let startMarker: google.maps.Marker;
  // eslint-disable-next-line
  let endMarker: google.maps.Marker;

  let startLocation: string;
  let endLocation: string;

  let startSet: boolean = false;
  let endSet: boolean = false;

  type SettingState = 'start' | 'end' | 'nothing';

  let state: SettingState = 'nothing';

  // eslint-disable-next-line
  let map: google.maps.Map;

  onMount(() => {});

  async function startRoute() {
    if (!startSet || !endSet) {
      alert('Start or end location missing');
    } else if (vehicleId === null) {
      alert('Please select a car');
    }

    if (startSet && endSet) {
      const startPosition = startMarker.getPosition()?.toJSON();
      const endPosition = endMarker.getPosition()?.toJSON();

      if (!startPosition || !endPosition) throw new Error('Unable to find markers');

      const body: RouteFinderData = {
        start: startPosition,
        destination: endPosition,
        carEmissionsId: vehicleId ?? 'walking',
      };

      const req = await fetch(FINDER_API_URL, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!req.ok) throw new Error('Unable to fetch route data');

      const data = await req.json();

      const encodedPath: string = data.path;

      if (!encodedPath) throw new Error('Unable to parse route data response');

      points = data.points;

      mapComponent.updateMapRoute(encodedPath);
    }
  }

  function zoom(amount: number) {
    const currentZoom = map.getZoom() ?? 10;
    let newZoom = currentZoom + amount;
    newZoom = Math.min(Math.max(newZoom, 1), 20);
    map.setZoom(newZoom);
  }
</script>

<div class="w-screen h-screen fixed">
  <Map
    bind:this={mapComponent}
    bind:loader
    bind:startMarker
    bind:endMarker
    bind:state
    bind:startSet
    bind:endSet
    bind:startLocation
    bind:endLocation
    bind:map
  />
</div>

<div class="fixed z-10 flex flex-col gap-2 right-2 bottom-32">
  <button class="p-2 bg-white shadow-xl rounded-full" on:click={() => zoom(1)}>
    <img class="icon" width="32" height="32" src={plus} alt="Zoom in" />
  </button>

  <button class="p-2 bg-white shadow-xl rounded-full" on:click={() => zoom(-1)}>
    <img class="icon" width="32" height="32" src={minus} alt="Zoom out" />
  </button>
</div>

<form class="fixed z-10 flex flex-col w-full px-6 gap-3 top-4" action="">
  <div class="flex flex-row gap-3">
    <input
      type="text"
      placeholder="Start Location"
      bind:value={startLocation}
      name="start"
      id="place-start"
      class="text-md bg-white p-5 w-full h-12 rounded-full shadow-xl"
    />
    <button
      class="p-3 rounded-full shadow-xl transition {state === 'start'
        ? 'bg-red-200'
        : 'bg-red-400'}"
      on:click={() => {
        state = 'start';
      }}
    >
      <img class="invert" width="32" height="32" src={mapMarker} alt="Set start" />
    </button>
  </div>

  <div class="flex flex-row gap-3">
    <input
      type="text"
      placeholder="Destination"
      bind:value={endLocation}
      name="end"
      id="place-end"
      class="text-md bg-white p-5 w-full h-12 rounded-full shadow-xl"
    />
    <button
      class="p-3 rounded-full shadow-xl transition {state === 'end' ? 'bg-red-200' : 'bg-red-400'}"
      on:click={() => {
        state = 'end';
      }}
    >
      <img class="invert" width="32" height="32" src={mapMarker} alt="Set end" />
    </button>
  </div>

  <div class="flex flex-row gap-3">
    <select
      name="car"
      id="car"
      class="text-md bg-white px-5 w-full h-12 rounded-full shadow-xl"
      bind:value={vehicleId}
    >
      {#each data.cars as { name, id }}
        <option value={id}>{name}</option>
      {/each}
      {#if data.cars.length === 0}
        <option value={null} disabled selected>You have no cars! Add one</option>
      {/if}
    </select>
    <a href="/user" class="p-3 rounded-full shadow-xl bg-red-400">
      <img class="invert" width="32" height="32" src={plus} alt="Set end" />
    </a>
  </div>

  {#if startLocation && endLocation}
    <button
      in:fade={{ duration: 150 }}
      on:click={startRoute}
      class="bg-gradient-to-br from-[#F3ED47] to-[#2ADC7D] px-4 py-2 rounded-full text-white text-3xl font-bold w-40 mx-auto shadow-xl"
    >
      Go
    </button>
  {/if}
</form>

<style>
  .icon {
    filter: invert(32%) sepia(0%) saturate(11%) hue-rotate(179deg) brightness(98%) contrast(83%);
  }
</style>
