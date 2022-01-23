<script>
  import { onMount } from "svelte";
  import { url } from "../../../utilis/utilis";

  export let collection;
  let count;

  onMount(async () => {
    if (collection) {
      try {
        const res = await fetch(
          `${url}/publication/publishedarticlebycategory/${collection}`
        );
        const resData = await res.json();
        count = resData.data.length;
      } catch (err) {
        console.log(err);
      }
    }
  });
</script>

<li class="collection col-3">
  <div class="box-item">
    <figure class="rollover darken">
      <!--svelte-ignore a11y-missing-content -->
      <a href={`/publications/${collection}`} class="item-link" />
      <div class="box-photo">
        <img
          width="417"
          height="298"
          src={`https://source.unsplash.com/313x224/weekly?${collection}`}
          alt="
          "
          class="lazy lazy-loaded" />
      </div>
      <div class="hover-item has-hover center">
        <h3 class="text-capitalize">{collection}</h3>
        <div>{count} {count === 1 ? 'Publication' : 'Publications'}</div>
      </div>
    </figure>
    <div class="box-info">
      <div class="content">
        <div class="row">
          <h3>
            <a href={`/publications/${collection}`} class="text-capitalize">
              {collection}
            </a>
          </h3>
        </div>
        <div class="row row-auto">
          Compiled by
          <strong> <span>Ariere</span> </strong>
        </div>
      </div>
      <div class="footer">
        <div class="box-left">
          <div class="box-users-likes">
            <div class="container-bt-circle" />
          </div>
        </div>
        <div class="box-right">
          <a href={`/publications/${collection}`} class="bt-default small">
            <span>View</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</li>
