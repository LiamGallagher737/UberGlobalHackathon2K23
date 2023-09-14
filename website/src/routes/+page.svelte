<script lang="ts">
  import logo from '$lib/assets/logo.png';
  import Hops from './home/Hops.svelte';
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
</svelte:head>

<div class="p-[275px] rounded-full bg-[#F4FF9E] absolute left-[-168px] top-[-57px] shadow-circle" />
<div class="p-[262px] rounded-full bg-[#F0FF73] absolute left-[-156px] top-[-44px] shadow-circle" />
<div class="p-[250px] rounded-full bg-primary absolute left-[-143px] top-[-32px] shadow-circle" />

<div class="relative mt-14 ml-4">
  <img src={logo} alt="RideHop Logo" />
  <div class="pb-8" />
  <p class="text-3xl font-medium text-dark w-56">Revolutionizing the way you travel</p>
</div>

<div class="p-[60px] rounded-full bg-[#F0FF73] absolute left-[-27px] top-[582px] shadow-circle" />
<div class="p-[50px] rounded-full bg-primary absolute left-[-17px] top-[592px] shadow-circle" />

<Hops
  positions={[
    [219, 470],
    [251, 532],
    [260, 600],
    [250, 665],
  ]}
/>

<div class="pb-[450px]" />

<!-- Catch a Ride With Ease -->

<div class="p-[225px] rounded-full bg-[#F0FF73] absolute right-[-50px] top-[730px] shadow-circle" />
<div class="p-[212px] rounded-full bg-primary absolute right-[-36px] top-[743px] shadow-circle" />

<div class="relative mt-14 ml-auto mr-8 w-72">
  <h2 class="text-3xl font-medium text-dark text-center [text-wrap:balance]">Catch a Ride With Ease</h2>
  <div class="pb-8" />
  <p class="text-lg font-medium text-dark text-center">
    Welcome to RideHop, your one-stop solution for seamless urban commuting. Discover how we
    simplify your daily travel.
  </p>
</div>

<Hops
  positions={[
    [27, 1113],
    [8, 1169],
    [36, 1224],
  ]}
/>

<!-- Real-Time Updates goes here -->

<Hops
  positions={[
    [120, 1724],
    [90, 1778],
    [75, 1841],
    [90, 1904],
    [120, 1958],
  ]}
/>

<!-- Safe and Secure goes here -->

<Hops
  positions={[
    [290, 2433],
    [272, 2500],
    [232, 2556],
  ]}
/>

<!-- temp to add scroll room, remove once contents in -->
<div class="h-[3000px]" />
