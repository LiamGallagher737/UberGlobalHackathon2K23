<script>
  import { signIn, signOut } from '@auth/sveltekit/client';
  import { page } from '$app/stores';
  import SigninButton from './SignInButton.svelte';

  let signedIn = !!$page.data.session;
</script>

<section class="flex items-center justify-around h-screen bg-white">
  <div
    class="drop-shadow-xl w-[90%] h-1/2 gradient-border flex flex-col justify-between items-center rounded-3xl"
  >
    <div class="md:w-1/3 md:h-1/2 text-center">
      {#if $page.data.session}
        <p class="signedInText mb-6 m-10 text-3xl">
          <small class="text-black">Signed in as</small><br />
          <strong class="gradient-text">{$page.data.session.user?.name ?? 'User'}</strong>
        </p>
      {:else}
        <p class="notSignedInText gradient-text font-bold text-3xl mt-10">You are not signed in</p>
      {/if}
    </div>
    <SigninButton {signedIn} on:signIn={signIn} on:signOut={signOut} />
  </div>
</section>

<style>
  .gradient-text {
    background-image: linear-gradient(45deg, #f3ed47, #2adc7d);
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
  }

  .gradient-border {
    background: linear-gradient(#fff, #fff) padding-box,
      linear-gradient(135deg, #f3ed47, #2adc7d) border-box;
    border: 5px solid transparent;
  }
</style>
