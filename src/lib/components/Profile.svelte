<script lang="ts">
  export let isPrivate = false;
  export let name = 'unnamed';
  export let points = 0;
  export let pfp =
    'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/136b7248-5a5e-4770-b023-742816304ba7/dece3ik-4e484636-1ef0-4ce5-82da-4182ae2509db.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEzNmI3MjQ4LTVhNWUtNDc3MC1iMDIzLTc0MjgxNjMwNGJhN1wvZGVjZTNpay00ZTQ4NDYzNi0xZWYwLTRjZTUtODJkYS00MTgyYWUyNTA5ZGIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.cxMAcRlAHynNxMSkHgew_mMGft6BzH2up_mgcQLI1R4';
</script>

<div
  class="gradient-border flex flex-col items-center justify-start filter drop-shadow-md p-2 rounded-2xl px-10"
>
  <img
    src={pfp}
    class="w-24 h-24 object-cover rounded-full mb-5"
    alt="{name} looking their best."
  />

  <p class="gradient-text text-4xl filter drop-shadow-xl mb-5">{name}</p>

  <p
    class="text-white font-bold text-md drop-shadow-xl mb-5 p-2 {!isPrivate
      ? 'bg-grad'
      : 't bg-gray-500'} rounded-lg p-1"
  >
    {isPrivate ? 'Private' : 'Public'}
  </p>

  <p class="mb-5 text-black text-lg filter drop-shadow-xl">
    {points} <span>ep</span>
  </p>
</div>

<style>
  .gradient-border {
    background: linear-gradient(#fff, #fff) padding-box,
      linear-gradient(135deg, #f3ed47, #2adc7d) border-box;
    border: 5px solid transparent;
  }

  .bg-grad {
    background-image: linear-gradient(to bottom right, #f3ed47, #2adc7d);
  }

  .gradient-text {
    background-image: linear-gradient(45deg, #f3ed47, #2adc7d);
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
  }
</style>
