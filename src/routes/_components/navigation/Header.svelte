<script>
  import { openLogin } from "../../../utilis/utilis";
  // import Searchbox from "../Searchbox.svelte";
  import { stores } from "@sapper/app";
  const { session } = stores();

  export let logout;
  export let user;

  user && console.log(user.profileImage);
</script>

<header id="header">
  <!-- Header Top with Social Links -->
  <div class="header-top">
    <div class="box-left">
      <div class="item"><span class="link-1"> English </span></div>
    </div>
    <div class="box-center">
      <h1 class="slogan">The Road To Becoming A Winner Begins Now</h1>
    </div>
    <div class="box-right">
      <ul class="list-social item">
        <li>
          <a target="_blank" rel="noopener" href="/">
            <i class="fab fa-instagram" />
          </a>
        </li>
        <li>
          <a target="_blank" rel="noopener" href="/">
            <i class="fab fa-twitter" />
          </a>
        </li>
        <li>
          <a target="_blank" rel="noopener" href="/">
            <i class="fab fa-facebook-f" />
          </a>
        </li>
      </ul>
    </div>
  </div>

  <!--Main Header  -->
  <div class="header-main">
    <div class="box-left">
      <div
        class="item bt-menu js-nav-main"
        data-menu-id="menu-main"
        onclick="openSideNav()"
        id="btMenu"
      >
        <div class="ico-menu">
          <div class="bar" />
          <div class="bar" />
          <div class="bar" />
        </div>
        <span class="has-tablet">Menu</span>
      </div>
    </div>
    <div class="box-right">
      <!-- Login Action -->
      {#if !$session.token}
        <div class="item login">
          <span>Are you a contestant?</span>
          <strong on:click={openLogin}>
            <a class="text-black open_login" href="/" role="button">
              Register / log in
            </a>
          </strong>
        </div>
      {:else}
        <div class="item logged has-tablet">
          <a
            href={`/profiles/${user && user._id}`}
            class="text-black text-capitalize profile-name"
            >{user && user.userName}</a
          >
          <div class="bt-dropdown bt-menu-user">
            <figure class="avatar">
              <img
                src={user && user.profileImage
                  ? user.profileImage.image70URL
                  : "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=70&h=70"}
                alt={user && user.userName}
                width="32"
                height="32"
              />
            </figure>
            <div class="ico-menu">
              <div class="bar" />
              <div class="bar" />
              <div class="bar" />
            </div>
            <ul>
              <li><a href={`/profiles/${user && user._id}`}>Profile</a></li>

              <li><a href={`/profiles/settings`}>Settings </a></li>

              <li class="logout" on:click={logout}>
                <a href=" ">
                  Logout
                  <div class="icon"><i class="fal fa-sign-out" /></div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      {/if}

      {#if $session.token}
        <div class="item has-tablet" id="bt-submit">
          <a href="/article/publisharticle" class="button button-large">
            <span>Edit Profile</span>
          </a>
        </div>
      {/if}
    </div>
    <div class="logo-header">
      <a href="/">
        <span>
          <img
            src="https://res.cloudinary.com/matrixweb/image/upload/v1602212213/arierepublicationlogo_nprdql.svg"
            alt=""
          />
        </span>
      </a>
    </div>
  </div>
  <!-- End of Main header -->

  <!-- Search Component -->
  <!-- <Searchbox /> -->

  <!-- End of Search Component -->
</header>
