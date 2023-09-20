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
  class="button shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] bg-green-500 rounded-b-2xl w-full h-12"
  >{signedIn ? 'Sign Out' : 'Sign In'}</button
>
