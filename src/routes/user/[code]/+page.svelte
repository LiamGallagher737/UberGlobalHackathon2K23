
<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from './$types';

  export let data: PageData;
    
</script>

<div>
    {#await userPromise}
        <span class="text-primary">Loading User</span>
    {:then user}
        <span>{data.name}</span>
    {:catch error}
        <span>An error occured: {error}</span>
    {/await}
</div>
