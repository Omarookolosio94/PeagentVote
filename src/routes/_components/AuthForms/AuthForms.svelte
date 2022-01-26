<script>
  import { closeLogin } from "../../../utilis/utilis";
  import ForgetForm from "./ForgetForm.svelte";
  import LoginForm from "./LoginForm.svelte";
  import RegisterForm from "./RegisterForm.svelte";
  import VerifyForm from "./VerifyForm.svelte";
</script>

<div class="box-lightbox" style="z-index: 100">
  <div class="bt-close js-lightbox-close" on:click={closeLogin} />
  <div class="box-content-login">
    <div class="box-login">
      <LoginForm />
      <div class="box-msg hidden">
        <div class="box-loading style3 open">
          <div class="spinner" />
        </div>
      </div>
      <RegisterForm />
      <ForgetForm />
      <VerifyForm />
    </div>
  </div>
</div>
