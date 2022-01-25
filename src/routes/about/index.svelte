<script>
  import { about } from "../../store";
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
        <!--
          <div class="col-4 col-photo">
            <div>
              <img
                src="https://assets.awwwards.com/assets/images/pages/about-us/jury-01.jpg"
                alt=" "
              />
            </div>
          </div>
          <div class="col-4 col-photo has-desktop">
            <div>
              <img
                src="https://assets.awwwards.com/assets/images/pages/about-us/jury-02.jpg"
                alt=" "
              />
            </div>
          </div>
        -->
      </div>
    </div>
  </div>
{/if}
