<script>
  import Sidenav from "./Sidenav.svelte";
  import Header from "./Header.svelte";
  import { stores } from "@sapper/app";
  import { alertMsg, user, loading } from "../../../store";
  import { url } from "../../../../utilis/utilis";
  import { beforeUpdate } from "svelte";

  const { session } = stores();

  async function logout() {
    try {
      await fetch("/auth/logout", {
        method: "POST",
      });

      $session.token = null;
      $user = null;

      alertMsg.set({
        type: "success",
        message: [{ msg: "See You Later" }],
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchUser() {
    try {
      $loading = true;
      const res = await fetch(`${url}/users/user`, {
        headers: {
          Authorization: "Bearer " + $session.token,
        },
      });
      const resData = await res.json();
      $user = { ...resData.data };
      $loading = false;
    } catch (err) {
      $loading = false;

      console.log(err);
    }
  }

  beforeUpdate(async () => {
    if ($session.token && !$user) fetchUser();
  });
</script>

<Sidenav {logout} user={$user} />
<Header {logout} user={$user} />
