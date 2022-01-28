<svelte:options immutable />

<script>
  import { populate, url } from "../utilis/utilis";
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

      const res = await fetch(`${url}admin/about`);

      const resData = await res.json();

      $about = await resData.data;

      $loading = false;
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
