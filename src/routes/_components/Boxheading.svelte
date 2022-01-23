<script>
  export let headStyle;
  export let headTitle;
  export let headSpan;
  export let fullWidth = null;
</script>

<style>
  .col-full {
    width: 100%;
  }
</style>

<div class={`box-heading ${headStyle}`}>
  <div class="grid one-row">
    <div class={fullWidth ? 'col-full' : `col-3`}>
      <div class="box-left">
        <h2 class="title"><span class="text-black"> {headTitle} </span></h2>
        {#if headSpan}<span>{headSpan}</span>{/if}
      </div>
    </div>
  </div>
</div>
