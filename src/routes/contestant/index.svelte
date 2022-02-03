<svelte:options immutable />

<script>
  import { populate, url, contestName, openLogin } from "../../utilis/utilis";
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
{:else}
  <div class="block pt-0" id="block-sotd">
    <div class="inner">
      <Boxheading headStyle="no-flex" headTitle="Register" headSpan="" />

      <div class="grid js-grid">
        <ul class="list-items list-flex list-one-row">
          <li class="collection col-3">
            <div class="box-item">
              <figure class="rollover">
                <!--svelte-ignore a11y-missing-content -->
                <a href={""} on:click={openLogin} class="item-link">
                  <div class="box-photo">
                    <img
                      alt=""
                      width="417"
                      height="298"
                      class="lazy lazy-loaded"
                      src={`https://source.unsplash.com/313x224/weekly?model`}
                    />
                  </div>
                  <div class="hover-item center">
                    <div class="tooltip">
                      <div class="box-item">
                        <p style="color: white" />
                      </div>
                    </div>
                  </div>
                </a>
              </figure>
              <div class="box-info">
                <div class="content">
                  <div class="row" />
                  <div class="row row-auto">
                    Register to become a contestabt
                  </div>
                </div>
                <div class="footer">
                  <div class="box-left">
                    <div class="box-users-likes">
                      <div class="container-bt-circle" />
                    </div>
                  </div>
                  <div class="box-right">
                    <a href={""} class="bt-default small" on:click={openLogin}>
                      <span>Vote</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
{/if}
