<script>
  import { alertMsg, loading } from "../../../store";
  import { onMount } from "svelte";
  import { url } from "../../../utilis/utilis";

  let user = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  let error = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  let submitting = false;

  const handleRegister = async () => {
    try {
      $loading = true;

      submitting = true;

      if (
        user?.firstName == null ||
        user?.firstName?.length < 1 ||
        user?.lastName == null ||
        user?.lastName.length < 1 ||
        user?.email == null ||
        user?.email?.length < 1 ||
        user?.password == null ||
        user?.password.length < 1 ||
        user?.confirmPassword == null ||
        user?.confirmPassword.length < 1
      ) {
        $loading = false;
        submitting = false;

        return alertMsg.set({
          type: "danger",
          message: [{ msg: "Please pass in all required information" }],
        });
      }

      if (user?.password != user?.confirmPassword) {
        $loading = false;

        submitting = false;

        error.password = "Password must match";

        return;
      }

      let newUser = {
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        password: user?.password,
      };

      const response = await fetch(`${url}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const res = await response.json();

      $loading = false;
      submitting = false;

      if (res.success) {
        alertMsg.set({
          type: "success",
          message: [{ msg: res.message }],
        });

        //goto("/contestant/" + $profile?.userId?._id);
      } else {
        //error = res?.data;

        alertMsg.set({
          type: "danger",
          message: [{ msg: res.message }],
        });
      }
    } catch (err) {
      $loading = false;
      submitting = false;

      alertMsg.set({
        type: "danger",
        message: [{ msg: "An error occured. Please try again." }],
      });
    }
  };

  onMount(async () => {
    user = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  });

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
            name="firstName"
            placeholder="Firstname"
            bind:value={user.firstName}
            on:focus={clearError}
          />
          {#if error}
            {#if error.firstName}
              <div class="msg error">
                <ul>
                  <li>{error.firstName}</li>
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
            name="lastName"
            placeholder="Username"
            bind:value={user.lastName}
            on:focus={clearError}
          />
          {#if error}
            {#if error.lastName}
              <div class="msg error">
                <ul>
                  <li>{error.lastName}</li>
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
          <input
            type="password"
            class="text-input"
            name="confirmPassword"
            placeholder="Confirm Password"
            on:focus={clearError}
            bind:value={user.confirmPassword}
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
