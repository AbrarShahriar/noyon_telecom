import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

dayjs.tz.setDefault("Asia/Dhaka");

export const dayjsLocal = dayjs;

export const parseDate = (date, fromNow = false) =>
  fromNow
    ? dayjsLocal(date).fromNow()
    : dayjsLocal(date).format("DD/MM/YY (h:mm a)");

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
  return str ? `${str[0].toUpperCase()}${str.substring(1, str.length)}` : "";
};

export const truncateText = (str = "", length = 5) => {
  if (str) {
    let strArr = str.split(" ");
    let truncatedText = "";
    for (let i = 0; i < length; i++) {
      truncatedText += strArr[i] + " ";
    }
    return truncatedText + "...";
  }
  return "";
};

export const truncateTextWithoutSpace = (str, len = 8) =>
  str.substring(0, len) + "...";

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
