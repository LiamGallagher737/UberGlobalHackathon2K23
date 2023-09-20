<script lang="ts">
  /* eslint-disable */
  import { onMount } from 'svelte';
  import type { RouteFinderData } from '../api/route/finder/+server';
  import CarSelector from '../user/CarSelector.svelte';
  import Map from './Map.svelte';
  import type { Loader } from '@googlemaps/js-api-loader';

  const FINDER_API_URL = '/api/route/finder';

  const options = {
    fields: ['formatted_address', 'geometry', 'name'],
    strictBounds: false,
  };

  let loader: Loader;

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

  let map: google.maps.Map;

  let loaded: boolean = false;

  function handleLoad(e: CustomEvent<any>): void {
    console.log('ASUDGJSGKDGJ');

    //   const input_start = document.getElementById("place-start") as HTMLInputElement;
    //   const input_end = document.getElementById("place-end") as HTMLInputElement;

    //   const autocomplete_start = new google.maps.places.Autocomplete(input_start, options);
    //   const autocomplete_end   = new google.maps.places.Autocomplete(input_end, options);

    //   autocomplete_start.bindTo("bounds", map);
    //   autocomplete_end.bindTo("bounds", map);

    //   autocomplete_end.addListener('place_changed', () => {
    //     const place = autocomplete_end.getPlace();

    //     if (place?.geometry === undefined) {
    //       throw new Error("get fucked");
    //     }

    //     if (place.geometry.viewport) {
    //     map.fitBounds(place.geometry.viewport);
    //   } else if (place.geometry.location) {
    //     map.setCenter(place.geometry.location);
    //     map.setZoom(17);
    //   }
    //   });
  }

  onMount(() => {});

  async function calculatePoints() {
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
</script>

<section class="pt-24 flex flex-col items-center justify-center w-screen bg-white">
  <Map
    on:loaded={handleLoad}
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

  <form class="w-9/12 md:w-9/12" action="">
    <input
      type="text"
      placeholder="Click here, then select start point on map"
      on:click={() => {
        state = 'start';
      }}
      bind:value={startLocation}
      name="start"
      id="place-start"
      class="text-sm bg-transparent p-5 w-full h-10 rounded-2xl shadow-xl mb-7"
    />
    <input
      type="text"
      placeholder="Click here, then select end point on map"
      on:click={() => {
        state = 'end';
      }}
      bind:value={endLocation}
      name="end"
      id="place-end"
      class="text-sm bg-transparent p-5 w-full h-10 rounded-2xl shadow-xl mb-7"
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
