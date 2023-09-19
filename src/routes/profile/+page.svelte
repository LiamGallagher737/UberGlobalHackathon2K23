<script lang="ts">
  import { onMount } from "svelte";

    export let data: {
        id: number;
        email: string;
        name: string;
        points: number;
        code: string;
        friends: number[] | null;
        private: boolean;
    };

    let friendURIPromise: Promise<string> = new Promise<string>(
        (resolve, reject) =>{
            onMount(() =>{
                const BASE_URI = window.location.host;
                resolve(`${BASE_URI}/user/${data.code}`)
            }
        )}
    );
    
</script>

<div class="bg-green-500 flex flex-col justify-center items-center p-12">
    <p class="text-green-100 bg-green-800 rounded-lg p-1">{data.private ? "Private" : "Public"}</p>
    <p class="text-green-200 bold text-5xl">{data.name}</p>
    <p class="text-green-800 text-3xl">{data.points}</p>

    <p>
        {#await friendURIPromise}
            loading friend URL...
        {:then friendURI}
            {friendURI}
        {/await}
    </p>

</div>