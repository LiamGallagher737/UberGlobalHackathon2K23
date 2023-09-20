<script lang="ts">
  import * as emissions from '$lib/emissions';

  let year: number | null;
  let manufacturer: string | null = null;
  let model: string | null = null;
  export let option: string | null = null;

  async function getOptions(year: number, manufacturer: string, model: string) {
    let res = await emissions.options(year, manufacturer, model);
    if (!Array.isArray(res)) {
      option = res.value;
      return null;
    }
    if (res.length === 1) {
      option = res[0].value;
      return null;
    }
    return res;
  }
</script>

<select
  bind:value={year}
  id="year"
  name="year"
  on:change={() => {
    manufacturer = null;
    model = null;
    option = null;
  }}
>
  <option value={null} selected disabled>Car year</option>
  <!-- eslint-disable-next-line -->
  {#each { length: 41 } as _, i}
    <option value={2024 - i}>{2024 - i}</option>
  {/each}
</select>

{#if year}
  {#await emissions.manufacturers(year)}
    Loading Manufacturers
  {:then data}
    <select
      bind:value={manufacturer}
      id="manufacturer"
      name="manufacturer"
      on:change={() => {
        model = null;
        option = null;
      }}
    >
      <option value={null} selected disabled>Car Manufacturer</option>
      {#each data as { text, value }}
        <option {value}>{text}</option>
      {/each}
    </select>
  {:catch}
    <p>An error occured when trying to get manufacturers</p>
  {/await}
{/if}

{#if year && manufacturer}
  {#await emissions.models(year, manufacturer)}
    Loading Models
  {:then data}
    <select
      bind:value={model}
      id="model"
      name="model"
      on:change={() => {
        option = null;
      }}
    >
      <option value={null} selected disabled>Car Model</option>
      {#each data as { text, value }}
        <option {value}>{text}</option>
      {/each}
    </select>
  {:catch}
    <p>An error occured when trying to get models</p>
  {/await}
{/if}

{#if year && manufacturer && model}
  {#await getOptions(year, manufacturer, model)}
    Loading Options
  {:then data}
    {#if data !== null}
      <select bind:value={option} id="option" name="option">
        <option value={null} selected disabled>Car Option</option>
        {#each data as { text, value }}
          <option {value}>{text}</option>
        {/each}
      </select>
    {/if}
  {:catch}
    <p>An error occured when trying to get options</p>
  {/await}
{/if}

{#if year && manufacturer && model && option}
  {#await emissions.vehicle(option)}
    Loading Vehicle Info
  {:then data}
    {#if data.emissionsList}
      <span>{data.emissionsList.emissionsInfo[0].score}</span>
    {:else}
      <span>No Score</span>
    {/if}
  {:catch}
    <p>An error occured when trying to get vehicle info</p>
  {/await}
{/if}
