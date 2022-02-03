<script>
  import { stores } from "@sapper/app";
  import { openLogin } from "../../../utilis/utilis";
  const { session } = stores();

  export let logout;
  export let profile;
  export let about;

  let openMenu = false;

  const toggleMenu = () => (openMenu = !openMenu);
</script>

<div class="side-nav" id="sideNav">
  <div class="top">
    <div class="header">
      <div class="close-btn" onclick="closeSideNav()">
        <span>Close</span>
        <i class="fal fa-times" />
      </div>
    </div>

    <ul class="navlinks">
      {#if !$session.token}
        <li on:click={openLogin}>
          <span class="nav-item">Register/Log In</span>
        </li>
      {:else}
        <li class="dropdown has-mobile" on:click={toggleMenu}>
          {#if profile}
            <span class="nav-item">{profile?.userId?.firstName}</span>
            <ul id="open-profile" class={openMenu === true ? "open" : null}>
              <li onclick="closeSideNav()">
                <a href={`/contestant/${profile?.userId?._id}`} class="nav-link"
                  >Profile</a
                >
              </li>
              <li onclick="closeSideNav()">
                <a href={`/contestant/edit`} class="nav-link">Settings </a>
              </li>

              <li class="logout" on:click={logout} onclick="closeSideNav()">
                <a href=" " class="nav-link">
                  Logout
                  <div class="icon"><i class="fal fa-sign-out-alt" /></div>
                </a>
              </li>
            </ul>
          {/if}
        </li>
      {/if}

      <li onclick="closeSideNav()"><a href="/" class="nav-link">Home</a></li>

      {#if about}
        {#if about?.isInProgress == true}
          <li onclick="closeSideNav()">
            <a href="/contestant" class="nav-link">Contestants</a>
          </li>

          <li onclick="closeSideNav()">
            <a href="/vote/board" class="nav-link">Vote Board</a>
          </li>
        {/if}
      {/if}
      <li onclick="closeSideNav()">
        <a href="/about" class="nav-link">About Us</a>
      </li>
    </ul>
  </div>
</div>

<style>
  .open {
    display: block !important;
  }
</style>
