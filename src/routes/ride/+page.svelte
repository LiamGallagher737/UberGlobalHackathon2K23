<script lang="ts">
  /* eslint-disable */
  import { onMount } from 'svelte';
  import type { RouteFinderData } from '../api/route/finder/+server';
  import CarSelector from './CarSelector.svelte';
  import Map from './Map.svelte';

  const FINDER_API_URL = '/api/route/finder';

  let points: number = 0;

  let mapComponent: Map;

  let vehicleId: string | null = null;

  let startMarker: google.maps.Marker;
  let endMarker: google.maps.Marker;

  let startLocation: string;
  let endLocation: string;

  let startSet: boolean = false;
  let endSet: boolean = false;

  type SettingState = 'start' | 'end' | 'nothing';

  let state: SettingState = 'nothing';

  async function calculatePoints() {
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
</script>

<section class="pt-24 flex flex-col items-center justify-center w-screen bg-white">
  <Map
    bind:this={mapComponent}
    bind:startMarker
    bind:endMarker
    bind:state
    bind:startSet
    bind:endSet
    bind:startLocation
    bind:endLocation
  />

  <form class="w-9/12 md:w-9/12" action="">
    <input
      type="text"
      placeholder="Enter start point, or select on map"
      on:click={() => {
        state = 'start';
      }}
      bind:value={startLocation}
      name="start"
      id="2"
      class="bg-transparent p-5 w-full h-10 rounded-2xl shadow-xl mb-7"
    />
    <input
      type="text"
      placeholder="Enter end point, or select on map"
      on:click={() => {
        state = 'end';
      }}
      bind:value={endLocation}
      name="end"
      id="1"
      class="bg-transparent p-5 w-full h-10 rounded-2xl shadow-xl mb-7"
    />
    <div class="flex">
      <button
        on:click={calculatePoints}
        class="transition duration-200 w-40 h-10 rounded-xl bg-blue-500 shadow-md mr-5"
        >Calculate Points</button
      >
      <div class="flex items-center justify-center bg-gray-500 w-40 h-10 rounded-xl">
        <p class=" text-xl text-center">{points} points</p>
      </div>
    </div>
  </form>

  <form action="">
    <div class="mt-5 flex flex-col gap-4">
      <CarSelector bind:option={vehicleId} />
    </div>
  </form>
</section>
