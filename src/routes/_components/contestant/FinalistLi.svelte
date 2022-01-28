<script>
  import { getVoteCount } from "../../../utilis/utilis";

  export let contestant;

  let voteCount;

  if (contestant) {
    voteCount = getVoteCount(contestant?.votes);
  }
  //export let colStyle = null;
</script>

<li class="collection col-3">
  <div class="box-item">
    <figure class="rollover">
      <!--svelte-ignore a11y-missing-content -->
      <a href={`/contestant/${contestant.userId._id}`} class="item-link">
        <div class="box-photo">
          <img
            alt="
            "
            width="417"
            height="298"
            class="lazy lazy-loaded"
            src={contestant.profilePicture.length > 0
              ? contestant.profilePicture[0]?.imageSmURL
              : `https://source.unsplash.com/313x224/weekly?model}`}
          />
        </div>
        <div class="hover-item center">
          <div class="tooltip">
            <div class="box-item">
              <p style="color: white">
                {getVoteCount(contestant?.votes)} Vote(s)
              </p>
            </div>
          </div>
        </div>
      </a>
    </figure>
    <div class="box-info">
      <div class="content">
        <div class="row">
          <h3>
            <a
              href={`/contestant/${contestant.userId._id}`}
              class="text-capitalize"
            >
              {contestant.userId.firstName}
              {contestant.userId.lastName}
            </a>
          </h3>
        </div>
        <div class="row row-auto">
          {contestant?.bio.username}
        </div>
      </div>
      <div class="footer">
        <div class="box-left">
          <div class="box-users-likes">
            <div class="container-bt-circle" />
          </div>
        </div>
        <div class="box-right">
          <a
            href={`/contestant/${contestant.userId._id}`}
            class="bt-default small"
          >
            <span>Vote</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</li>
