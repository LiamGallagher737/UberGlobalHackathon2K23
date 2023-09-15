<script lang="ts">
    export let data;
</script>

<p>
    {#await data.streamed.views}
        Loading...
    {:then views}
        This page has been viewed {views} times.
    {:catch error}
        {error.message}
    {/await}
</p>
