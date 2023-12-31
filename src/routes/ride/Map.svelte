<script lang="ts">
  /* eslint-disable */
  import { PUBLIC_MAPS_API_KEY } from '$env/static/public';
  import { Loader } from '@googlemaps/js-api-loader';
  import { createEventDispatcher, onMount, type EventDispatcher } from 'svelte';
  import type { RouteFinderData } from '../api/route/finder/+server';

  const dispatcher = createEventDispatcher();

  const FINDER_API_URL = '/api/route/finder';

  const LINE_COLOUR: string = '#0b008a';
  const LINE_WEIGHT: number = 4;
  const LINE_OPACITY: number = 1.0;

  export let startMarker: google.maps.Marker;
  export let endMarker: google.maps.Marker;

  export let startLocation: string;
  export let endLocation: string;

  export let startSet: boolean = false;
  export let endSet: boolean = false;

  export let loader: Loader;

  type SettingState = 'start' | 'end' | 'nothing';

  export let state: SettingState = 'nothing';

  let userPosition = { lat: 0, lng: 0 };

  export let map: google.maps.Map;

  let geometry: google.maps.GeometryLibrary;

  onMount(async () => {
    loader = new Loader({
      apiKey: PUBLIC_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['maps', 'geometry', 'places'],
    });

    await loader.importLibrary('places').then(() => {
      dispatcher('loaded');
    });

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

    const mapOptions: google.maps.MapOptions = {
      center: userPosition,
      zoom: 10,
      streetViewControl: false,
      mapTypeControl: false,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP],
      },
      zoomControl: false,
      fullscreenControl: false,
      gestureHandling: 'greedy',
    };

    const mapDiv = document.getElementById('map') as HTMLInputElement;

    map = await loader.importLibrary('maps').then(({ Map }) => {
      return new Map(mapDiv, mapOptions);
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

  export function updateMapRoute(encodedPath: string) {
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

<div class="w-full h-full" id="map" />
