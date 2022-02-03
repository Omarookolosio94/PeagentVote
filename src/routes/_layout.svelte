<script context="module">
  export async function preload() {
    loading.set(true);

    const fetchAbout = async () => {
      try {
        const response = await this.fetch(`${url}admin/about`);

        const res = await response.json();

        if (res?.sucess) about.set(await resData.data);
      } catch (err) {
        console.log(err);
      }
    };

    await fetchAbout();

    loading.set(false);

    return;
  }
</script>

<script>
  import { loading, about } from "../store";
  import { url } from "../utilis/utilis";
  import { onMount } from "svelte";
  import Nav from "./_components/navigation/Nav.svelte";
  import Loader from "./_components/Loader.svelte";
  import Footer from "./_components/Footer.svelte";
  import Alerts from "./_components/Alerts.svelte";
  import AuthForms from "./_components/AuthForms/AuthForms.svelte";

  const fetchAbout = async () => {
    try {
      $loading = true;

      const response = await fetch(`${url}admin/about`);

      const res = await response.json();
      $loading = false;

      if (res?.success) {
        $about = await res.data;
      }
    } catch (err) {
      $loading = false;

      console.log(err);
    }
  };

  onMount(async () => {
    await fetchAbout();
  });
</script>

<Alerts />
<div class="wrapper">
  <Loader />
  <Nav />
  <section id="content">
    <div class="content-view">
      <main>
        <slot />
      </main>
    </div>
  </section>
  <Footer about={$about} />
</div>
<AuthForms />
