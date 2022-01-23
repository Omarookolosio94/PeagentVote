<script>
  import Nav from "./_components/navigation/Nav.svelte";
  import Loader from "./_components/Loader.svelte";
  import Footer from "./_components/Footer.svelte";
  import AuthForms from "./_components/AuthForms/AuthForms.svelte";
  import Alerts from "./_components/Alerts.svelte";
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
  <Footer />
</div>
<AuthForms />
