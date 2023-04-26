import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const onWheel = (apiObj, ev) => {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
};

export const formatLabel = (str) => {
  return `${str[0].toUpperCase()}${str.substring(1, str.length)}`;
};

export const truncateText = (str, length = 5) => {
  let strArr = str.split(" ");
  let truncatedText = "";
  for (let i = 0; i < length; i++) {
    truncatedText += strArr[i] + " ";
  }
  return truncatedText + "...";
};

export const MySwal = withReactContent(Swal);

export const formatPhone = (phone) =>
  phone.split(" ").join("").substring(3, phone.split(" ").join("").length);

export const setAdminKey = (value) => localStorage.setItem("admin_key", value);
export const getAdminKey = () => localStorage.getItem("admin_key");
export const deleteAdminKey = () => localStorage.removeItem("admin_key");
export const setModeratorKey = (value) =>
  localStorage.setItem("moderator_key", JSON.stringify(value));

export const getModeratorKey = () => {
  if (localStorage.getItem("moderator_key")) {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("moderator_key")).moderatorKey;
  }
  return false;
};
export const getModeratorId = () => {
  if (localStorage.getItem("moderator_key")) {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("moderator_key")).moderatorId;
  }
  return false;
};
export const deleteModeratorKey = () =>
  localStorage.removeItem("moderator_key");
export const getAuthorizationHeader = () => ({
  Authorization: `Bearer ${getAdminKey() || getModeratorKey()}`,
});

export const getLocation = (callback) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callback);
  } else {
    MySwal.fire({
      text: "Location Specific Data Not Available For Your Device",
      icon: "warning",
    });
  }
};
