<script>
  export let profile;
</script>

<style>
  .box-margin {
    padding: 1rem 0;
  }
</style>

<li class="col-2-5">
  <div class="box-item box-style4">
    <a href={`/profiles/${profile._id}`} class="profile-link">
      {profile.userName}
    </a>
    <div class="box-cover">
      <div class="box-margin" />
      <div class="avatar">
        <img
          src={profile.profileImage ? profile.profileImage.image140URL : 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=140&h=140'}
          width="70"
          height="70"
          alt={profile.userName}
          class="lazy" />
      </div>
    </div>
    <div class="box-info">
      <div class="content">
        <h3 class="row">
          <a href={`/profiles/${profile._id}`}>{profile.userName}</a>
        </h3>
        <div class="row">
          {#if profile.bio}
            <strong>
              <a href={`/profiles/${profile._id}`} class="url">
                {profile.bio.length > 50 ? profile.bio
                      .substring(0, 50)
                      .concat('...') : profile.bio}
              </a>
            </strong>
          {/if}
        </div>
        <div class="row">{profile.skills}</div>
      </div>
    </div>
  </div>
</li>
