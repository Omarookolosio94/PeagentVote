<script>
  import { onMount } from "svelte";
  import { about, loading } from "../../store";
  import { formatDate, url } from "../../utilis/utilis";
  import Sponsors from "../_components/advert/sponsors.svelte";
  import Boxheading from "../_components/Boxheading.svelte";

  let sponsors = [];

  const fetchSponsors = async () => {
    try {
      $loading = true;

      const response = await fetch(`${url}sponsor`);
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
    fetchSponsors();
  });

  onMount(async () => {
    console.log($about);
    if (!$about) fetchAbout();
  });
</script>

{#if about}
  <div class="block">
    <div class="inner width-1">
      <div class="page-headings style2">
        <hr />
        <h1 class="heading-x-large">
          <blockquote>{$about?.name}</blockquote>
        </h1>
        <p>
          {$about?.summary}
        </p>
      </div>
    </div>
  </div>

  <div class="block p-0">
    <div class="inner full-width">
      <img src="https://source.unsplash.com/1900x700/weekly?news" alt=" " />
    </div>
  </div>

  <div class="block">
    <div class="inner width-1">
      <div class="grid list-flex box-cols">
        <div class="col-1">
          <div class="box-info">
            {@html $about?.about}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="block">
    <div class="inner width-1">
      <div class="grid list-flex box-cols">
        <div class="col-6">
          <div class="box-info">
            <h2 class="heading-05 heading-underline style-left">Rules</h2>
            {@html $about?.rules}
          </div>
        </div>

        <div class="col-4 col-photo has-desktop">
          <div>
            <img
              src="https://source.unsplash.com/773x773/weekly?rule"
              alt=" "
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="block">
    <div class="inner width-1">
      <div class="grid list-flex box-cols">
        <div class="col-6">
          <div class="box-info">
            <h2 class="heading-05 heading-underline style-left">
              General Info
            </h2>
            <p><b>Start Date:</b> {formatDate($about?.startDate)}</p>
            <p><b>End Date:</b> {formatDate($about?.endDate)}</p>
            <p>
              <b>Status:</b>
              {$about?.isInProgress ? "In Progress" : "Not In Progress"}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<div class="block p-0" id="sponsors">
  <div class="inner">
    <Boxheading
      headStyle="p-0"
      headTitle="Sponsors"
      fullWidth={true}
      headSpan="Our proud sponsors"
    />

    <div class="grid">
      <ul class="list-items list-flex list-one-row">
        {#if sponsors.length > 0}
          {#each sponsors as sponsor}
            <Sponsors {sponsor} />
          {/each}
        {/if}
      </ul>
    </div>
  </div>
</div>

<div id="footer-bottom" />
