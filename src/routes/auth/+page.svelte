<script>
  import { signIn, signOut } from '@auth/sveltekit/client';
  import { page } from '$app/stores';
</script>

<p class="gradient-text text-center text-2xl h-[50vh] relative top-32">
  {#if $page.data.session}
    {#if $page.data.session.user?.image}
      <span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
    {/if}
    <div>
      <span class="signedInText font-bold flex flex-col gap-2">
        <small>Signed in as</small><br />
        <strong class="text-4xl">{$page.data.session.user?.name ?? 'User'}</strong>
        <button on:click={() => signOut()} class="button">Sign Out</button>
      </span>
    </div>
  {:else}
    <div class="flex flex-col">
      <p class="notSignedInText">You are not signed in</p>
      <button class="font-black" on:click={() => signIn('auth0')}>Sign In</button>
    </div>
  {/if}
</p>

<style>
  .gradient-text {
    background-image: linear-gradient(45deg, #f3ed47, #2adc7d);
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
  }
</style>
