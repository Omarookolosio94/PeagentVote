<svelte:options immutable />

<script>
  import { populate, url } from "../../utilis/utilis";
  import { onMount } from "svelte";
  import Boxheading from "../_components/Boxheading.svelte";
  import { loading, about } from "../../store";
  import FinalistLi from "../_components/contestant/FinalistLi.svelte";

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
    if (page > totalPages) return console.log("Pages Reached Limit");

    pageLoading = true;

    page += 1;

    fetchFinalist(page);

    pageLoading = false;
  }

  onMount(async () => {
    fetchFinalist(1, 5);
  });
</script>

<svelte:head>
  <title>Welcome to {$about?.name}</title>
</svelte:head>

<svelte:window on:scroll={page < totalPages && populate(loadListedFinalist)} />

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
