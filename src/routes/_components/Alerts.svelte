<script>
  import { onDestroy } from "svelte";
  import { alertMsg } from "../../store";

  $: timeout = $alertMsg
    ? setTimeout(() => ($alertMsg = null), 3000)
    : undefined;

  onDestroy(() => clearTimeout(timeout));
</script>

{#if $alertMsg}
  <div class="alert-box">
    {#each $alertMsg.message as alert}
      <p class={`alert ${$alertMsg.type}`}>{alert.msg}</p>
    {/each}
  </div>
{/if}

<style>
  .alert-box {
    position: fixed;
    top: 0;
    z-index: 20000;
    left: 10%;
    right: 10%;
  }

  .alert {
    display: inline-block;
    height: 60px;
    width: 90%;
    padding: 0 35px;
    color: #fff;
    line-height: 63px;
    text-transform: capitalize;
    text-align: center;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
  }

  .success {
    background-color: #49c5b6;
  }

  .danger {
    background-color: #b85c5c;
  }
</style>
