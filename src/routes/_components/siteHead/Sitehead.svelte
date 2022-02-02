<script>
  import { onMount } from "svelte";
  import { formatDate, url, openLogin } from "../../../utilis/utilis";
  import { loading, about } from "../../../store";
  import FlyerHead from "./flyerHead.svelte";

  let todayContestant;

  onMount(async () => {
    try {
      $loading = true;
      const res = await fetch(`${url}contestants/finalist/random?num=1`);

      const resData = await res.json();

      todayContestant = await resData.data[0];

      $loading = false;
    } catch (err) {
      $loading = false;
      console.log(err);
    }
  });
</script>

{#if todayContestant}
  <div class="box-site-head">
    <div class="box-bg has-tablet">
      <a href={`/contestant/${todayContestant.userId._id}`}>
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img
          src={todayContestant?.profilePicture?.length > 0
            ? todayContestant?.profilePicture[0]?.imageLgURL
            : `https://source.unsplash.com/1900x700/weekly?contest`}
          alt="Background Large Image"
          width="1900"
          height="700"
          class="lazy lazy-loaded"
        />
      </a>
    </div>
    <div class="box-photo has-mobile">
      <a href={`/contestant/${todayContestant.userId._id}`}>
        <!--svelte-ignore a11y-img-redundant-alt-->
        <img
          src={todayContestant.profilePicture.length > 0
            ? todayContestant.profilePicture[0]?.imageURL
            : `https://source.unsplash.com/1900x700/weekly?contest`}
          data-srcset=""
          width="417"
          height="298"
          alt="Background Small Image"
          class="lazy"
        />
      </a>
    </div>
    <div class="box-content">
      <!--svelte-ignore a11y-missing-content -->
      <a href={`/contestant/${todayContestant.userId._id}`} class="site-link" />
      <div class="inner vertical-center">
        <div class="box-info">
          <div class="row">
            <h2 class="heading-large text-capitalize">
              <a href={`/contestant/${todayContestant.userId._id}`}
                >{todayContestant.userId.firstName}
                {todayContestant.userId.lastName}</a
              >
            </h2>
          </div>
          <div class="row">
            <div class="by">
              <strong>
                <a href={`/contestant/${todayContestant.userId._id}`}>
                  {todayContestant.bio.username}
                </a>
              </strong>
            </div>
          </div>
        </div>
        <div class="box-breadcrumb">
          <div class="box-left">
            <strong class="parent">
              <a href="#!">Contestant of The Day</a>
            </strong>
            <span class="text-x-thin">
              {formatDate(Date.now())}
            </span>
          </div>
          <div class="box-right" />
        </div>
        <div class="box-bl">
          <a
            href={`
          /vote/${todayContestant?.userId?._id}/${todayContestant?.bio?.username}/${todayContestant?.userId?.firstName}/${todayContestant?.userId?.lastName}`}
            class="js-visit-item bt-default green-fill"
          >
            Vote
          </a>
        </div>
        <div class="box-br" />
      </div>
    </div>
  </div>
{:else}
  <FlyerHead inProgress={true} />
{/if}

<style>
  .js-visit-item.bt-default.green-fill:hover {
    color: #111;
    background-color: #e6eaea;
  }
</style>
