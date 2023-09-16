<script lang="ts">
  import { PUBLIC_MAP_API_KEY } from '$env/static/public';
  import { Loader } from '@googlemaps/js-api-loader';
  import type LatLng from '@googlemaps/google-maps-services-js';
  import { Client } from '@googlemaps/google-maps-services-js';
  import { onMount } from 'svelte';

  const loader = new Loader({
    apiKey: PUBLIC_MAP_API_KEY,
    version: 'weekly',
    libraries: ['maps'],
  });

  let startMarker: google.maps.Marker;
  let endMarker: google.maps.Marker;

  let startSet: boolean = false;
  let endSet: boolean = false;

  let userPosition = { lat: 0, lng: 0 };

  let map: google.maps.Map;

  onMount(async () => {
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
      zoom: 4,
    };

    const mapDiv = document.getElementById('map') as HTMLInputElement;

    map = await loader.importLibrary('maps').then(({ Map }) => {
      return new Map(mapDiv, mapOptions);
    });

    google.maps.event.addListener(map, 'click', (event: { latLng: google.maps.LatLngLiteral }) => {
      if (!startSet) {
        updateStartMarker(event.latLng, map);
      } else if (!endSet) {
        updateEndMarker(event.latLng, map);
      }

      if (startSet && endSet) {
      }
    });
  });

  function updateStartMarker(location: google.maps.LatLngLiteral, map: google.maps.Map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.

    if (startMarker === undefined) {
      console.log('Set the marker');

      startMarker = new google.maps.Marker({
        position: location,
        label: 'S',
        map: map,
      });
    } else {
      startMarker.setPosition(location);
    }
  }

  function updateEndMarker(location: google.maps.LatLngLiteral, map: google.maps.Map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.

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
  }
</script>

<section class="flex flex-col items-center justify-evenly w-screen h-screen bg-white">
  <div class="w-1/2 h-1/2 rounded-2xl shadow-lg" id="map" />

  <form action="">
    <button
      on:click={() => {
        startSet = !startSet;
      }}
      class:bg-green-200={startSet}
      class="transition duration-200 w-32 h-10 bg-green-500 rounded-xl shadow-md m-5"
      >Set Start</button
    >
    <button
      on:click={() => {
        endSet = !endSet;
      }}
      class:bg-red-200={endSet}
      class="transition duration-200 w-32 h-10 bg-red-500 rounded-xl shadow-md m-5">Set End</button
    >
  </form>
</section>

<svelte:head>
  <script>
    ((g) => {
      var h,
        a,
        k,
        p = 'The Google Maps JavaScript API',
        c = 'google',
        l = 'importLibrary',
        q = '__ib__',
        m = document,
        b = window;
      b = b[c] || (b[c] = {});
      var d = b.maps || (b.maps = {}),
        r = new Set(),
        e = new URLSearchParams(),
        u = () =>
          h ||
          (h = new Promise(async (f, n) => {
            await (a = m.createElement('script'));
            e.set('libraries', [...r] + '');
            for (k in g)
              e.set(
                k.replace(/[A-Z]/g, (t) => '_' + t[0].toLowerCase()),
                g[k]
              );
            e.set('callback', c + '.maps.' + q);
            a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
            d[q] = f;
            a.onerror = () => (h = n(Error(p + ' could not load.')));
            a.nonce = m.querySelector('script[nonce]')?.nonce || '';
            m.head.append(a);
          }));
      d[l]
        ? console.warn(p + ' only loads once. Ignoring:', g)
        : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
    })({
      key: { PUBLIC_MAP_API_KEY },
      v: 'weekly',
      // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
      // Add other bootstrap parameters as needed, using camel case.
    });
  </script>
</svelte:head>
