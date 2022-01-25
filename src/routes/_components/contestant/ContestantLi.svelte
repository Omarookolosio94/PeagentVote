<script>
  export let contestant;
  export let colStyle = null;
</script>

<li class={colStyle ? colStyle : "col-3 "}>
  <div class="box-item">
    <figure class="rollover">
      <a href={`/contestant/${contestant.userId._id}`}>
        <div class="box-photo">
          <img
            alt="
            "
            width="417"
            height="298"
            class="lazy lazy-loaded"
            src={contestant.profilePicture.length > 0
              ? contestant.profilePicture[0]?.imageSmURL
              : `https://source.unsplash.com/313x224/weekly?models`}
          />
        </div>
      </a>

      <div class="hover-item top">
        <div class="tooltip">
          <div class="box-item">
            <p style="color: white">Vote</p>
          </div>
        </div>
      </div>
    </figure>

    <div class="box-info">
      <div class="content">
        <div class="row">
          <h3>
            <a href={`/contestant/${contestant.userId._id}`}
              >{contestant.userId.firstName} {contestant.userId.lastName}
            </a>
          </h3>
        </div>
        <div class="row row-2col">
          <div class="box-left text-capitalize">
            {#if contestant.bio.interests.length > 0}
              {#each contestant.bio.interests as interest}{interest}, {" "}{/each}
            {/if}
          </div>
          <!--
            <div class="box-right">{formatDate(article.createdAt)}</div>
          -->
        </div>
      </div>
      <div class="footer style2">
        <div class="box-left">
          <div class="box-byuser">
            <div class="item usertooltip" />
            <div class="by">
              <strong>
                <a
                  href={`/contestant/${contestant.userId._id}`}
                  class="text-black"
                >
                  {contestant.bio.username}
                </a>
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</li>

<!--

  <style>
    .tooltip .tooltip-text.danger {
      background-color: #d14836;
    }
    .tooltip .tooltip-text.danger:after {
      border-top-color: #d14836;
    }
    .tooltip .tooltip-text.edit {
      background-color: #325595;
    }
    .tooltip .tooltip-text.edit:after {
      border-top-color: #325595;
    }
  </style>
-->
