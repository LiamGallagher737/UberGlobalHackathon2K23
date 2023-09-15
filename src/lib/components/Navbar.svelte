<script lang="ts">
  import logo from '$lib/assets/logo.svg';

  let navOpen: boolean = false;

  function toggleNav() {
    navOpen = !navOpen;
  }

  $: console.log(navOpen);
</script>

<header class="h-20">
  <nav class="flex items-center justify-between h-full mx-5">
    <span class=""><img class="t h-10" src={logo} alt="" /></span>

    <button
      on:click={toggleNav}
      id="burger"
      class="t z-20 h-8 w-10 flex flex-col items-end justify-between"
    >
      <div class="burger-line w-10 h-[2px] rounded-full bg-accent" />
      <div class="burger-line w-6 h-[2px] rounded-full bg-accent" />
      <div class="burger-line w-9 h-[2px] rounded-full bg-accent" />
    </button>

    <div
      class="transition duration-700 z-10 w-[100vw] h-[100vh] backdrop-blur-lg absolute top-0 left-[-100vw] flex items-center justify-evenly"
      class:active={navOpen}
    >
      <ul
        class="text-accent font-thin text-4xl tracking-[4px] flex flex-col items-center gap-8 align-middle"
      >
        <li><a href="/">Home</a></li>
        <li><a href="/ride">Ride</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </div>
  </nav>
</header>

<style lang="postcss">
  .active {
    background-color: rgba(0, 0, 0, 0.7);
    transform: translateX(100vw);
  }
</style>
