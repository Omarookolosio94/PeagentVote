<script>
  import { goto, stores } from "@sapper/app";
  import { onDestroy } from "svelte";
  import { alertMsg, loading } from "../../../store";
  import { closeLogin } from "../../../utilis/utilis";

  const { session } = stores();
  let user = {
    userName: "",
    email: "",
    password: "",
  };

  let error;
  let submitting = false;

  const handleRegister = async () => {
    try {
      $loading = true;
      submitting = true;
      error = null;
      const response = await fetch("/auth/register", {
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

      if (res.status === 422) {
        error = res.data.data;
      } else if (res.status === 400) {
        alertMsg.set({ type: "danger", message: [{ msg: res.data.message }] });
      } else {
        alertMsg.set({
          type: "success",
          message: [{ msg: res.message }],
        });
        goto("/");
        closeLogin();
        user = {
          email: "",
          password: "",
          userName: "",
        };
      }
    } catch (error) {
      $loading = false;
      submitting = false;
      //console.log(error);
    }
  };

  const clearError = (e) => {
    if (!error) return;

    error[e.target.name] = null;
  };
</script>

<div
  class="tab-form js-tab-form active"
  id="tab-register-form"
  style="display: none"
>
  <div class="form">
    <div class="box-section">
      <div class="header">
        <div class="box-right">
          <h3>
            Are you a contestant?
            <strong class="text-green cursor-pointer">
              <a href=" " class="js-tab-login" onclick="toggleForms(event)">
                Login now
              </a>
            </strong>
          </h3>
        </div>
      </div>
    </div>

    <div class="box-section">
      <form class="register_form" on:submit|preventDefault={handleRegister}>
        <p />
        <div class="form-group">
          <input
            type="text"
            class="text-input"
            name="userName"
            placeholder="Username"
            bind:value={user.userName}
            on:focus={clearError}
          />
          {#if error}
            {#if error.userName}
              <div class="msg error">
                <ul>
                  <li>{error.userName}</li>
                </ul>
              </div>
            {/if}
          {/if}
        </div>
        <p />
        <p />
        <div class="form-group">
          <input
            type="text"
            class="text-input"
            name="email"
            placeholder="E-mail"
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
            type="password"
            class="text-input"
            name="password"
            placeholder="Password"
            on:focus={clearError}
            bind:value={user.password}
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
            value={submitting ? " Please Wait..." : "Create your Account"}
          />
        </p>
      </form>
    </div>
  </div>
</div>
