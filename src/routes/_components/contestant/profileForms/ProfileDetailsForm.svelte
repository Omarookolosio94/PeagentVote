<script>
  import { alertMsg, loading, profile } from "../../../../store";
  import { goto, stores } from "@sapper/app";
  import { beforeUpdate } from "svelte";
  import { url } from "../../../../utilis/utilis";
  const { session } = stores();

  let profileDetails;
  let error;
  let updatingProfile = false;

  if ($profile) {
    profileDetails = {
      username: $profile?.bio?.username,
      age: $profile?.bio?.age,
      stateOfOrigin: $profile?.bio?.stateOfOrigin,
      discipline: $profile?.bio?.discipline,
      interests: $profile?.bio?.interests
        ? $profile?.bio?.interests.join(",")
        : "",
      twitter: $profile?.social?.twitter,
      facebook: $profile?.social?.facebook,
      instagram: $profile?.social?.instagram,
      youtube: $profile?.social?.youtube,
      whatsapp: $profile?.social?.whatsapp,
    };
  }
  const updateProfile = async () => {
    try {
      $loading = true;
      updatingProfile = true;
      error = null;
      const response = await fetch(`${url}contestants`, {
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

      if (res.success) {
        $profile = res.data;

        alertMsg.set({
          type: "success",
          message: [{ msg: res.message }],
        });

        goto("/contestant/" + $profile?.userId?._id);
      } else {
        alertMsg.set({
          type: "danger",
          message: [{ msg: res.message }],
        });
      }
    } catch (error) {
      $loading = false;
      updatingProfile = false;
      console.log(error);
    }
  };

  async function fetchProfile() {
    try {
      $loading = true;

      const res = await fetch(`${url}/contestants/user`, {
        headers: {
          Authorization: "Bearer " + $session.token,
        },
      });

      const resData = await res.json();

      let profile = { ...resData?.data };

      profileDetails = {
        username: profile?.bio?.username,
        age: profile?.bio?.age,
        stateOfOrigin: profile?.bio?.stateOfOrigin,
        discipline: profile?.bio?.discipline,
        interests: profile?.bio?.interests
          ? profile?.bio?.interests.join(",")
          : "",
        twitter: profile?.social?.twitter,
        facebook: profile?.social?.facebook,
        instagram: profile?.social?.instagram,
        youtube: profile?.social?.youtube,
        whatsapp: profile?.social?.whatsapp,
      };

      $loading = false;
    } catch (err) {
      $loading = false;

      console.log(err);
    }
  }

  beforeUpdate(async () => {
    if ($session.token && !profileDetails) fetchProfile();
  });
</script>

{#if profileDetails}
  <form on:submit|preventDefault={updateProfile}>
    <div class="box-form-fields">
      <ul>
        <li>
          <div class="row left">
            <label for="username" class="asterisk-required"
              ><strong>Username</strong></label
            >
          </div>
          <div class="row right">
            <div class="form-group has-info">
              <input
                type="text"
                name="username"
                bind:value={profileDetails.username}
                class="text-input"
                required
                max="30"
              />
              <div class="msg">
                <ul>
                  <li>Would be used for voting. Keep it short and simple</li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="row left">
            <label for="age" class="asterisk-required"
              ><strong>Age</strong></label
            >
          </div>
          <div class="row right">
            <div class="form-group">
              <input
                type="number"
                name="age"
                bind:value={profileDetails.age}
                class="text-input"
              />
            </div>
          </div>
        </li>
        <li>
          <div class="row left">
            <label for="stateOfOrigin" class="asterisk-required"
              ><strong>State Of Origin</strong></label
            >
          </div>
          <div class="row right">
            <div class="form-group">
              <input
                type="text"
                name="stateOfOrigin"
                bind:value={profileDetails.stateOfOrigin}
                class="text-input"
              />
            </div>
          </div>
        </li>
        <li>
          <div class="row left">
            <label for="discipline" class="asterisk-required"
              ><strong>Discipline</strong></label
            >
          </div>
          <div class="row right">
            <div class="form-group">
              <input
                type="text"
                name="discipline"
                bind:value={profileDetails.discipline}
                class="text-input"
              />
            </div>
          </div>
        </li>
        <li>
          <div class="row left">
            <label for="interests" class="asterisk-required"
              ><strong>Interests</strong></label
            >
          </div>
          <div class="row right">
            <div class="form-group">
              <input
                type="text"
                name="interests"
                bind:value={profileDetails.interests}
                class="text-input"
              />
              <div class="msg">
                <ul>
                  <li>
                    Use Comma Seperated values. E.G Singing , Archery , Painting
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
            <label for="links"
              ><strong>Social Links</strong>
              <em>(optional)</em></label
            >
          </div>
          <div class="row right">
            <div class="box-text-input">
              <span class="size-medium">Twitter.com/</span>
              <input
                type="text"
                name="twitter"
                class="text-input"
                bind:value={profileDetails.twitter}
              />
            </div>
            <div class="box-text-input">
              <span class="size-medium">Facebook</span>
              <input
                type="text"
                name="facebook"
                class="text-input"
                bind:value={profileDetails.facebook}
              />
            </div>
            <div class="box-text-input">
              <span class="size-medium">Instagram</span>
              <input
                type="text"
                name="instagram"
                class="text-input"
                bind:value={profileDetails.instagram}
              />
            </div>
            <div class="box-text-input">
              <span class="size-medium">Youtube</span>
              <input
                type="text"
                name="youtube"
                class="text-input"
                bind:value={profileDetails.youtube}
              />
            </div>
            <div class="box-text-input">
              <span class="size-medium">Whatsapp</span>
              <input
                type="text"
                name="youtube"
                class="text-input"
                bind:value={profileDetails.whatsapp}
              />
            </div>
          </div>
        </li>
      </ul>
    </div>

    <p>
      <input
        type="submit"
        value={updatingProfile ? "Profile Updating..." : "Update Profile"}
        class="button large bold width-full"
        disabled={$loading || updatingProfile}
      />
    </p>
  </form>
{/if}
