<script>
  import { stores, goto } from "@sapper/app";
  import { beforeUpdate, onMount } from "svelte";
  import { loading, alertMsg } from "../../../../../.store";
  import {
    checkFileSize,
    checkFileType,
    url,
  } from "../../../../../utilis/utilis";
  const { session } = stores();

  let editor;
  let quill;
  let submitting = false;

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
  });

  let article = {
    title: "",
    text: "",
    category: "",
    link: "",
    contributors: "",
    publish: true,
  };

  let error;
  let uploaderror;
  let files;
  let category;
  let imgSRC;

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
      if (uploaderror && uploaderror.success === false) return;

      article.text = quill.root.innerHTML;

      // if (article.text.length < 20) {
      //   error = { text: "Text should be greater than 150 Words" };

      //   return alertMsg.set({
      //     type: "danger",
      //     message: [{ msg: "Text should be greater than 10 words" }],
      //   });
      // }

      const formData = new FormData();
      formData.append("text", article.text);
      formData.append("title", article.title);
      formData.append("category", article.category);
      formData.append("publish", article.publish);
      article.contributors &&
        formData.append("contributors", article.contributors);
      files && formData.append("image", files[0]);

      submitting = true;
      $loading = true;
      error = null;
      const response = await fetch(`${url}/publication/publishArticle`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + $session.token,
        },
        body: formData,
      });

      const res = await response.json();

      submitting = false;
      $loading = false;

      if (response.status === 422) {
        error = res.data;
      } else if (response.status === 401) {
        alertMsg.set({ type: "danger", message: [{ msg: res.message }] });
      } else {
        article = {
          title: "",
          text: "",
          category: "",
          link: "",
          contributors: "",
          publish: true,
        };
        quill.root.innerHTML = "";

        alertMsg.set({
          type: "success",
          message: [{ msg: res.message }],
        });

        goto(`/article/${res.data._id}`);
      }
    } catch (error) {
      submitting = false;
      $loading = false;
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
      console.log(err);
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

<form on:submit|preventDefault={publishArticle}>
  <div class="box-form-fields">
    <ul>
      <li>
        <div class="row left">
          <label for="title" class="asterisk-required"
            ><strong>Title</strong></label
          >
        </div>
        <div class="row right">
          <div class="form-group has-info">
            <input
              type="text"
              name="title"
              bind:value={article.title}
              on:focus={clearError}
              class="text-input"
              max="30"
            />
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
          <label for="category" class="asterisk-required"
            ><strong>Category</strong></label
          >
        </div>
        <div class="row right">
          <div class="form-group">
            <input
              type="text"
              name="category"
              bind:value={article.category}
              on:focus={clearError}
              class="text-input"
            />
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
                    Latest Category:{" "}{category.join(", ")}
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
              class="text-input"
            />
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
          <label for="text" class="asterisk-required"
            ><strong>Text </strong></label
          >
        </div>
        <div class="row right">
          <div class="form-group">
            <div class="editor-wrapper" on:focus={clearError}>
              <div bind:this={editor} />
            </div>
            {#if error}
              {#if error.text}
                <div class="msg error">
                  <ul>
                    <li id="text-error">{error.text}</li>
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
                src={imgSRC
                  ? imgSRC
                  : "https://assets.awwwards.com/assets/images/pages/user/avatar.svg"}
                width="100"
                height="100"
                alt=""
              />

              <input
                type="file"
                id="user_settings_photo"
                name="user_settings"
                class="input-file inputfile"
                data-maxsize="400"
                bind:files
                on:change={setImgURL}
              />

              <label for="user_settings_photo"> <strong>Upload</strong> </label>
            </div>

            <div class="requirements">
              <ul>
                <li class="js-filename">
                  {#if uploaderror}
                    <span
                      class={uploaderror.success ? "successText" : "dangerText"}
                    >
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
              bind:checked={article.publish}
            />
            <label for="publish">Publish Article</label>
            <p>
              If checked article would be published on submission, else article
              would be saved to draft
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>

  <p>
    <input
      type="submit"
      value={submitting ? "Publishing..." : "Publish Article"}
      class="button large bold width-full"
      disabled={submitting}
    />
  </p>
</form>

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
