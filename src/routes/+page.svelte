<script lang="ts">
  import logo from '$lib/assets/logo.svg';
  import blob from '$lib/assets/blobs/blob.svg';
  import blob2 from '$lib/assets/blobs/blob2.svg';
  import blob3 from '$lib/assets/blobs/blob3.svg';
  import blob4 from '$lib/assets/blobs/blob4.svg';
</script>

<section id="sec-1" class="w-[100vw] h-[100vh] bg-white flex justify-center">
  <div id="text-wrapper" class="font-thin w-9/12 absolute top-1/4">
    <span class=""><img class="h-15" src={logo} alt="logo" /></span>
    <h1 class="text-center gradient-text font-semibold text-2xl pt-5">
      Unlocking a greener future
    </h1>
  </div>
</section>

<section id="sec-2" class="w-[100vw] h-[120vh] bg-white">
  <div class="blob -mr-20 text-center top-20">
    <img class="scale-150" src={blob} alt="blob" />
    <div class="absolute top-5 left-20 w-44 flex flex-col items-center">
      <h1 class="blob-title">Our Vision for a Greener Tomorrow</h1>
      <p class="blob-text w-64">
        Empowering eco-conscious individuals to make a positive impact on our planet through
        sustainable ridesharing experiences, while fostering a sense of community and healthy
        competition among users, all in pursuit of a greener, more sustainable future for
        generations to come.
      </p>
    </div>
  </div>

  <div class="blob text-center top-44">
    <img class="scale-150" src={blob2} alt="blob" />
    <div class="absolute top-6 left-24 w-56 flex flex-col items-center">
      <h1 class="blob-title">Join the Ecoride Community</h1>
      <p class="blob-text w-96">
        Ecoride is more than just a rideshare platform; it's a thriving community of like-minded
        individuals dedicated to eco-conscious transportation. With our Eco Score system, you can
        actively engage, compete, and collaborate with fellow users to create a greener future. Your
        rides with Ecoride go beyond commuting; they contribute to a collective mission. Join the
        Ecoride community today and be a part of the change.
      </p>
    </div>
  </div>
</section>

<section id="sec-3" class="w-[100vw] h-[100vh] bg-white">
  <div class="blob -mr-5 text-center -top-16">
    <img src={blob4} alt="blob" />
    <div class="absolute top-32 left-32 w-44 flex flex-col items-center">
      <h1 class="blob-title">Start Riding Eco-Friendly</h1>

      <div class="bg-white rounded-2xl mt-5">
        <button class="sign-up-button gradient-text rounded-2xl"> Sign Up </button>
      </div>
    </div>
  </div>
</section>

<section id="sec-4" class="w-[100vw] h-[100vh] bg-white">
  
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
