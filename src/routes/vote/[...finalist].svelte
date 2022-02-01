<script context="module">
  export async function preload({ params }) {
    let contestantId = params.finalist[0];
    let username = params.finalist[1];
    let firstname = params.finalist[2];
    let lastname = params.finalist[3];

    return { contestantId, username, firstname, lastname };
  }
</script>

<script>
  import { loading, alertMsg, about } from "../../store";
  import {
    refCode,
    paystack_public_key,
    pricePerVote,
    backEmail,
    url,
    emailRegex,
  } from "../../utilis/utilis";
  import { stores } from "@sapper/app";
  import Tabs from "../_components/Tabs.svelte";
  import BackBtn from "../../components/BackBtn.svelte";
  const { session } = stores();

  export let contestantId;
  export let username;
  export let lastname;
  export let firstname;

  let vote = {
    voterName: "",
    voterEmail: "",
    voteCount: 1,
    contestantId: contestantId,
    paymentReference: "",
  };

  let error = {
    voterEmail: "",
    voteCount: "",
  };

  let voting = false;

  let tabItems = [
    { label: `Cast Vote for ${username}`, value: 1 },
    { label: "Vote Rules", value: 2 },
  ];
  let currentTab;

  const payWithPaystack = async () => {
    $loading = true;
    voting = true;

    if (vote.voteCount < 1) {
      error.voteCount = "Can only cast at least one vote";

      $loading = false;
      voting = false;

      return;
    }

    if (vote.voterEmail.length > 1 && !vote.voterEmail.match(emailRegex)) {
      error.voterEmail = "Email is not valid";
      $loading = false;

      voting = false;
      return;
    }

    error = {
      voterEmail: "",
      voteCount: "",
    };

    let handler = PaystackPop.setup({
      key: paystack_public_key,
      email: vote.voterEmail.length > 1 ? vote.voterEmail : backEmail,
      amount: vote.voteCount * +pricePerVote * 100,
      ref: `${username}-` + Math.floor(Math.random() * 1000000000 + 1),

      onClose: function () {
        $loading = false;
        voting = false;
        //alert("Window closed.");
      },

      callback: function (response) {
        $loading = true;
        voting = true;

        vote.paymentReference = response.reference;

        verifyPay(vote);
      },
    });

    handler.openIframe();
  };

  const verifyPay = async (votes) => {
    const verifyResponse = await fetch(`${url}vote/verify`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(votes),
    });

    const res = await verifyResponse.json();

    $loading = false;
    voting = false;

    if (res.success) {
      //reset form
      vote.voterName = "";
      vote.voterEmail = "";
      vote.voteCount = 1;
      vote.paymentReference = "";

      alertMsg.set({
        type: "success",
        message: [{ msg: res.message }],
      });
    } else {
      $loading = false;
      voting = false;

      alertMsg.set({
        type: "danger",
        message: [{ msg: res.message }],
      });
    }
  };
</script>

<svelte:head>
  <title>Vote {firstname} {lastname} - {username}</title>
  <script src="https://js.paystack.co/v1/inline.js"></script>
</svelte:head>

<div class="block js-purchase-type" data-type="submission">
  <div class="inner width-2">
    <!--

      <div class="head-box-form">
        <h1 class="heading-large horizontal-center">Vote For {username}</h1>
      </div>
    -->

    <Tabs bind:activeTabValue={currentTab} items={tabItems} />

    {#if 1 === currentTab}
      <form on:submit|preventDefault={payWithPaystack}>
        <div class="box-form-fields">
          <ul>
            <li>
              <div class="row right">
                <div class="form-group has-info">
                  <input
                    type="text"
                    name="name"
                    value={`${firstname} ${lastname}`}
                    class="text-input"
                    max="30"
                    disabled
                  />
                </div>
              </div>
            </li>
            <li>
              <div class="row left">
                <label for="voterEmail"><strong>Voter Email</strong></label>
              </div>
              <div class="row right">
                <div class="form-group has-info">
                  <input
                    type="text"
                    name="voterEmail"
                    bind:value={vote.voterEmail}
                    class="text-input"
                    max="30"
                  />
                  {#if error}
                    {#if error.voterEmail}
                      <div class="msg error">
                        <ul>
                          <li>{error.voterEmail}</li>
                        </ul>
                      </div>
                    {/if}
                  {/if}
                  <div class="msg">
                    <ul>
                      <li>
                        *Not Required, Please input your email to recieve
                        payment receipt
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="row left">
                <label for="VoterName"><strong>Voter Name</strong></label>
              </div>
              <div class="row right">
                <div class="form-group has-info">
                  <input
                    type="text"
                    name="voterName"
                    bind:value={vote.voterName}
                    class="text-input"
                    max="30"
                  />
                  <div class="msg">
                    <ul>
                      <li>*Not Required</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="row left">
                <label for="voteCount" class="asterisk-required"
                  ><strong>Number of Votes</strong></label
                >
              </div>
              <div class="row right">
                <div class="form-group">
                  <input
                    type="number"
                    name="voteCount"
                    bind:value={vote.voteCount}
                    class="text-input"
                  />
                  {#if error}
                    {#if error.voteCount}
                      <div class="msg error">
                        <ul>
                          <li>{error.voteCount}</li>
                        </ul>
                      </div>
                    {/if}
                  {/if}
                  <div class="msg">
                    <ul>
                      <li>
                        *Each Vote Cost <b>{$about?.costPerVote}</b> Naira
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <p>
          <input
            type="submit"
            value={voting ? "Voting..." : "Cast Vote"}
            class="button large bold width-full"
            disabled={voting}
          />
        </p>
      </form>
    {/if}

    {#if 2 === currentTab}
      {@html $about?.rules}
    {/if}

    <BackBtn />
  </div>
</div>
