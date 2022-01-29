<script>
  import { about } from "../../store";
  import { formatDate } from "../../utilis/utilis";
  import Sponsors from "../_components/advert/sponsors.svelte";
  import Boxheading from "../_components/Boxheading.svelte";
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
        <!--

          <div class="col-4 col-photo">
            <div>
              <img
                src="https://assets.awwwards.com/assets/images/pages/about-us/jury-01.jpg"
                alt=" "
              />
            </div>
          </div>
        -->
        <div class="col-4 col-photo has-desktop">
          <div>
            <img
              src="https://assets.awwwards.com/assets/images/pages/about-us/jury-02.jpg"
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
        <Sponsors />
        <Sponsors />
        <Sponsors />
        <Sponsors />
        <Sponsors />
      </ul>
    </div>
  </div>
</div>

<div id="footer-bottom" />
