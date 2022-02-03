<script>
  import { formatDate, openLogin } from "../../../utilis/utilis";

  export let inProgress = false;
  export let about;
</script>

{#if about}
  <div class="box-site-head">
    <div class="box-bg has-tablet">
      <a href="\about">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img
          src={about?.flyers?.length > 0
            ? about?.flyers[0]?.imageLgURL
            : `https://source.unsplash.com/1900x700/weekly?model`}
          alt={about?.name}
          width="1900"
          height="700"
          class="lazy lazy-loaded"
        />
      </a>
    </div>
    <div class="box-photo has-mobile">
      <a href="/about">
        <!--svelte-ignore a11y-img-redundant-alt-->
        <img
          src={about?.flyers?.length > 0
            ? about?.flyers[0]?.imageLgURL
            : `https://source.unsplash.com/1900x700/weekly?model`}
          width="417"
          height="298"
          alt={about?.name}
          class="lazy"
        />
      </a>
    </div>
    <div class="box-content" style="">
      <!--svelte-ignore a11y-missing-content -->
      <a href="/about" class="site-link" />
      <div class="inner vertical-center">
        <div class="box-info">
          <div class="row">
            <div class="heading-large text-capitalize">
              <p>
                {formatDate(about?.startDate)} - {formatDate(about?.endDate)}
              </p>
            </div>
          </div>
          <div class="row">
            <div class="by">
              <strong>
                {#if inProgress}
                  <span class="text-x-thin">
                    Event Ends on <b>{formatDate(about?.endDate)}</b>. Register
                    and stand a chance to win amazing prizes
                  </span>
                {:else}
                  Event commences from <b>{formatDate(about?.startDate)}</b>.
                  Register and stand a chance to win amazing prizes
                {/if}
              </strong>
            </div>
          </div>
        </div>
        <div class="box-breadcrumb">
          <div class="box-left">
            <strong class="parent">
              <a href="#!">{about?.name}</a>
            </strong>
          </div>
          <div class="box-right" />
        </div>
        <div class="box-bl">
          <a
            href={""}
            class="js-visit-item bt-default green-fill"
            on:click={openLogin}
          >
            Register
          </a>
        </div>
        <div class="box-br" />
      </div>
    </div>
  </div>
{/if}

<style>
  .js-visit-item.bt-default.green-fill:hover {
    color: #111;
    background-color: #e6eaea;
  }
</style>
