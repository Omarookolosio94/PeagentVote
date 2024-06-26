const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//export const url = "http://localhost:5000/api/";
export const url = "https://peagent.herokuapp.com/api/";
export const refCode = "3207900WEB";
//export const paystack_public_key ="pk_test_5d0c4e407726895baa4dbd8624f82417ca963410";
export const paystack_public_key ="pk_test_1bf37efbabbbe2b458c62d4357118ffe585e2649";
export const pricePerVote = 50;
export const backEmail = "tiarasandqueens@gmail.com";
export const contestName = "Tiaras and Queens Contest";

const maxsize = 5;

export const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
const fileType = ["image/png", "image/jpg", "image/jpeg"];

export const convertToMB = (size) => {
  var numb = size / 1024 / 1024;
  return (numb = numb.toFixed(2));
};

export const goBack = () => {
  window.history.back();
};

export const checkFileType = (type) => {
  if (!type) return;

  if (fileType.includes(type)) {
    return {
      success: true,
      message: `${type} Format Supported`,
    };
  } else {
    return {
      success: false,
      message: `${type.toUpperCase()} Format Not Supported`,
    };
  }
};

export const checkFileSize = (size) => {
  if (!size) return;

  size = convertToMB(size);
  if (size > +maxsize) {
    return {
      success: false,
      message: `${size}MB Too Large`,
    };
  } else {
    return {
      success: true,
      message: `${size}MB Appropriate `,
    };
  }
};

export const formatDate = (date) => {
  if (!date) return;
  const d = new Date(date);
  const year = d.getFullYear(); // 2019
  const dateNum = d.getDate(); // 23
  const monthName = months[d.getMonth()];

  const formattedDate = `${dateNum} ${monthName}, ${year}`;

  return formattedDate;
};

export const populate = (func) => {
  // document bottom
  let windowRelativeBottom =
    document.documentElement.getBoundingClientRect().bottom;

  // if the user scrolled far enough (<100px to the end)
  if (windowRelativeBottom < document.documentElement.clientHeight + 290) {
    return func;
  }
};

// Browser Functionlity
let modalBox;
let body;
let open_profile;

if (process.browser) {
  modalBox = document.querySelector(".box-lightbox");
  body = document.body;
  open_profile = document.getElementById("open-profile");
}

export function openLogin() {
  body.classList.add("hidden-y");
  modalBox.classList.add("open");
}

export function closeLogin() {
  body.classList.remove("hidden-y");
  modalBox.classList.remove("open");
}

export function openProfile() {
  open_profile.style.display = "block";
}

export function getVoteCount(votes) {
  let voteCount = 0;

  if (votes) {
    if (votes?.length > 0) {
      let voteList = votes.map((vote) => vote.voteCount);

      for (let i = 0; i < voteList.length; i++) {
        voteCount += voteList[i];
      }
      return voteCount;
    } else {
      return voteCount;
    }
  } else {
    return voteCount;
  }
}

export function formatCountDate(date) {
  var seconds = ("0" + Math.floor((date / 1000) % 60)).slice(-2).toString();
  var minutes = ("0" + Math.floor((date / 1000 / 60) % 60))
    .slice(-2)
    .toString();
  var hours = ("0" + Math.floor((date / (1000 * 60 * 60)) % 24))
    .slice(-2)
    .toString();
  var days = Math.floor(date / (1000 * 60 * 60 * 24)).toString();

  var remainingDays = `${days} Days: ${hours} Hours: ${minutes} Minutes: ${seconds} Seconds`;

  return remainingDays;
}
