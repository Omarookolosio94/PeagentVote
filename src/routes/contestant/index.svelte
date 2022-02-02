<svelte:options immutable />

<script context="module">
  export async function preload() {
    loading.set(true);

    const fetchAbout = async () => {
      try {
        const response = await this.fetch(`${url}admin/about`);

        const res = await response.json();

        if (res?.sucess) about.set(await resData.data);
      } catch (err) {
        console.log(err);
      }
    };

    await fetchAbout();

    loading.set(false);

    return;
  }
</script>

<script>
  import { populate, url, contestName } from "../../utilis/utilis";
  import { onMount } from "svelte";
  import Boxheading from "../_components/Boxheading.svelte";
  import { loading, about } from "../../store";
  import FinalistLi from "../_components/contestant/FinalistLi.svelte";
  import FlyerHead from "../_components/siteHead/flyerHead.svelte";

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
    fetchAbout();
  });

  onMount(async () => {
    fetchFinalist(1, 5);
  });
</script>

<svelte:head>
  <title>Welcome to {contestName}</title>
</svelte:head>

<svelte:window on:scroll={page < totalPages && populate(loadListedFinalist)} />

{#if listedFinalist.length > 0}
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
{:else if $about?.isInProgress == true}
  <FlyerHead inProgress={true} about={$about} />
{:else}
  <FlyerHead inProgress={false} about={$about} />
{/if}
