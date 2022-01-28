<script context="module">
  export async function preload(params, { token }) {
    if (!token) {
      this.redirect(302, `/`);
    }
  }
</script>

<script>
  import ProfileDetailsForm from "../../_components/contestant/profileForms/ProfileDetailsForm.svelte";
  import ProfileImageForm from "../../_components/contestant/profileForms/ProfileImageForm.svelte";
  import Tabs from "../../_components/Tabs.svelte";
  import { stores } from "@sapper/app";
  import BackBtn from "../../../components/BackBtn.svelte";
  import { loading, profile, alertMsg } from "../../../store";
  import { url } from "../../../utilis/utilis";
  const { session } = stores();

  let tabItems = [
    { label: "Update Profile", value: 1 },
    { label: "Upload Image", value: 2 },
    // { label: 'Review Profile', value: 3 }
  ];
  let currentTab;

  const deleteProfile = async () => {
    /*
    try {
      if ($session.token === undefined || null) return;
      if (
        !window.confirm(
          `Your profile and all your publications would be deleted permenently.This process cannot be reversed. Do you still want to continue? `
        )
      )
        return;

      loading.set(true);
      const res = await fetch(`${url}/users/deleteaccount`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + $session.token,
        },
      });

      const resData = await res.json();

      console.log(resData);
      if (res.status === 401) {
        alertMsg.set({ type: "danger", message: [{ msg: resData.message }] });
      } else {
        await fetch("/auth/logout", {
          method: "POST",
        });

        loading.set(false);

        $session.token = null;
        $user = null;

        alertMsg.set({
          type: "success",
          message: [{ msg: resData.message }],
        });
      }
    } catch (err) {
      loading.set(false);
      console.log(err);
    }
    */
    console.log("Deleting profile");
  };
</script>

<svelte:head>
  <title>Contestant - Edit Profile</title>
</svelte:head>

<div class="block js-purchase-type" data-type="submission">
  <div class="inner width-2">
    <div class="head-box-form">
      <h1 class="heading-large horizontal-center">Profile Update</h1>
    </div>

    <Tabs bind:activeTabValue={currentTab} items={tabItems} />

    {#if 1 === currentTab}
      <ProfileDetailsForm />
    {/if}

    {#if 2 === currentTab}
      <ProfileImageForm />
    {/if}

    <BackBtn />

    <p class="horizontal-center">
      <strong
        ><span class="link-2 danger" on:click={deleteProfile}
          >Delete Account</span
        ></strong
      >
    </p>

    <!-- {#if 3 === currentTab}No Review{/if} -->
  </div>
</div>
