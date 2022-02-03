<svelte:options immutable />

<script>
  import { loading } from "../../store";
  import { onMount } from "svelte";
  import { url } from "../../utilis/utilis";

  let voteCount;

  const fetchVotes = async () => {
    try {
      $loading = true;

      const response = await fetch(`${url}vote/count`);

      const res = await response.json();

      $loading = false;

      if (res.success) {
        voteCount = res?.data;
      } else {
        voteCount = null;
      }
    } catch (err) {
      $loading = false;

      console.log(err);
    }
  };

  onMount(async () => {
    fetchVotes();
  });
</script>

<svelte:head>
  <title>Welcome to Vote Board</title>
</svelte:head>

{#if voteCount}
  <div class="inner width-1">
    <div class="box-page-votation">
      <div class="box-information">
        <div class="header">
          <div class="box-left">
            <ul class="menu-tabs">
              <li class="active">
                <div class="menu-item jury_votes">
                  {voteCount?.contestantCount} CANDIDATES
                </div>
              </li>
              <li>
                <div class="menu-item user_votes">
                  {voteCount?.totalVoteCount} VOTES
                </div>
              </li>
            </ul>
          </div>
          <div class="box-right">
            <span class="title">VOTES</span>
          </div>
        </div>
        {#if voteCount?.votes?.length > 0}
          <ul class="list-users-votes" id="jury_votes">
            {#each voteCount?.votes as vote}
              <li>
                <div class="box-left">
                  <div class="avatar">
                    <a href={`/contestant/${vote?.userId}`}>
                      <img
                        class="lazy lazy-loaded"
                        src={vote?.profilePic
                          ? vote.profilePic
                          : "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=70&h=70"}
                        width="50"
                        height="50"
                        alt={vote?.name}
                      />
                    </a>
                  </div>
                  <div class="info">
                    <div class="rows">
                      <div class="row">
                        <strong
                          ><a href={`/contestant/${vote?.userId}`}
                            >{vote?.name}</a
                          ></strong
                        >
                      </div>
                      <div class="row">{vote?.username}</div>
                    </div>
                  </div>
                </div>
                <div class="box-right">
                  <div class="item">
                    <span class="note">{vote?.voteCount}</span>
                  </div>
                </div>
              </li>
            {/each}
          </ul>
        {:else}
          <ul class="list-users-votes" id="jury_votes">
            <li>
              <div class="box-left">
                <div class="info">
                  <div class="rows">
                    <div class="row">
                      <strong>Voting has not commenced yet</strong>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        {/if}
      </div>
    </div>
  </div>
{:else}
  <div class="inner width-1">
    <div class="box-page-votation">
      <div class="box-information">
        <div class="header">
          <div class="box-left">
            <ul class="menu-tabs">
              <li class="active">
                <div class="menu-item jury_votes">CANDIDATES</div>
              </li>
              <li>
                <div class="menu-item user_votes">VOTES</div>
              </li>
            </ul>
          </div>
          <div class="box-right">
            <span class="title">VOTES</span>
          </div>
        </div>

        <ul class="list-users-votes" id="jury_votes">
          <li>
            <div class="box-left">
              <div class="info">
                <div class="rows">
                  <div class="row">
                    <strong>Voting has not commenced yet</strong>
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

<style>
  .box-page-votation {
    margin-bottom: 50px;
    margin-top: 50px;
  }

  .box-information:after {
    content: "";
    display: block;
    clear: both;
  }

  .box-information .header {
    display: flex;
    justify-content: space-between;
    height: 80px;
    margin-bottom: 2px;
    padding: 0 30px;
    background-color: #fcfcfc;
  }

  .box-information .header .box-left,
  .box-information .header .box-right {
    display: flex;
    align-items: center;
  }

  .menu-tabs {
    display: inline-block;
  }

  .menu-tabs li {
    position: relative;
    float: left;
    margin-left: 20px;
    transition: all 0.3s ease-in-out;
  }
  .box-information .header .menu-tabs li:first-child {
    margin-left: 0;
  }

  .menu-tabs .menu-item {
    position: relative;
    display: inline-block;
    line-height: normal;
    cursor: pointer;
  }
  .menu-tabs li.active .menu-item {
    font-weight: bold;
  }

  .menu-tabs li.active .menu-item:before {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #202121;
  }

  .list-users-votes > li {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2px;
    padding: 15px 30px;
    background-color: #fcfcfc;
  }

  .list-users-votes .box-left {
    display: flex;
  }

  .list-users-votes .avatar {
    float: left;
    width: 50px;
    margin-right: 20px;
    overflow: hidden;
  }

  .list-users-votes .avatar img {
    float: left;
    border-radius: 50%;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
  }

  .list-users-votes .info {
    display: flex;
    align-items: center;
  }

  .list-users-votes .info .row {
    margin: 4px 0;
  }

  .list-users-votes .info .row:nth-child(1) a {
    color: #202121;
  }

  .list-users-votes .item {
    display: inline-block;
    min-width: 50px;
    height: 50px;
    line-height: 50px;
    font-size: 30px;
    text-align: right;
    vertical-align: bottom;
  }

  .list-users-votes .item .note {
    display: block;
    min-width: 74px;
    text-align: right;
    font-size: 30px;
  }
</style>
