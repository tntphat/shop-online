import moment from "moment";

const subtractTimeByString = (time1, time2) =>
  moment(time2).diff(moment(time1));

const formatDateByString = (time, type) => moment(time).format(type);

export { subtractTimeByString, formatDateByString };
