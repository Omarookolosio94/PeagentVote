<script>
  import { loading } from "../../store";
</script>

<div class="loader" id="loader">
  {#if $loading === true}
    <div class="loader-head">
      <div class="first-indicator" />
      <div class="second-indicator" />
    </div>
  {/if}
</div>

<style type="text/css">
  .loader {
    background-color: #f4f7f6;
    width: 100%;
    height: 4px;
    position: fixed;
    opacity: 1;
    pointer-events: none;
    -webkit-transition: opacity cubic-bezier(0.4, 0, 0.2, 1) 436ms;
    -moz-transition: opacity cubic-bezier(0.4, 0, 0.2, 1) 436ms;
    transition: opacity cubic-bezier(0.4, 0, 0.2, 1) 436ms;
    z-index: 9999;
  }

  .loader-head {
    background-color: #bdc1c0;
    height: 4px;
    overflow: hidden;
    position: relative;
  }
  .loader .first-indicator,
  .loader .second-indicator {
    background-color: #325595;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    transform-origin: left center;
    -webkit-transform: scaleX(0);
    -moz-transform: scaleX(0);
    transform: scaleX(0);
  }
  .loader .first-indicator {
    -webkit-animation: first-indicator 2s linear infinite;
    -moz-animation: first-indicator 2s linear infinite;
    animation: first-indicator 2s linear infinite;
  }
  .loader .second-indicator {
    -webkit-animation: second-indicator 2s linear infinite;
    -moz-animation: second-indicator 2s linear infinite;
    animation: second-indicator 2s linear infinite;
  }

  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes first-indicator {
    0% {
      transform: translate(0) scaleX(0);
    }
    25% {
      transform: translate(0) scaleX(0.5);
    }
    50% {
      transform: translate(25%) scaleX(0.75);
    }
    75% {
      transform: translate(100%) scaleX(0);
    }
    100% {
      transform: translate(100%) scaleX(0);
    }
  }
  @keyframes second-indicator {
    0% {
      transform: translate(0) scaleX(0);
    }
    60% {
      transform: translate(0) scaleX(0);
    }
    80% {
      transform: translate(0) scaleX(0.6);
    }
    100% {
      transform: translate(100%) scaleX(0.1);
    }
  }
</style>
