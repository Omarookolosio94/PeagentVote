<script>
  import Sidenav from "./Sidenav.svelte";
  import Header from "./Header.svelte";
  import { stores } from "@sapper/app";
  import { alertMsg, profile, loading, about } from "../../../store";
  import { url } from "../../../utilis/utilis";
  import { beforeUpdate } from "svelte";
  import { onMount } from "svelte";

  const { session } = stores();

  async function logout(req, res) {
    try {
      delete req?.session?.token;
      res?.end();

      $session.token = null;
      $profile = null;

      alertMsg.set({
        type: "success",
        message: [{ msg: "See You Later" }],
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchProfile() {
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

<Sidenav {logout} profile={$profile} />
<Header {logout} profile={$profile} about={$about} />
