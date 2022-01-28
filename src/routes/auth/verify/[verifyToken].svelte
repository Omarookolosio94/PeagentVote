<script context="module">
  export async function preload({ params }, session) {
    const { verifyToken } = params;
    let verifiedToken;

    loading.set(true);

    const verifyAccount = async (token) => {
      try {
        const response = await this.fetch(`${url}auth/verify/${token}`);

        const res = await response.json();

        verifiedToken = await res;
      } catch (err) {
        console.log(err);
      }
    };

    await verifyAccount(verifyToken);

    loading.set(false);

    return { verifiedToken };
  }
</script>

<script>
  import { loading } from "../../../store";
  import { url } from "../../../utilis/utilis";
  import { stores, goto } from "@sapper/app";
  const { session } = stores();

  export let verifiedToken;

  /*
  if (verifiedToken != null) {
    $session.token = verifiedToken;
  }

  goto("/");
  */
</script>

<svelte:head>
  <title>Verify Account</title>
</svelte:head>

{#if verifiedToken}
  <div class="block">
    <div class="inner width-1">
      <div class="page-headings style2">
        <hr />
        <h1 class="heading-x-large">
          <blockquote>{verifiedToken?.message}</blockquote>
        </h1>
        <p>
          {verifiedToken?.success ? "Proceed To Login" : "Please try again"}
        </p>
      </div>
    </div>
  </div>

  <div class="block p-0">
    <div class="inner full-width">
      <img src="https://source.unsplash.com/1900x700/daily?profile" alt=" " />
    </div>
  </div>
{/if}
