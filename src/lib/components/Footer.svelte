<script>
  import mailIcon from '$lib/assets/mail.svg';
  import phoneIcon from '$lib/assets/phone.svg';
</script>

<section id="footer" class="w-[100vw] h-[50vh] bg-grad">
  <div class="top-5 relative text-center">
    <h1 class="blob-title">Quick links</h1>

    <ul class="blob-text flex flex-col gap-1 relative top-2">
      <li><a href="/"><strong>Home</strong></a></li>
      <li><a href="/ride"><strong>Ride</strong></a></li>
      <li><a href="/leaderboard"><strong>Leaderboard</strong></a></li>
      <li><a href="/raffles"><strong>Raffles</strong></a></li>
      <li><a href="/about"><strong>About</strong></a></li>
      <li><a href="/contact"><strong>Contact</strong></a></li>
    </ul>
  </div>

  <div class="top-16 relative text-center">
    <h1 class="blob-title">Contact us</h1>

    <ul class="relative top-2">
      <li>
        <div class="flex justify-center">
          <img class="scale-150" src={mailIcon} alt="mail icon" />
          <p class="pl-5">example@gmail.com</p>
        </div>
      </li>
      <li>
        <div class="flex justify-center">
          <img class="scale-150" src={phoneIcon} alt="mail icon" />
          <p class="pl-5">123 456 7890</p>
        </div>
      </li>
    </ul>
  </div>
</section>

<style>
  h1 {
    color: white;
    font-size: x-large;
    font-weight: 900;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    line-height: normal;
  }

  .bg-grad {
    background-image: linear-gradient(to bottom right, #f3ed47, #2adc7d);
  }

  li {
    color: white;
    text-align: center;
    font-size: 1.125rem /* 18px */;
    line-height: 1.75rem /* 28px */;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
</style>
