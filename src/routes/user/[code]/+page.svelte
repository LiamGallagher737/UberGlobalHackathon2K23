<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  let disableBtn = false;

  async function addFriend() {
    disableBtn = true;
    const res = await fetch(`/api/user/${data.code}/add-friend`, { method: 'POST' });
    if (res.ok) data.isFriend = true;
    disableBtn = false;
  }
  async function removeFriend() {
    disableBtn = true;
    const res = await fetch(`/api/user/${data.code}/remove-friend`, { method: 'POST' });
    if (res.ok) data.isFriend = false;
    disableBtn = false;
  }
</script>

<div class="mt-16" />

<span>{data.name}</span>

{#if data.isFriend}
  <button
    class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-300 disabled:bg-orange-100 transition"
    disabled={disableBtn}
    on:click={removeFriend}
  >
    Remove Friend
  </button>
{:else if !data.isMe}
  <button
    class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-300 disabled:bg-orange-100 transition"
    disabled={disableBtn}
    on:click={addFriend}
  >
    Add as Friend
  </button>
{:else}
  <span>It's You!</span>
{/if}
