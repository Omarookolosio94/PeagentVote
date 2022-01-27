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

export const url = "http://localhost:5000/api/";
//export const url = "https://peagent.herokuapp.com/api/";

// const maxsize = 3145728;
const maxsize = 2;

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
  if (size > maxsize) {
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
