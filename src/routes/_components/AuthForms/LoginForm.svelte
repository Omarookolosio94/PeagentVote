<script>
  import { goto, stores } from "@sapper/app";
  import { alertMsg, loading } from "../../../store";
  import { closeLogin, url } from "../../../utilis/utilis";

  const { session } = stores();

  let user = {
    email: "",
    password: "",
  };

  let submitting = false;
  let error;

  const handleSubmit = async () => {
    try {
      $loading = true;
      submitting = true;
      error = null;

      const response = await fetch("../../api/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      });

      const res = await response.json();

      $loading = false;
      submitting = false;

      if (res.success) {
        $session.token = res?.data?.token;

        user = {
          email: "",
          password: "",
        };

        alertMsg.set({
          type: "success",
          message: [{ msg: "Login Successful" }],
        });

        goto("/");
        closeLogin();
      } else {
        if (res?.data) {
          error = res.data;
        } else {
          alertMsg.set({
            type: "danger",
            message: [{ msg: res.message }],
          });
        }
      }
    } catch (error) {
      alertMsg.set({
        type: "danger",
        message: [{ msg: "An error ocurred, please try again" }],
      });

      $loading = false;
      submitting = false;
    }
  };

  const clearError = (e) => {
    if (!error) return;

    error[e.target.name] = null;
  };
</script>

<div class="tab-form js-tab-form active" id="tab-login-form">
  <div class="form">
    <div class="box-section">
      <div class="header">
        <div class="box-left">
          <h3><strong>Sign in to continue</strong></h3>
        </div>
        <div class="box-right">
          <h3>
            Want to be a contestant?
            <strong
              class="text-blue cursor-pointer js-tab
                js-register"
              onclick="toggleForms(event)"
            >
              Register now
            </strong>
          </h3>
        </div>
      </div>

      <form on:submit|preventDefault={handleSubmit}>
        <p />
        <div class="form-group">
          <input
            class="text-input"
            name="email"
            placeholder="Email"
            type="text"
            bind:value={user.email}
            on:focus={clearError}
          />
          {#if error}
            {#if error.email}
              <div class="msg error">
                <ul>
                  <li>{error.email}</li>
                </ul>
              </div>
            {/if}
          {/if}
        </div>

        <p />
        <p />
        <div class="form-group">
          <input
            class="text-input"
            placeholder="Password"
            type="password"
            name="password"
            bind:value={user.password}
            onfocus={clearError}
          />
          {#if error}
            {#if error.password}
              <div class="msg error">
                <ul>
                  <li>{error.password}</li>
                </ul>
              </div>
            {/if}
          {/if}
        </div>
        <p />
        <p />
        <p>
          <input
            class="button capitalize"
            type="submit"
            value={submitting ? " Please Wait..." : "Login"}
          />
        </p>

        <p align="center">
          <!--
            <strong onclick="toggleForms(event)">
              <a class="link-2 js-forgot-password" href=" ">
                Forgot your password
              </a>
            </strong>
            <br />
          -->
          <strong onclick="toggleForms(event)">
            <a class="link-2 js-verify-account" href=" "> Verify Account </a>
          </strong>
        </p>
      </form>
    </div>
  </div>
</div>
