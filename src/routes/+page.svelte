<script lang="ts">
  import logo from '$lib/assets/logo.svg';
  import blob from '$lib/assets/blobs/blob.svg';
  import blob2 from '$lib/assets/blobs/blob2.svg';
  import blob3 from '$lib/assets/blobs/blob3.svg';
  import blob4 from '$lib/assets/blobs/blob4.svg';

  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  import { inview } from 'svelte-inview';
  import type { Options } from 'svelte-inview';

  // in view bool for each blob
  let viewBools = [false, false, false, false, false, false, false];

  const options: Options = {
    rootMargin: '-100px',
    unobserveOnEnter: true,
  };
</script>

<div id="scrollArea" class="w-fill">
  <section id="sec-1" class="w-fill bg-white flex justify-center">
    <div id="text-wrapper" class="font-thin w-9/12 absolute top-16">
      <span class=""><img class="h-15" src={logo} alt="logo" /></span>
      <h1 class="text-center gradient-text font-semibold text-2xl pt-5">
        Unlocking a greener future
      </h1>
    </div>

    <div
      use:inview={options}
      on:inview_change={(event) => {
        const { inView } = event.detail;
        viewBools[0] = inView;
      }}
      class="blob -mr-[10rem] text-center mt-96"
    >
      {#if viewBools[0]}
        <div
          transition:fly={{ delay: 250, duration: 400, x: 200, opacity: 0, easing: quintOut }}
          class="-mb-72"
        >
          <img class="scale-[1.55] drop-shadow-xl" src={blob} alt="blob" />
          <div class="relative left-20 -top-[24rem] w-44 flex flex-col items-center">
            <h1 class="blob-title">Our Vision for a Greener Tomorrow</h1>
            <p class="blob-text w-64">
              Empowering eco-conscious individuals to make a positive impact on our planet through
              sustainable ridesharing experiences, while fostering a sense of community and healthy
              competition among users, all in pursuit of a greener, more sustainable future for
              generations to come.
            </p>
          </div>
        </div>
      {:else}
        <div class="-mb-72 opacity-0">
          <img class="scale-[1.55] drop-shadow-xl" src={blob} alt="blob" />
          <div class="relative left-20 -top-[24rem] w-44 flex flex-col items-center">
            <h1 class="blob-title">Our Vision for a Greener Tomorrow</h1>
            <p class="blob-text w-64">
              Empowering eco-conscious individuals to make a positive impact on our planet through
              sustainable ridesharing experiences, while fostering a sense of community and healthy
              competition among users, all in pursuit of a greener, more sustainable future for
              generations to come.
            </p>
          </div>
        </div>
      {/if}
    </div>
  </section>

  <section id="sec-2" class="w-[100vw] bg-white">
    <div
      use:inview={options}
      on:inview_change={(event) => {
        const { inView } = event.detail;
        viewBools[1] = inView;
      }}
      class="blob text-center mt-14"
    >
      {#if viewBools[1]}
        <div transition:fly={{ delay: 250, duration: 400, x: -200, opacity: 0, easing: quintOut }}>
          <img class="scale-[1.6] drop-shadow-xl" src={blob2} alt="blob" />
          <div class="relative left-16 -top-96 w-56 flex flex-col items-center">
            <h1 class="blob-title">Join the Ecoride Community</h1>
            <p class="blob-text w-80">
              Ecoride is more than just a rideshare platform; it's a thriving community of
              like-minded individuals dedicated to eco-conscious transportation. With our Eco Score
              system, you can actively engage, compete, and collaborate with fellow users to create
              a greener future. Your rides with Ecoride go beyond commuting; they contribute to a
              collective mission. Join the Ecoride community today and be a part of the change.
            </p>
          </div>
        </div>
      {:else}
        <div class="opacity-0">
          <img class="scale-[1.6] drop-shadow-xl" src={blob2} alt="blob" />
          <div class="relative left-16 -top-96 w-56 flex flex-col items-center">
            <h1 class="blob-title">Join the Ecoride Community</h1>
            <p class="blob-text w-80">
              Ecoride is more than just a rideshare platform; it's a thriving community of
              like-minded individuals dedicated to eco-conscious transportation. With our Eco Score
              system, you can actively engage, compete, and collaborate with fellow users to create
              a greener future. Your rides with Ecoride go beyond commuting; they contribute to a
              collective mission. Join the Ecoride community today and be a part of the change.
            </p>
          </div>
        </div>
      {/if}
    </div>

    <div
      use:inview={options}
      on:inview_change={(event) => {
        const { inView } = event.detail;
        viewBools[2] = inView;
      }}
      class="blob -mr-5 text-center -mt-80 -mb-44"
    >
      {#if viewBools[2]}
        <div transition:fly={{ delay: 250, duration: 400, x: -200, opacity: 0, easing: quintOut }}>
          <img class="drop-shadow-xl" src={blob4} alt="blob" />
          <div class="relative -top-[65vw] left-[30vw] w-44 flex flex-col items-center">
            <h1 class="blob-title">Start Riding Eco-Friendly</h1>

            <div class="bg-white rounded-2xl mt-5">
              <a href="/auth">
                <button class="sign-up-button gradient-text rounded-2xl"> Sign Up </button>
              </a>
            </div>
          </div>
        </div>
      {:else}
        <div class="opacity-0">
          <img class="drop-shadow-xl" src={blob4} alt="blob" />
          <div class="relative -top-[65vw] left-[30vw] w-44 flex flex-col items-center">
            <h1 class="blob-title">Start Riding Eco-Friendly</h1>

            <div class="bg-white rounded-2xl mt-5">
              <a href="/auth">
                <button class="sign-up-button gradient-text rounded-2xl"> Sign Up </button>
              </a>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </section>

  <section id="sec-3" class="w-[100vw] bg-white">
    <div
      use:inview={options}
      on:inview_change={(event) => {
        const { inView } = event.detail;
        viewBools[3] = inView;
      }}
      class="blob text-center -mr-10 mt-9"
    >
      {#if viewBools[3]}
        <div transition:fly={{ delay: 250, duration: 400, x: 200, opacity: 0, easing: quintOut }}>
          <img class="scale-[1.60] drop-shadow-xl" src={blob3} alt="blob" />
          <div class="relative -top-[23rem] left-12 w-56 flex flex-col items-center">
            <h1 class="blob-title">Driving Innovation for Sustainability</h1>
            <p class="blob-text w-80">
              Our Vision for a Greener Tomorrow Empowering eco-conscious individuals to make a
              positive impact on our planet through sustainable ridesharing experiences, while
              fostering a sense of community and healthy competition among users, all in pursuit of
              a greener, more sustainable future for generations to come.
            </p>
          </div>
        </div>
      {:else}
        <div class="opacity-0">
          <img class="scale-[1.60] drop-shadow-xl" src={blob3} alt="blob" />
          <div class="relative -top-[23rem] left-12 w-56 flex flex-col items-center">
            <h1 class="blob-title">Driving Innovation for Sustainability</h1>
            <p class="blob-text w-80">
              Our Vision for a Greener Tomorrow Empowering eco-conscious individuals to make a
              positive impact on our planet through sustainable ridesharing experiences, while
              fostering a sense of community and healthy competition among users, all in pursuit of
              a greener, more sustainable future for generations to come.
            </p>
          </div>
        </div>
      {/if}
    </div>

    <div
      use:inview={options}
      on:inview_change={(event) => {
        const { inView } = event.detail;
        viewBools[4] = inView;
      }}
      class="blob text-center -ml-10 -mt-32 -mb-60"
    >
      {#if viewBools[4]}
        <div transition:fly={{ delay: 250, duration: 400, x: -200, opacity: 0, easing: quintOut }}>
          <img class="scale-[1.75] drop-shadow-xl" src={blob2} alt="blob" />
          <div class="relative -top-[25rem] left-20 w-56 flex flex-col items-center">
            <h1 class="blob-title">Climb the Leaderboards with Your Eco Score</h1>
            <p class="blob-text w-80">
              Our Eco Score system tracks and rewards your eco-friendly ridesharing choices,
              allowing you to earn a coveted spot on our leaderboards. Climb to the top by choosing
              shared rides, opting for electric vehicles, and making eco-conscious decisions. Your
              journey towards a higher Eco Score not only reflects your dedication but also
              contributes to a collective effort to reduce carbon emissions.
            </p>
          </div>
        </div>
      {:else}
        <div class="opacity-0">
          <img class="scale-[1.75] drop-shadow-xl" src={blob2} alt="blob" />
          <div class="relative -top-[25rem] left-20 w-56 flex flex-col items-center">
            <h1 class="blob-title">Climb the Leaderboards with Your Eco Score</h1>
            <p class="blob-text w-80">
              Our Eco Score system tracks and rewards your eco-friendly ridesharing choices,
              allowing you to earn a coveted spot on our leaderboards. Climb to the top by choosing
              shared rides, opting for electric vehicles, and making eco-conscious decisions. Your
              journey towards a higher Eco Score not only reflects your dedication but also
              contributes to a collective effort to reduce carbon emissions.
            </p>
          </div>
        </div>
      {/if}
    </div>
  </section>

  <section id="sec-4" class="w-[100vw] bg-white">
    <div
      use:inview={options}
      on:inview_change={(event) => {
        const { inView } = event.detail;
        viewBools[5] = inView;
      }}
      class="blob -mr-5 text-center -mt-12"
    >
      {#if viewBools[5]}
        <div transition:fly={{ delay: 250, duration: 400, x: 200, opacity: 0, easing: quintOut }}>
          <img class="scale-[1.1] drop-shadow-xl" src={blob4} alt="blob" />
          <div class="relative -top-64 left-16 w-72 flex flex-col items-center">
            <h1 class="blob-title">Join the Ecoride Movement Today</h1>

            <div class="bg-white rounded-2xl mt-5">
              <a href="/auth">
                <button class="sign-up-button gradient-text rounded-2xl">Sign Up</button>
              </a>
            </div>
          </div>
        </div>
      {:else}
        <div class="opacity-0">
          <img class="scale-[1.1] drop-shadow-xl" src={blob4} alt="blob" />
          <div class="relative -top-64 left-16 w-72 flex flex-col items-center">
            <h1 class="blob-title">Join the Ecoride Movement Today</h1>

            <div class="bg-white rounded-2xl mt-5">
              <a href="/auth">
                <button class="sign-up-button gradient-text rounded-2xl">Sign Up</button>
              </a>
            </div>
          </div>
        </div>
      {/if}
    </div>

    <div
      use:inview={options}
      on:inview_change={(event) => {
        const { inView } = event.detail;
        viewBools[6] = inView;
      }}
      class="blob -mr-24 text-center -mt-56 -mb-16"
    >
      {#if viewBools[6]}
        <div transition:fly={{ delay: 250, duration: 400, x: 200, opacity: 0, easing: quintOut }}>
          <img class="scale-[0.55] drop-shadow-xl" src={blob2} alt="blob" />
          <div class="relative -top-[13.5rem] left-10 w-72 flex flex-col items-center">
            <a class="blob-title" href="#sec-1">Back to top</a>
          </div>
        </div>
      {:else}
        <div class="opacity-0">
          <img class="scale-[0.55] drop-shadow-xl" src={blob2} alt="blob" />
          <div class="relative -top-[13.5rem] left-10 w-72 flex flex-col items-center">
            <a class="blob-title" href="#sec-1">Back to top</a>
          </div>
        </div>
      {/if}
    </div>
  </section>
</div>

<style>
  :global(body) {
    background-color: rgb(0, 0, 0);
  }

  .gradient-text {
    background-image: linear-gradient(45deg, #f3ed47, #2adc7d);
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
  }

  .blob {
    float: right !important;
    width: 100%;
    height: auto;
  }

  .blob-title {
    color: white;
    font-size: x-large;
    font-weight: 900;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    line-height: normal;
  }

  .blob-text {
    color: white;
    text-align: center;
    font-size: 1.125rem /* 18px */;
    line-height: 1.75rem /* 28px */;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding-top: 1rem;
  }

  .sign-up-button {
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
    font-size: x-large;
    padding: 0.8rem 1.5rem;
  }

  section {
    overflow: hidden;
  }
</style>
