<script context="module">
  export async function preload({ params }, session) {
    const { userId } = params;
    //const { token } = session;
    let profile;
    //let user;

    loading.set(true);

    const fetchProfile = async (userId) => {
      try {
        const res = await this.fetch(`${url}contestants/user/${userId}`);
        const resData = await res.json();
        profile = await resData.data;
      } catch (err) {
        console.log(err);
      }
    };

    await fetchProfile(userId);
    loading.set(false);

    return { userId, profile };
  }
</script>

<script>
  import { loading, alertMsg } from "../../store";
  import { url } from "../../utilis/utilis";
  import ProfileHead from "../_components/contestant/ProfileHead.svelte";

  export let profile;
  //export let userId;

  const deleteImage = async (imageId) => {
    try {
      //if ($session.token === undefined || null || !article) return;

      if (!window.confirm(`This image would be Deleted Permenently`)) return;

      loading.set(true);

      loading.set(false);

      alertMsg.set({
        type: "success",
        message: [{ msg: "Article Deleted Successfully" }],
      });

      /*
      const res = await fetch(
        `${url}contestants/picture/${encodeURIComponent(imageId)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + //$token,
          },
        }
      );

      const resData = await res.json();
      loading.set(false);
      if (res.status === 401) {
        alertMsg.set({ type: "danger", message: [{ msg: resData.message }] });
      } else {
        dispatch("deleteArticle", article._id);
        alertMsg.set({
          type: "success",
          message: [{ msg: resData.message }],
        });
      }
*/
    } catch (err) {
      loading.set(false);
      console.log(err);
    }
  };
</script>

<svelte:head>
  <title>{profile?.userId?.firstName} {profile?.userId?.lastName}</title>
</svelte:head>

{#if profile}
  <ProfileHead {profile} />

  <div class="block">
    <div class="inner width-1">
      <div class="grid list-flex box-cols">
        <div class="col-4">
          <div class="box-info">
            <h2 class="heading-05 heading-underline style-left">Bio</h2>
            <p>
              <b>Start: </b>{profile?.bio?.stateOfOrigin
                ? profile?.bio?.stateOfOrigin
                : "Not Available"}
            </p>
            <p>
              <b>Age: </b>
              {profile?.bio?.age ? profile?.bio?.age : "Not Available"}
            </p>
            <p>
              <b>Discipline: </b>
              {profile?.bio?.discipline
                ? profile?.bio?.discipline
                : "Not Available"}
            </p>
            <p>
              <b>Status: </b>
              {profile?.isFinalist ? "Finalist" : "Applicant"}
            </p>
          </div>
        </div>
        {#if profile.profilePicture.length > 0}
          {#each profile?.profilePicture as picture}
            <div class="col-4 col-photo">
              <div>
                <img src={picture.imageURL} alt=" " />
              </div>
              <div class="box-bl" style="position: absolute;">
                <button
                  class="js-visit-item bt-default green-fill btn-danger"
                  on:click={deleteImage(picture.public_id)}
                >
                  Delete
                </button>
              </div>
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
  }

  @media screen and (max-width: 700px) {
    .box-bl {
      display: block !important;
    }
  }
</style>
