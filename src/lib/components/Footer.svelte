<script>
  import mailIcon from '$lib/assets/mail.svg';
  import phoneIcon from '$lib/assets/phone.svg';
</script>

<section id="footer" class="w-[100vw] bg-grad">
  <div class="text-center pb-44 pt-5">
    <h1 class="blob-title">Contact us</h1>

    <ul class="pb-2">
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
