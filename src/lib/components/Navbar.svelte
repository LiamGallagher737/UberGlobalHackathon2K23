<script lang="ts">
  let navOpen: boolean = false;

  function toggleNav() {
    navOpen = !navOpen;
  }
</script>

<header class="z-10 h-20 w-[100vw] fixed top-0 left-0">
  <nav class="flex items-center h-full mx-5 justify-end">
    

    <button
      on:click={toggleNav}
      id="burger"
      class="t z-20 h-8 w-10 flex flex-col items-end justify-between"
      class:clicked={navOpen}
    >
      <div class="transition duration-300 burger-line w-10 h-[2px] rounded-full grad" />
      <div class="transition duration-300 burger-line w-6 h-[2px] rounded-full grad" />
      <div class="transition duration-300 burger-line w-9 h-[2px] rounded-full grad" />
    </button>

    <div
      class="transition duration-700 z-10 w-[100vw] h-[100vh] bg-grad absolute top-0 left-[-100vw] flex items-center justify-evenly"
      class:active={navOpen}
    >
      <ul
        class="text-white font-black flex flex-col items-center gap-2 align-middle"
      >
        <li><a on:click={toggleNav} href="/">HOME</a></li>
        <li><a on:click={toggleNav} href="/ride">RIDE</a></li>
        <li><a on:click={toggleNav} href="/leaderboard">LEADERBOARD</a></li>
        <li><a on:click={toggleNav} href="/about">ABOUT</a></li>
        <li><a on:click={toggleNav} href="/contact">CONTACT</a></li>
      </ul>
    </div>
  </nav>
</header>

<style lang="postcss">
  .active {
    background-color: rgba(0, 0, 0, 0.7);
    transform: translateX(100vw);
  }

  .clicked div {
    width: 2.5rem;
  }

  .clicked div:nth-of-type(2) {
    display: none;
  }

  .clicked div:nth-child(1) {
    transform: translateY(1rem) translateY(-50%) rotate(-45deg);
    background: white;
  }

  .clicked div:nth-child(3) {
    transform: translateY(-1rem) translateY(50%) rotate(45deg);
    background: white;
  }

  .bg-grad {
    background-image: linear-gradient(to bottom right, #f3ed47, #2adc7d);
  }

  .grad {
    background-image: linear-gradient(45deg, #f3ed47, #2adc7d);
  }

  li {
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    font-size: 2.7rem;
  }
</style>
