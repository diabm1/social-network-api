const addDateSuffix = (date) => {
  let dateString = date.toString();

  const lastCharacter = dateString.charAt(dateString.length - 1);

  if (lastCharacter === "1" && dateString !== "11") {
    dateString = `${dateStr}st`;
  } else if (lastCharacter === "2" && dateString !== "12") {
    dateString = `${dateString}nd`;
  } else if (lastCharacter === "3" && dateString !== "13") {
    dateString = `${dateString}rd`;
  } else {
    dateString = `${dateString}th`;
  }

  return dateString;
};

//function to format a timestamp and accepts the timestap/"options" object as parameters
module.exports = (
  timestamp,
  { monthLength = "short", dateSuffic = true } = {}
) => {
  const months = {
    0: monthLength === "short" ? "Jan" : "January",
    1: monthLength === "short" ? "Feb" : "February",
    2: monthLength === "short" ? "Mar" : "March",
    3: monthLength === "short" ? "Apr" : "April",
    4: monthLength === "short" ? "May" : "May",
    5: monthLength === "short" ? "Jun" : "June",
    6: monthLength === "short" ? "Jul" : "July",
    7: monthLength === "short" ? "Aug" : "August",
    8: monthLength === "short" ? "Sep" : "September",
    9: monthLength === "short" ? "Oct" : "October",
    10: monthLength === "short" ? "Nov" : "November",
    11: monthLength === "short" ? "Dec" : "December",
  };

  const dateObj = new Date(timestamp);
  const formattedMonth = months[dateObj.getMonth()];

  const dayOfMonth = dateSuffic
    ? addDateSuffix(dateObj.getDate())
    : dateObj.getDate();

  const year = dateObj.getFullYear();
  let hour =
    dateObj.getHours() > 12
      ? Math.floor(dateObj.getHours() - 12)
      : dateObj.getHours();

  if (hour === 0) {
    hour = 12;
  }

  const minutes = (dateObj.getMinutes() < 10 ? "0" : "") + dateObj.getMinutes();

  // using this to set am or pm
  const timeOfDay = dateObj.getHours() >= 12 ? "pm" : "am";

  const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${timeOfDay}`;

  return formattedTimeStamp;
};
