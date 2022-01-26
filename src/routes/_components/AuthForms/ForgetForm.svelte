<div class="tab-form js-tab-form active" id="tab-forgot" style="display: none">
  <div class="form">
    <div class="box-section">
      <div class="header">
        <h3><strong>Forgot your password</strong></h3>
      </div>

      <p>
        Enter your email address and we will send you a link to reset your
        password.
      </p>

      <form name="forgot_password" class="forgot_password_form">
        <div class="form-group has-info">
          <p>
            <input
              type="text"
              required="required"
              class="text-input"
              placeholder="Email" />
            <span class="msg" style="display: inline" />
          </p>

          <p>
            <input
              type="submit"
              name="submit"
              value="Forgot Password"
              class="button bold" />
          </p>

          <p align="center">
            <strong
              class="link-2 cursor-pointer js-tab-login"
              onclick="toggleForms(event)">
              Back
            </strong>
          </p>
        </div>
      </form>
    </div>
  </div>
</div>
