<script lang="ts">
  export let isPrivate = false;
  export let name = 'unnamed';
  export let points = 0;
  export let pfp =
    'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/136b7248-5a5e-4770-b023-742816304ba7/dece3ik-4e484636-1ef0-4ce5-82da-4182ae2509db.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEzNmI3MjQ4LTVhNWUtNDc3MC1iMDIzLTc0MjgxNjMwNGJhN1wvZGVjZTNpay00ZTQ4NDYzNi0xZWYwLTRjZTUtODJkYS00MTgyYWUyNTA5ZGIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.cxMAcRlAHynNxMSkHgew_mMGft6BzH2up_mgcQLI1R4';

  
</script>

<div
  class="bg-green-500 flex flex-col items-center justify-start filter drop-shadow-md p-2 rounded-md max-h-50 m-10"
>
  <img src={pfp} class="w-20 h-20 object-cover rounded-full" alt="Profile Picture" />

  <p
    class="text-green-500 font-bold text-md drop-shadow-xl {!isPrivate
      ? 'bg-blue-200'
      : 'bg-orange-200'} rounded-lg p-1"
  >
    {isPrivate ? 'Private' : 'Public'}
  </p>
  <p class="mb-4 text-green-200 text-2xl filter drop-shadow-xl">{name}</p>
  <p class="mb-20 text-green-800 text-lg filter drop-shadow-xl">
    {points} <span class="text-sm">ep</span>
  </p>
</div>
