<script>
  import Sidenav from "./Sidenav.svelte";
  import Header from "./Header.svelte";
  import { goto, stores } from "@sapper/app";
  import { alertMsg, profile, loading, about } from "../../../store";
  import { url } from "../../../utilis/utilis";
  import { beforeUpdate, onMount } from "svelte";

  const { session } = stores();

  async function logout() {
    try {
      $session.token = null;
      profile.set(null);

      alertMsg.set({
        type: "success",
        message: [{ msg: "See You Later" }],
      });

      goto("/");
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchProfile(req) {
    try {
      $loading = true;

      const res = await fetch(`${url}contestants/user`, {
        headers: {
          Authorization: "Bearer " + $session.token,
        },
      });
      const resData = await res.json();
      $profile = { ...resData.data };
      $session.id = resData?.data?.userId?._id;
      $loading = false;
    } catch (err) {
      $loading = false;
      console.log(err);
    }
  }

  async function fetchAbout() {
    try {
      $loading = true;
      const res = await fetch(`${url}admin/about`);
      const resData = await res.json();
      $about = { ...resData.data };
      $loading = false;
    } catch (err) {
      $loading = false;
      console.log(err);
    }
  }

  onMount(async () => {
    fetchAbout();
  });

  beforeUpdate(async () => {
    if ($session.token && !$profile) fetchProfile();
  });
</script>

<Sidenav {logout} profile={$profile} about={$about} />
<Header {logout} profile={$profile} about={$about} />
