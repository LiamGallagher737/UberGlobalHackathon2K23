<script lang="ts">
  import NavMask from '$lib/assets/NavMask.svg';
  import home from '$lib/assets/icons/home.svg';
  import ticket from '$lib/assets/icons/ticket.svg';
  import leaderboard from '$lib/assets/icons/leaderboard.svg';
  import person from '$lib/assets/icons/person.svg';
  import car from '$lib/assets/icons/car.svg';
</script>

<nav class="w-full h-[70px] rounded-full bg-white z-40 flex justify-between items-center shadow-xl">
  <a
    href="/ride"
    class="absolute left-1/2 -translate-x-1/2 -top-1/2 bg-gradient-to-br from-[#F3ED47] to-[#2ADC7D] p-3 rounded-full shadow-xl"
  >
    <img width="55" height="55" src={car} alt="Ride" class="invert" />
  </a>

  <div class="flex flex-row justify-between flex-grow ml-6">
    <a href="/">
      <img class="normal-link" width="45" height="45" src={home} alt="Home" />
    </a>
    <a href="/raffles">
      <img class="normal-link" width="45" height="45" src={ticket} alt="Raffles" />
    </a>
  </div>

  <div class="px-14" />

  <div class="flex flex-row justify-between flex-grow mr-6">
    <a href="/leaderboard">
      <img class="normal-link" width="45" height="45" src={leaderboard} alt="Leaderboard" />
    </a>
    <a href="/profile">
      <img class="normal-link" width="45" height="45" src={person} alt="Profile" />
    </a>
  </div>
</nav>

<style>
  .normal-link {
    filter: invert(32%) sepia(0%) saturate(11%) hue-rotate(179deg) brightness(98%) contrast(83%);
  }
</style>
