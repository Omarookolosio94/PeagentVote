<script>
  import { stores } from "@sapper/app";
  import { beforeUpdate, onMount } from "svelte";
  import { loading, alertMsg } from "../../../../../store";
  import {
    checkFileSize,
    checkFileType,
    url,
  } from "../../../../../utilis/utilis";
  const { session } = stores();

  export let article;
  let error;
  let uploaderror;
  let files;
  let category;
  let imgSRC;
  let editor;
  let quill;
  let updating = false;

  export let toolbarOptions = [
    [{ header: 1 }, { header: 2 }, "blockquote", "link"],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
  ];

  onMount(async () => {
    const { default: Quill } = await import("quill");

    quill = new Quill(editor, {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "snow",
    });

    quill.root.innerHTML = article && article.text;
  });

  const setImgURL = async () => {
    if (!files) return;

    uploaderror = checkFileType(files[0].type);

    if (uploaderror.success === false) return;

    uploaderror = checkFileSize(files[0].size);

    if (uploaderror.success === false) return;

    imgSRC = URL.createObjectURL(files[0]);
  };

  const publishArticle = async () => {
    try {
      if (!article && uploaderror && uploaderror.success === false) return;

      article.text = quill.root.innerHTML;

      const formData = new FormData();
      formData.append("text", article.text);
      formData.append("title", article.title);
      formData.append("category", article.category);
      formData.append("publish", article.publish);
      article.contributors &&
        formData.append("contributors", article.contributors);
      files && formData.append("image", files[0]);

      $loading = true;
      updating = true;
      error = null;
      const response = await fetch(
        `${url}/publication/updatearticle/${article._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + $session.token,
          },
          body: formData,
        }
      );

      const res = await response.json();

      $loading = false;
      updating = false;

      if (response.status === 422) {
        error = res.data;
      } else if (response.status === 401) {
        alertMsg.set({ type: "danger", message: [{ msg: res.message }] });
      } else {
        alertMsg.set({
          type: "success",
          message: [{ msg: res.message }],
        });
      }
    } catch (error) {
      $loading = false;
      updating = false;
      console.log(error);
    }
  };

  export const fetchCategory = async () => {
    try {
      $loading = true;
      const res = await fetch(`${url}/publication/category`);
      const resData = await res.json();

      category = await resData.data.slice(0, 10);
      $loading = false;
    } catch (err) {
      $loading = false;
    }
  };

  onMount(() => {
    fetchCategory();
  });

  beforeUpdate(async () => {
    if (!category) fetchCategory();
  });
  const clearError = (e) => {
    if (!error) return;

    error[e.target.name] = null;
  };
</script>

<style>
  @import "https://cdn.quilljs.com/1.3.6/quill.snow.css";
  .successText {
    color: #49c5b6;
  }

  .dangerText {
    color: #b85c5c;
  }

  /* .danger {
      background-color: #b85c5c;
    } */
</style>

<form on:submit|preventDefault={publishArticle}>
  <div class="box-form-fields">
    <ul>
      <li>
        <div class="row left">
          <label
            for="title"
            class="asterisk-required"><strong>Title</strong></label>
        </div>
        <div class="row right">
          <div class="form-group has-info">
            <input
              type="text"
              name="title"
              bind:value={article.title}
              on:focus={clearError}
              class="text-input"
              max="30" />
            {#if error}
              {#if error.title}
                <div class="msg error">
                  <ul>
                    <li>{error.title}</li>
                  </ul>
                </div>
              {/if}
            {/if}
          </div>
        </div>
      </li>
      <li>
        <div class="row left">
          <label
            for="category"
            class="asterisk-required"><strong>Category</strong></label>
        </div>
        <div class="row right">
          <div class="form-group">
            <input
              type="text"
              name="category"
              bind:value={article.category}
              on:focus={clearError}
              class="text-input" />
            {#if error}
              {#if error.category}
                <div class="msg error">
                  <ul>
                    <li>{error.category}</li>
                  </ul>
                </div>
              {/if}
            {/if}
            <div class="msg">
              <ul>
                <li>Use Comma Seperated values. E.G Science , Arts , Music</li>
              </ul>
            </div>
            {#if category}
              <div class="msg">
                <ul>
                  <li class="text-capitalize">
                    Latest Category:{' '}{category.join(', ')}
                  </li>
                </ul>
              </div>
            {/if}
          </div>
        </div>
      </li>
      <li>
        <div class="row left">
          <label for="contributors"><strong>Contributors</strong></label>
        </div>
        <div class="row right">
          <div class="form-group">
            <input
              type="text"
              name="contributors"
              bind:value={article.contributors}
              class="text-input" />
            <div class="msg">
              <ul>
                <li>
                  Use Comma Seperated values. E.G Franklin John, John Maxwell
                </li>
              </ul>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>

  <div class="box-form-fields">
    <ul>
      <li>
        <div class="row left">
          <label for="text" class="asterisk-required"><strong>Text
            </strong></label>
        </div>
        <div class="row right">
          <div class="form-group">
            <!-- <textarea
              name="text"
              bind:value={article.text}
              on:focus={clearError}
              class="text-input" /> -->
            <div class="editor-wrapper" on:focus={clearError}>
              <div bind:this={editor} />
            </div>
            {#if error}
              {#if error.text}
                <div class="msg error">
                  <ul>
                    <li>{error.text}</li>
                  </ul>
                </div>
              {/if}
            {/if}
          </div>
        </div>
      </li>
    </ul>
  </div>

  <div class="box-form-fields">
    <ul>
      <li>
        <div class="row left">
          <label for="user_settings_photo"><strong>Image</strong></label>
        </div>
        <div class="form-group row right is-image-avatar">
          <div class="box-input-file style2 box-add-image">
            <div class="photo">
              <img
                class="hidden"
                src={imgSRC ? imgSRC : article.articleImage ? article.articleImage.imageURL : 'https://assets.awwwards.com/assets/images/pages/user/avatar.svg'}
                width="100"
                height="100"
                alt="" />

              <input
                type="file"
                id="user_settings_photo"
                name="user_settings"
                class="input-file inputfile"
                data-maxsize="400"
                bind:files
                on:change={setImgURL} />

              <label for="user_settings_photo"> <strong>Upload</strong> </label>
            </div>

            <div class="requirements">
              <ul>
                <li class="js-filename">
                  {#if uploaderror}
                    <span
                      class={uploaderror.success ? 'successText' : 'dangerText'}>
                      {uploaderror.message}
                    </span>
                  {:else}<span> Recommended size: 3MB max. </span>{/if}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="row last">
          <div class="input-check italic">
            <input
              type="checkbox"
              id="publish"
              name="publish"
              bind:checked={article.publish} />
            <label for="publish">Publish Article</label>
          </div>
        </div>
      </li>
    </ul>
  </div>

  <p>
    <input
      type="submit"
      value={updating ? 'Updating...' : 'Update Article'}
      class="button large bold width-full"
      disabled={updating} />
  </p>
</form>
