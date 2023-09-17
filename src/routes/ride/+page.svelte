<script lang="ts">
  /* eslint-disable */
  import { PUBLIC_MAPS_API_KEY } from '$env/static/public';
  import { Loader } from '@googlemaps/js-api-loader';
  import { onMount } from 'svelte';
  import type { RouteFinderData } from '../api/route/finder/+server';
  import { options } from '$lib/emissions';
  import * as emissions from '$lib/emissions';
  import CarSelector from './CarSelector.svelte';

  const FINDER_API_URL = '/api/route/finder';

  const loader = new Loader({
    apiKey: PUBLIC_MAPS_API_KEY,
    version: 'weekly',
    libraries: ['maps', 'geometry'],
  });

  const LINE_COLOUR: string = '#0b008a';
  const LINE_WEIGHT: number = 4;
  const LINE_OPACITY: number = 1.0;

  let startMarker: google.maps.Marker;
  let endMarker: google.maps.Marker;

  let startLocation: string;
  let endLocation: string;

  let year: number | null = null;
  let manufacturer: string | null = null;
  let model: string | null = null;
  let option: string | null = null;

  $: console.log('Start: ', startLocation);
  $: console.log('End: ', endLocation);

  let points: number = 0;

  let startSet: boolean = false;
  let endSet: boolean = false;

  type SettingState = 'start' | 'end' | 'nothing';

  let state: SettingState = 'nothing';

  let userPosition = { lat: 0, lng: 0 };

  let map: google.maps.Map;

  let geometry: google.maps.GeometryLibrary;

  onMount(async () => {
    geometry = await loader.importLibrary('geometry');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        map.setCenter(pos);
      });
    }

    const mapOptions = {
      center: userPosition,
      zoom: 10,
    };

    const mapDiv = document.getElementById('map') as HTMLInputElement;

    map = await loader.importLibrary('maps').then(({ Map }) => {
      return new Map(mapDiv, mapOptions);
    });

    map.setOptions({
      streetViewControl: false,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP],
      },
    });

    google.maps.event.addListener(
      map,
      'click',
      async (event: { latLng: google.maps.LatLngLiteral }) => {
        switch (state) {
          case 'start':
            updateStartMarker(event.latLng, map);
            break;
          case 'end':
            updateEndMarker(event.latLng, map);
            break;
          case 'nothing':
            break;
        }
        state = 'nothing';
      }
    );
  });

  let line: google.maps.Polyline | undefined;

  async function calculatePoints() {
    if (startSet && endSet) {
      const startPosition = startMarker.getPosition()?.toJSON();
      const endPosition = endMarker.getPosition()?.toJSON();

      if (!startPosition || !endPosition) throw new Error('Unable to find markers');

      const body: RouteFinderData = {
        start: startPosition,
        destination: endPosition,
        carEmissionsId: 'walking',
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

      updateMapRoute(encodedPath, map);
    }
  }

  function updateMapRoute(encodedPath: string, map: google.maps.Map) {
    const decodedPath = geometry.encoding.decodePath(encodedPath);

    if (line === undefined) {
      line = new google.maps.Polyline({
        path: decodedPath,
        geodesic: true,
        strokeColor: LINE_COLOUR,
        strokeOpacity: LINE_OPACITY,
        strokeWeight: LINE_WEIGHT,
      }) as google.maps.Polyline;
    } else {
      line.setPath(decodedPath);
    }

    line.setMap(map);
  }

  function updateStartMarker(location: google.maps.LatLngLiteral, map: google.maps.Map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    startSet = true;

    if (startMarker === undefined) {
      startMarker = new google.maps.Marker({
        position: location,
        label: 'S',
        map: map,
      });
    } else {
      startMarker.setPosition(location);
    }

    startLocation = `${startMarker.getPosition()?.lat()}, ${startMarker.getPosition()?.lng()}`;
  }

  function updateEndMarker(location: google.maps.LatLngLiteral, map: google.maps.Map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    endSet = true;

    if (endMarker === undefined) {
      console.log('Set the marker');

      endMarker = new google.maps.Marker({
        position: location,
        label: 'E',
        map: map,
      });
    } else {
      endMarker.setPosition(location);
    }

    endLocation = `${endMarker.getPosition()?.lat()}, ${endMarker.getPosition()?.lng()}`;
  }
</script>

<section class="pt-24 flex flex-col items-center justify-center w-screen bg-white">
  <div class="w-9/12 md:w-9/12 h-96 rounded-2xl shadow-lg mb-10" id="map" />

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
    <div class="mt-5 flex flex-col gap-4">
      <CarSelector />
    </div>
  </form>
</section>
