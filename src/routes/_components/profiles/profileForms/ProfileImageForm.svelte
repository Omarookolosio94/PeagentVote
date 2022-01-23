<script>
  import { alertMsg, loading, user } from "../../../../store";
  import { stores } from "@sapper/app";
  import { beforeUpdate, onMount } from "svelte";
  import { checkFileSize, checkFileType, url } from "../../../../utilis/utilis";
  const { session } = stores();

  let error;
  let files;
  let profile;
  let imgSRC;
  let updatingProfile = false;

  const setImgURL = async () => {
    if (!files) return;

    error = checkFileType(files[0].type);

    if (error.success === false) return;

    error = checkFileSize(files[0].size);

    if (error.success === false) return;

    imgSRC = URL.createObjectURL(files[0]);
  };

  const uploadImage = async () => {
    try {
      if (error && error.success === false) return;
      const formData = new FormData();
      formData.append("image", files[0]);

      $loading = true;
      updatingProfile = true;
      // error = null;
      const response = await fetch(`${url}/users/uploadprofileimage`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + $session.token,
        },
        body: formData,
      });

      const res = await response.json();
      $loading = false;
      updatingProfile = false;

      if (response.status === 415) {
        alertMsg.set({ type: "danger", message: [{ msg: res.message }] });
      } else {
        $user = res.data;
        alertMsg.set({
          type: "success",
          message: [{ msg: res.message }],
        });
      }
    } catch (error) {
      $loading = false;
      updatingProfile = false;
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
      profile = { ...resData.data };

      $loading = false;
    } catch (err) {
      $loading = false;

      console.log(err);
    }
  }

  // const clearError = () => {
  //   if (!error) return;

  //   error = null;
  // };

  beforeUpdate(async () => {
    if ($session.token && !profile) fetchUser();
  });
</script>

<style>
  .successText {
    color: #49c5b6;
  }

  .dangerText {
    color: #b85c5c;
  }

  .danger {
    background-color: #b85c5c;
  }
</style>

<form on:submit|preventDefault={uploadImage}>
  <div class="box-form-fields">
    <ul>
      <li>
        <div class="row left">
          <label for="user_settings_photo"><strong>Picture</strong></label>
        </div>
        <div class="form-group row right is-image-avatar">
          <div class="box-input-file style2 box-add-image">
            <div class="photo">
              <img
                class="hidden"
                src={imgSRC ? imgSRC : 'https://assets.awwwards.com/assets/images/pages/user/avatar.svg'}
                width="100"
                height="100"
                alt="" />

              <input
                type="file"
                id="user_settings_photo"
                name="user_settings"
                class="input-file inputfile"
                data-maxsize="400"
                bind:files
                on:change={setImgURL} />

              <label for="user_settings_photo"> <strong>Upload</strong> </label>
            </div>

            <div class="requirements">
              <ul>
                <li class="js-filename">
                  {#if error}
                    <span class={error.success ? 'successText' : 'dangerText'}>
                      {error.message}
                    </span>
                  {:else}
                    <span> Recommended size: 400x400px. <br />3MB max. </span>
                  {/if}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>

  <p>
    <input
      type="submit"
      value={updatingProfile ? 'Image Uploading...' : 'Upload Image'}
      class={error && error.success === false ? 'button large bold width-full danger ' : 'button large bold width-full'}
      disabled={updatingProfile || !error || (error && error.success === false)} />
  </p>
</form>
