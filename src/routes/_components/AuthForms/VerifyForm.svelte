<script>
  import { goto, stores } from "@sapper/app";
  import { alertMsg, loading } from "../../../store";
  import { closeLogin, url, emailRegex } from "../../../utilis/utilis";

  let submitting = false;
  let error;
  let user = {
    email: "",
  };

  const handleVerification = async () => {
    try {
      $loading = true;
      submitting = true;
      error = null;

      const response = await fetch(`${url}auth/resend`, {
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
        user = {
          email: "",
        };

        alertMsg.set({
          type: "success",
          message: [{ msg: "Verification email has been sent to your email" }],
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

<div class="tab-form js-tab-form active" id="tab-verify" style="display: none">
  <div class="form">
    <div class="box-section">
      <div class="header">
        <h3><strong>Not Yet Verified ?</strong></h3>
      </div>
      <p>
        Enter your Email address and we will send you a link to verify your
        Account.
      </p>

      <form
        name="verifyAccount"
        method="post"
        class="forgot_password_form"
        on:submit|preventDefault={handleVerification}
      >
        <div class="form-group has-info">
          <p>
            <input
              type="text"
              required="required"
              class="text-input"
              name="email"
              placeholder="Email"
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
          </p>

          <p>
            <input
              type="submit"
              name="submit"
              value={submitting ? " Please Wait..." : "Verify Account"}
              class="button bold"
            />
          </p>
          <p align="center">
            <strong
              class="link-2 cursor-pointer js-tab-login"
              onclick="toggleForms(event)"
            >
              Back
            </strong>
          </p>
        </div>
      </form>
    </div>
  </div>
</div>
