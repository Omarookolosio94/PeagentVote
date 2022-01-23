<script>
  import { alertMsg, loading, user } from "../../../../store";
  import { stores } from "@sapper/app";
  import { beforeUpdate } from "svelte";
  import { url } from "../../../../utilis/utilis";
  const { session } = stores();

  let profileDetails;
  let error;
  let updatingProfile = false;

  const updateProfile = async () => {
    try {
      $loading = true;
      updatingProfile = true;
      error = null;
      const response = await fetch(`${url}/users/updateprofile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + $session.token,
        },
        body: JSON.stringify(profileDetails),
      });

      const res = await response.json();
      $loading = false;
      updatingProfile = false;

      if (res.status === 422) {
        error = res.data.data;
        console.log(error);
      } else if (res.status === 400) {
        alertMsg.set({ type: "danger", message: [{ msg: res.data.message }] });
      } else {
        $user = res.data;
        alertMsg.set({
          type: "success",
          message: [{ msg: res.message }],
        });
      }
    } catch (error) {
      $loading = false;
      updateProfile = false;
      console.log(error);
    }
  };

  async function fetchUser() {
    try {
      $loading = true;
      const res = await fetch(`${url}/users/user`, {
        headers: {
          Authorization: "Bearer " + $session.token,
        },
      });
      const resData = await res.json();
      let profile = { ...resData.data };

      profileDetails = {
        bio: profile && profile.bio ? profile.bio : "",
        userName: profile && profile.userName ? profile.userName : "",
        facebook:
          profile && profile.social && profile.social.facebook
            ? profile.social.facebook
            : "",
        twitter:
          profile && profile.social && profile.social.twitter
            ? profile.social.twitter
            : "",
        instagram:
          profile && profile.social && profile.social.instagram
            ? profile.social.instagram
            : "",
        linkedin:
          profile && profile.social && profile.social.linkedin
            ? profile.social.linkedin
            : "",
        youtube:
          profile && profile.social && profile.social.youtube
            ? profile.social.youtube
            : "",
        skills: profile && profile.skills ? profile.skills.join(",") : "",
        interests:
          profile && profile.interests ? profile.interests.join(",") : "",
      };

      $loading = false;
    } catch (err) {
      $loading = false;

      console.log(err);
    }
  }

  beforeUpdate(async () => {
    if ($session.token && !profileDetails) fetchUser();
  });
</script>

{#if profileDetails}
  <form on:submit|preventDefault={updateProfile}>
    <div class="box-form-fields">
      <ul>
        <li>
          <div class="row left">
            <label for="userName" class="asterisk-required"><strong>User Name</strong></label>
          </div>
          <div class="row right">
            <div class="form-group has-info">
              <input
                type="text"
                name="userName"
                bind:value={profileDetails.userName}
                class="text-input"
                required
                max="30" />
            </div>
          </div>
        </li>
        <li>
          <div class="row left">
            <label
              for="skills"
              class="asterisk-required"><strong>Skills</strong></label>
          </div>
          <div class="row right">
            <div class="form-group">
              <input
                type="text"
                name="skills"
                bind:value={profileDetails.skills}
                class="text-input" />
              <div class="msg">
                <ul>
                  <li>Use Comma Seperated values. E.G Web Design</li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="row left">
            <label
              for="interests"
              class="asterisk-required"><strong>Interest</strong></label>
          </div>
          <div class="row right">
            <div class="form-group">
              <input
                type="text"
                name="interests"
                bind:value={profileDetails.interests}
                class="text-input" />
              <div class="msg">
                <ul>
                  <li>
                    Use Comma Seperated values. E.G Web Design , Archery ,
                    Painting
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="box-form-fields">
      <ul>
        <li>
          <div class="row left">
            <label for="bio" class="asterisk-required"><strong>BIO Description</strong></label>
          </div>
          <div class="row right">
            <div class="form-group">
              <textarea
                name="bio"
                bind:value={profileDetails.bio}
                class="text-input" />
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="box-form-fields">
      <ul>
        <li>
          <div class="row left">
            <label for="links"><strong>Social Links</strong>
              <em>(optional)</em></label>
          </div>
          <div class="row right">
            <div class="box-text-input">
              <span class="size-medium">https://twitter.com/</span>
              <input
                type="text"
                name="twitter"
                class="text-input"
                bind:value={profileDetails.twitter} />
            </div>
            <div class="box-text-input">
              <span class="size-medium">https://www.facebook.com/</span>
              <input
                type="text"
                name="facebook"
                class="text-input"
                bind:value={profileDetails.facebook} />
            </div>
            <div class="box-text-input">
              <span class="size-medium">https://linkedin.com/</span>
              <input
                type="text"
                name="linkedin"
                class="text-input"
                bind:value={profileDetails.linkedin} />
            </div>
            <div class="box-text-input">
              <span class="size-medium">https://instagram.com/</span>
              <input
                type="text"
                name="instagram"
                class="text-input"
                bind:value={profileDetails.instagram} />
            </div>
            <div class="box-text-input">
              <span class="size-medium">https://youtube.com/</span>
              <input
                type="text"
                name="youtube"
                class="text-input"
                bind:value={profileDetails.youtube} />
            </div>
          </div>
        </li>
      </ul>
    </div>

    <p>
      <input
        type="submit"
        value={updatingProfile ? 'Profile Updating...' : 'Update Profile'}
        class="button large bold width-full"
        disabled={$loading || updatingProfile} />
    </p>
  </form>
{/if}
