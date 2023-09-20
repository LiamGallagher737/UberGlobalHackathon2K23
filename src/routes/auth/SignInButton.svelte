<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let signedIn: boolean = false;

  const dispatch = createEventDispatcher();

  function onClick() {
    dispatch(signedIn ? 'signOut' : 'signIn');
  }
</script>

<button
  on:click={onClick}
  class="button bg-grad rounded-2xl w-1/2 h-20 mb-10 text-white font-bold text-2xl"
  >{signedIn ? 'Sign Out' : 'Sign In'}</button
>

<style>
  .bg-grad {
    background-image: linear-gradient(to bottom right, #f3ed47, #2adc7d);
  }
</style>
