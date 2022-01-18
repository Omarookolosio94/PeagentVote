<script>
  export let loadText;
  export let loading;
  export let loadFunc;
</script>

<div
  class="button button-loadmore style2 js-bt-loading js-bt-loadmore"
  on:click={loadFunc}>
  {#if !loading}
    <span class="txt-default">{loadText ? loadText : 'Load More'}</span>
  {:else}
    <span class="txt-default">Loading...</span>
  {/if}
</div>
