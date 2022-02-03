<svelte:options immutable />

<script>
  import { populate, url, contestName } from "../utilis/utilis";
  import { onMount } from "svelte";
  import Sitehead from "./_components/siteHead/Sitehead.svelte";
  import Boxheading from "./_components/Boxheading.svelte";
  import { loading, about } from "../store";
  import AdvertLi from "./_components/advert/advertLi.svelte";
  import FinalistLi from "./_components/contestant/FinalistLi.svelte";
  import Sponsors from "./_components/advert/sponsors.svelte";
  import FlyerHead from "./_components/siteHead/flyerHead.svelte";

  let todayFinalist = [];
  let listedFinalist = [];
  let sponsors = [];
  let page = 1;
  let totalPages;

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

  /*
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
  */

  const fetchSponsors = async () => {
    try {
      $loading = true;

      const response = await fetch(`${url}sponsor/list/random?num=2`);
      const res = await response.json();
      $loading = false;

      if (res?.success) {
        sponsors = await res.data;
      }
    } catch (err) {
      $loading = false;

      console.log(err);
    }
  };

  onMount(async () => {
    await fetchRandomFinalist();
    await fetchFinalist(1, 5);
    await fetchSponsors();
  });
</script>

<svelte:head>
  <title>Welcome to {contestName}</title>
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
  <FlyerHead inProgress={false} about={$about} />
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
        {#if sponsors.length > 0}
          {#each sponsors as sponsor}
            <Sponsors {sponsor} />
          {/each}
        {/if}
      </ul>
    </div>
  </div>
</div>

{#if $about?.isInProgress}
  {#if listedFinalist?.length > 0}
    <div class="block pt-0" id="block-sotd">
      <div class="inner">
        <Boxheading
          headStyle="no-flex"
          headTitle="Explore"
          headSpan="Vote for your favourite"
        />

        <div class="grid js-grid">
          <ul class="list-items list-flex list-one-row">
            {#each listedFinalist as contestant}
              <FinalistLi {contestant} />
            {/each}
          </ul>
        </div>
      </div>
    </div>
  {/if}
{/if}
