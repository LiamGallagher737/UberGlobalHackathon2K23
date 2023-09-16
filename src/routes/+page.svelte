<script lang="ts">
  import logo from '$lib/assets/logo.svg';
  import blob1 from '$lib/assets/blobs/blob.svg';
</script>

<section id="sec-1" class="w-[100vw] h-[75vh] bg-white flex justify-center">
  <div id="text-wrapper" class="font-thin w-9/12 absolute top-1/4">
    <span class=""><img class="h-15" src={logo} alt="logo" /></span>
    <h1 class="text-center gradient-text font-semibold text-2xl pt-5">
      Unlocking a greener future
    </h1>
  </div>
</section>

<section id="sec-2" class="w-[100vw] h-[100vh] bg-white">
  <div class="blob -mr-24 text-center">
    <img class="scale-150" src={blob1} alt="blob" />
    <div class="absolute top-16 left-1/4 w-44 flex flex-col items-center">
      <h1 class="blob-title">Our Vision for a Greener Tomorrow</h1>
      <p class="blob-text w-56 pt-2">
        Empowering eco-conscious individuals to make a positive impact on our planet through
        sustainable ridesharing experiences, while fostering a sense of community and healthy
        competition among users, all in pursuit of a greener, more sustainable future for
        generations to come.
      </p>
    </div>
  </div>
</section>

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
    position: relative;
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
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
</style>
