<script>
  import { signIn, signOut } from '@auth/sveltekit/client';
  import { page } from '$app/stores';
  import SigninButton from './SignInButton.svelte';

  let signedIn = !!$page.data.session;
</script>

<section class="flex items-center justify-around h-screen bg-white">
  <div
    class="w-4/5 h-1/3 md:w-1/3 md:h-1/2 rounded-3xl shadow-lg shadow-green-400 bg-gray-50 flex flex-col items-center justify-between"
  >
    {#if $page.data.session}
      <!-- {#if $page.data.session.user?.image}
        <span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
      {/if} -->
      <p class="signedInText mb-6 m-10">
        <small>Signed in as</small><br />
        <strong>{$page.data.session.user?.name ?? 'User'}</strong>
      </p>
    {:else}
      <p class="notSignedInText text-red-500 my-6">You are not signed in</p>
    {/if}

    <SigninButton {signedIn} on:signIn={signIn} on:signOut={signOut} />
  </div>
</section>
