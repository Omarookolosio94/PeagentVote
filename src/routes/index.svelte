<svelte:options immutable />

<script>
  import { populate, url, formatDate, openLogin } from "../utilis/utilis";
  import { onMount } from "svelte";
  import Sitehead from "./_components/siteHead/Sitehead.svelte";
  import Boxheading from "./_components/Boxheading.svelte";
  import { loading, about } from "../store";
  import AdvertLi from "./_components/advert/advertLi.svelte";
  import FinalistLi from "./_components/contestant/FinalistLi.svelte";
  import Sponsors from "./_components/advert/sponsors.svelte";

  let todayFinalist = [];
  let listedFinalist = [];
  let page = 1;
  let totalPages;
  let pageLoading;

  const fetchFinalist = async (page = 1, limit = 5) => {
    try {
      $loading = true;

      const res = await fetch(
        `${url}contestants/finalist/page?page=${page}&limit=${limit}`
      );

      const resData = await res.json();

      totalPages = await resData.data.totalPages;

      let awaitingFinalist = await resData.data.profiles;

      listedFinalist = listedFinalist.concat(awaitingFinalist);

      $loading = false;
    } catch (err) {
      $loading = false;

      console.log(err);
    }
  };

  function loadListedFinalist() {
    if (page > totalPages) return;

    pageLoading = true;

    page += 1;

    fetchFinalist(page);

    pageLoading = false;
  }

  const fetchRandomFinalist = async () => {
    try {
      $loading = true;

      const res = await fetch(`${url}contestants/finalist/random?num=3`);

      const resData = await res.json();

      todayFinalist = await resData.data;

      $loading = false;
    } catch (err) {
      $loading = false;

      console.log(err);
    }
  };

  const fetchAbout = async () => {
    try {
      $loading = true;

      const response = await fetch(`${url}admin/about`);

      const res = await response.json();
      $loading = false;

      if (res?.success) {
        $about = await res.data;
      }
    } catch (err) {
      $loading = false;

      console.log(err);
    }
  };

  onMount(async () => {
    fetchRandomFinalist();
  });

  onMount(async () => {
    fetchFinalist(1, 5);
  });

  onMount(async () => {
    fetchAbout();
  });
</script>

<svelte:head>
  <title>Welcome to {$about?.name}</title>
</svelte:head>

<svelte:window on:scroll={page < totalPages && populate(loadListedFinalist)} />

{#if $about?.isInProgress}
  <Sitehead />
  {#if todayFinalist.length > 0}
    <div class="block p-0" id="block-sotd">
      <div class="inner">
        <Boxheading
          headStyle="no-flex"
          headTitle="Contestant"
          headSpan="Selected Finalist"
        />
        <div class="grid js-grid">
          <ul class="list-items list-flex list-one-row">
            {#each todayFinalist as contestant}
              <FinalistLi {contestant} />
            {/each}
          </ul>
        </div>
      </div>
    </div>
  {/if}
{:else}
  <div class="box-site-head">
    <div class="box-bg has-tablet">
      <a href="\about">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img
          src={$about?.flyers?.length > 0
            ? $about?.flyers[0]?.imageLgURL
            : `https://source.unsplash.com/1900x700/weekly?green`}
          alt={$about?.name}
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
          src={$about?.flyers?.length > 0
            ? $about?.flyers[0]?.imageLgURL
            : `https://source.unsplash.com/1900x700/weekly?green`}
          width="417"
          height="298"
          alt={$about?.name}
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
                {formatDate($about?.startDate)} - {formatDate($about?.endDate)}
              </p>
            </div>
          </div>
          <div class="row">
            <div class="by">
              <strong>
                <span class="text-x-thin">
                  Event commences from <b>{formatDate($about?.startDate)}</b
                  >.Register and stand a chance to win amazing prizes
                </span>
              </strong>
            </div>
          </div>
        </div>
        <div class="box-breadcrumb">
          <div class="box-left">
            <strong class="parent">
              <a href="#!">{$about?.name}</a>
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

<div class="block p-0">
  <div class="inner">
    <Boxheading
      headStyle="p-0"
      headTitle="Promotions"
      fullWidth={true}
      headSpan="Reach Your Audience"
    />

    <div class="grid">
      <ul class="list-items list-flex list-one-row">
        <AdvertLi />
        <Sponsors />
        <Sponsors />
      </ul>
    </div>
  </div>
</div>

{#if $about?.isInProgress}
  <div class="block pt-0" id="block-sotd">
    <div class="inner">
      <Boxheading
        headStyle="no-flex"
        headTitle="Explore"
        headSpan="Vote for your favourite"
      />

      <div class="grid js-grid">
        <ul class="list-items list-flex list-one-row">
          {#if listedFinalist}
            {#each listedFinalist as contestant}
              <FinalistLi {contestant} />
            {/each}
          {/if}
        </ul>
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
