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

  let userPosition = { lat: 0, lng: 0 };

  let map: google.maps.Map, infoWindow: google.maps.InfoWindow;

  onMount(async () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        map.setCenter(pos);
        
        new google.maps.Marker({
          position: userPosition,
          map,
          title: 'Hello World!',
        });
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

    infoWindow = new google.maps.InfoWindow();
  });
</script>

<section class="flex flex-col items-center justify-evenly w-screen h-screen">
  <div class="w-1/2 h-1/2 rounded-2xl shadow-lg" id="map" />

  <form action="">
    <button>Set Start</button>
    <button>Set End</button>
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
