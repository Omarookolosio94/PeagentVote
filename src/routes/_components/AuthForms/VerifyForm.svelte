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

      <form name="verifyAccount" method="post" class="forgot_password_form">
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
              value="VERIFY ACCOUNT"
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
