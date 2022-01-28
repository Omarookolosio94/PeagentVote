<script context="module">
  export async function preload({ params }, session) {
    const { userId } = params;
    const { token, id } = session;
    let userProfile;
    let isUser;

    loading.set(true);

    const fetchProfile = async (userId) => {
      try {
        const res = await this.fetch(`${url}contestants/user/${userId}`);
        const resData = await res.json();
        userProfile = await resData.data;
      } catch (err) {
        console.log(err);
      }
    };

    await fetchProfile(userId);
    loading.set(false);

    if (id?.toString() == userId.toString()) {
      isUser = true;
    } else {
      isUser = false;
    }

    return { userProfile, isUser };
  }
</script>

<script>
  import { loading, alertMsg } from "../../store";
  import { url } from "../../utilis/utilis";
  import { stores } from "@sapper/app";
  import ProfileHead from "../_components/contestant/ProfileHead.svelte";
  const { session } = stores();

  export let userProfile;
  export let isUser = false;

  const deleteImage = async (imageId) => {
    try {
      if ($session.token === undefined || null || !imageId) return;

      if (!window.confirm(`This image would be Deleted Permenently`)) return;

      loading.set(true);

      const response = await fetch(
        `${url}contestants/picture/${encodeURIComponent(imageId)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + $session?.token,
          },
        }
      );

      loading.set(false);

      const res = await response.json();

      if (res.success) {
        userProfile.profilePicture = userProfile?.profilePicture.filter(
          (pic) => pic.public_id !== imageId
        );

        alertMsg.set({
          type: "success",
          message: [{ msg: res.message }],
        });
      } else {
        alertMsg.set({
          type: "danger",
          message: [{ msg: res.message }],
        });
      }
    } catch (err) {
      loading.set(false);
      console.log(err);
    }
  };
</script>

<svelte:head>
  <title>{userProfile?.userId?.firstName} {userProfile?.userId?.lastName}</title
  >
</svelte:head>

{#if userProfile}
  <ProfileHead profile={userProfile} {isUser} />

  <div class="block">
    <div class="inner width-1">
      <div class="grid list-flex box-cols">
        <div class="col-4">
          <div class="box-info">
            <h2 class="heading-05 heading-underline style-left">Bio</h2>
            <p>
              <b>State: </b>{userProfile?.bio?.stateOfOrigin
                ? userProfile?.bio?.stateOfOrigin
                : "Not Available"}
            </p>
            <p>
              <b>Age: </b>
              {userProfile?.bio?.age ? userProfile?.bio?.age : "Not Available"}
            </p>
            <p>
              <b>Discipline: </b>
              {userProfile?.bio?.discipline
                ? userProfile?.bio?.discipline
                : "Not Available"}
            </p>
            <p>
              <b>Status: </b>
              {userProfile?.isFinalist ? "Finalist" : "Applicant"}
            </p>
          </div>
        </div>
        {#if userProfile?.profilePicture?.length > 0}
          {#each userProfile?.profilePicture as picture}
            <div class="col-4 col-photo">
              <div>
                <img src={picture?.imageURL} alt=" " />
              </div>
              {#if isUser}
                <div class="box-bl" style="position: absolute;">
                  <button
                    class="js-visit-item bt-default green-fill btn-danger"
                    on:click={deleteImage(picture?.public_id)}
                  >
                    Delete
                  </button>
                </div>
              {/if}
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .btn-danger {
    background-color: #d14836;
    border-color: #d14836;
  }

  .btn-danger:hover {
    color: #111;
    background-color: #e6eaea;
  }

  @media screen and (max-width: 700px) {
    .box-bl {
      display: block !important;
    }
  }
</style>
