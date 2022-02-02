<script>
  export let sponsor;
</script>

<li class="col-3">
  <div class="box-item box-style4">
    <p class="profile-link">{sponsor.name}</p>
    <div class="box-cover">
      <div class="box-margin" />
      <div class="avatar">
        <img
          src={sponsor?.flyers?.length > 0
            ? sponsor?.flyers[0]?.image140URL
            : `https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=140&h=140`}
          width="70"
          height="70"
          alt=""
          class="lazy"
        />
      </div>
    </div>
    <div class="box-info">
      <div class="content">
        <h3 class="row">
          <p>{sponsor?.name}</p>
        </h3>
        <div class="row">
          <strong>
            <p style="color:#df6c4f">{sponsor?.about}</p>
          </strong>
        </div>
        <div class="row" />
      </div>
    </div>
  </div>
</li>

<style>
  .box-margin {
    padding: 1rem 0;
  }
</style>
