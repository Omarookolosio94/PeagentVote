<script>
  export let profile;
  export let user;

  $: isUser = user && profile._id === user._id;
</script>

<div class="block border-bottom">
  <div class="inner">
    <div class="box-profile">
      <div class="box-left">
        <div class="box-top">
          <ul class="list-bts">
            {#if profile.social}
              {#if profile.social.facebook}
                <li>
                  <a
                    href={profile.social.facebook}
                    target="_blank"
                    class="bt-circle bt-facebook medium black">
                    <i class="fab fa-facebook-f" />
                  </a>
                </li>
              {/if}
              {#if profile.social.twitter}
                <li>
                  <a
                    href={profile.social.twitter}
                    target="_blank"
                    class="bt-circle bt-twitter medium black">
                    <i class="fab fa-twitter" />
                  </a>
                </li>
              {/if}
              {#if profile.social.linkedin}
                <li>
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    class="bt-circle bt-linkedin medium black">
                    <i class="fab fa-linkedin" />
                  </a>
                </li>
              {/if}
              {#if profile.social.instagram}
                <li>
                  <a
                    href={profile.social.instagram}
                    target="_blank"
                    class="bt-circle bt-instagram medium black">
                    <i class="fab fa-instagram" />
                  </a>
                </li>
              {/if}
            {/if}
          </ul>
        </div>
      </div>
      <div class="box-center">
        <div class="avatar">
          <img
            src={profile.profileImage ? profile.profileImage.image140URL : 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=140&h=140'}
            width="70"
            height="70"
            alt={profile.userName}
            class="img-circle cursor-pointer" />
        </div>
        <div class="row">
          <h1 class="heading-medium has-url text-capitalize">
            {profile.userName}
          </h1>
        </div>
        {#if profile.skills}
          <div class="row">
            <span class="text-gray text-capitalize">{profile.skills}</span>
          </div>
        {/if}
        {#if profile.bio}
          <div class="row last">
            <h2>{profile.bio}</h2>
          </div>
        {/if}
      </div>
      <div class="box-right">
        <ul class="list-bts">
          {#if isUser}
            <li>
              <!-- <i class="fal fa-cog" /> -->
              <a
                href="profiles/settings"
                disabled
                class="bt-default medium black">
                Settings
              </a>
            </li>
          {/if}
        </ul>
      </div>
    </div>
  </div>
</div>
