<script>
  export let about;
</script>

<footer id="footer">
  <div class="box-top">
    <div class="inner">
      <div class="box-left">
        <h2 class="headline slogan not-mobile">
          {about?.name}
        </h2>
        <ul class="menu-footer">
          <li><a href="/about" class="item">About Us</a></li>
          <li><a href="/contestant" class="item">Contestant</a></li>
          <li><a href="/about#sponsors" class="item">Sponsors</a></li>
        </ul>
        <p class="follow">
          {#if about?.social}
            <strong>Contact us</strong>
            <a rel="noopener" href={about.social.twitter} target="_blank"
              >Twitter</a
            >
            <a rel="noopener" href={about?.social.facebook} target="_blank"
              >Facebook</a
            >
            <a rel="noopener" href={about?.social.instagram} target="_blank"
              >Instagram</a
            >
            <a rel="noopener" href={about?.social.youtube} target="_blank"
              >Youtube</a
            >
            <a href={`tel:` + about?.social?.whatsapp}>Whatsapp </a>
            <a
              href={`mailto:` + about?.social.email}
              target="_blank"
              rel="noopener noreferrer">Email</a
            >
          {/if}
        </p>
      </div>
    </div>
  </div>
  <div class="box-bottom">
    <div class="inner">
      <div class="box-left">
        <ul class="menu-footer">
          <li>
            <div class="box-select-lang">
              <div class="select" onclick=" ">
                English
                <img src="/icons/uk.svg" alt="" />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="box-right">
        <p>
          Designed by
          <strong>
            <a
              href="https://oghenemaro.com"
              target="_blank"
              rel="noopener nofollow"
            >
              Matrix Web
            </a>
          </strong>
        </p>
      </div>
    </div>
  </div>
</footer>
