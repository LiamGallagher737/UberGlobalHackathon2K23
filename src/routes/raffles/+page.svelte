<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  async function getUser() {
    return fetch('/api/user').then((res) => res.json());
  }

  let amounts = Array(data.result.length).fill(1);
</script>

<h1 class="gradient-text text-center font-black text-5xl mt-5">RAFFLES</h1>

<p class="gradient-text text-center font-bold text-2xl mt-5">
  You have:
  {#await getUser()}
    Loading...
  {:then data}
    {#if data.typeof == undefined}
      Login to view current ep
    {:else}
      {data.points}ep
    {/if}
  {/await}
</p>
<p class="gradient-text text-center font-bold text-2xl mt-5">Available raffles:</p>

<ul class="mt-10 flex flex-col justify-start items-center px-[5%]">
  {#each data.result as raffle, n}
    {@const close = new Date(raffle.closeDate)}
    <li class="gradient-rect mt-5 w-full flex p-5">
      <div class="w-1/2">
        <img src="https://i.imgflip.com/1z2ofw.jpg" alt="lol" />
      </div>

      <div class="w-1/2 flex flex-col items-center">
        <h2 class="gradient-text font-bold text-2xl pt-2 text-center">{raffle.name}</h2>
        <p class="font-medium pt-1">Cost: {raffle.entryCost}ep</p>
        <p class="font-medium pt-1">
          Closes: {close.getDay()}/{close.getMonth()}/{close.getFullYear()}
        </p>
        <div class="w-full flex pt-5">
          <div class="w-1/2 flex gap-2 items-center">
            <button class="rounded text-center text-white px-2 my-1" on:click={() => amounts[n]++}
              >+</button
            >
            <p>{amounts[n]}</p>
            <button
              class="rounded text-center text-white px-2 my-1"
              on:click={() => {
                if (amounts[n] > 1) amounts[n]--;
              }}>-</button
            >
          </div>
          <button class="p-2 w-1/2 rounded-xl text-white font-bold">ENTER</button>
        </div>
      </div>
    </li>
  {/each}
</ul>

<style>
  .gradient-text {
    background-image: linear-gradient(45deg, #f3ed47, #2adc7d);
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
  }

  .gradient-rect {
    border-radius: 15px;
    border: 5px solid #f3ed47;
    background: #fff;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  }

  button {
    background: linear-gradient(45deg, #f3ed47, #2adc7d);
  }
</style>
