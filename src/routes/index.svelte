<svelte:options immutable />

<script>
  import { populate, url } from "../../utilis/utilis";
  import { onMount } from "svelte";
  import Sitehead from "./_components/siteHead/Sitehead.svelte";
  import Boxheading from "./_components/Boxheading.svelte";
  import ContestantLi from "./_components/contestant/ContestantLi.svelte";
  import { loading } from "../store";

  let todayFinalist = [];
  let listedFinalist = [];
  let about;
  let page = 1;
  let totalPages;
  let pageLoading;

  const fetchFinalist = async (page = 1, limit = 10) => {
    try {
      $loading = true;

      const res = await fetch(
        `${url}/contestants/finalist/page?page=${page}&limit=${limit}`
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

  const fetchRandomFinalist = async () => {
    try {
      $loading = true;

      const res = await fetch(`${url}/contestants/finalist/random?num=6`);

      const resData = await res.json();

      todayFinalist = await resData.data;

      $loading = false;
    } catch (err) {
      $loading = false;

      console.log(err);
    }
  };

  const fetchSingleRandomFinalist = async () => {
    try {
      $loading = true;

      const res = await fetch(`${url}/contestants/finalist/random?num=1`);

      const resData = await res.json();

      todayFinalist = await resData.data[0];

      $loading = false;
    } catch (err) {
      $loading = false;

      console.log(err);
    }
  };

  onMount(async () => {
    fetchRandomFinalist();
  });

  /*
const deleteListedArticle = async (e) => {
    let fetchedArticle = await fetchSingleRandomArticle();
    listedArticles = listedArticles
    .filter((article) => article._id !== e.detail)
    .concat(fetchedArticle);
};
*/

  /*
const deleteTodayArticle = async (e) => {
    let fetchedArticle = await fetchSingleRandomArticle();
    todayArticle = todayArticle
    .filter((article) => article._id !== e.detail)
    .concat(fetchedArticle);
};
*/

  onMount(async () => {
    fetchFinalist(1, 10);
  });

  onMount(async () => {
    try {
      $loading = true;

      const res = await fetch(`${url}/admin/about`);

      const resData = await res.json();

      about = await resData.data;

      $loading = false;
    } catch (err) {
      $loading = false;

      console.log(err);
    }
  });
</script>

<svelte:head>
  <title>Welcome to {about.name}</title>
</svelte:head>

<svelte:window on:scroll={page < totalPages && populate(loadListedFinalist)} />

<Sitehead />

{#if todayFinalist.length > 0}
  <div class="block p-0" id="block-sotd">
    <div class="inner">
      <Boxheading
        headStyle="no-flex"
        headTitle="Contestant"
        headSpan="Selected Articles"
      />
      <div class="grid js-grid">
        <ul class="list-items list-flex list-one-row">
          {#each todayFinalist as finalist}
            <ContestantLi {finalist} />
          {/each}
        </ul>
      </div>
    </div>
  </div>
{/if}

<!--
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
        {#if collection}
          {#each collection as collection}
            <CollectionLi {collection} />
          {/each}
        {/if}
      </ul>
    </div>
  </div>
</div>

<div class="block pt-0" id="block-sotd">
  <div class="inner">
    <Boxheading
      headStyle="no-flex"
      headTitle="Explore"
      headSpan="Choose Your Poision"
    />

    <div class="grid js-grid">
      <ul class="list-items list-flex list-one-row">
        {#if listedArticles}
          {#each listedArticles as article}
            <ArticleLi {article} on:deleteArticle={deleteListedArticle} />
          {/each}
        {/if}
      </ul>
    </div>
  </div>

</div>
-->
