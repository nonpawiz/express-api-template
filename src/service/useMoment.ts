import moment, { MomentInput } from "moment";
const unpacked = {
  name: "Asia/Bangkok",
  abbrs: ["ICT"],
  untils: [null],
  offsets: [-420],
};

export default () => {
  const now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const format = (date: MomentInput) =>
    moment(date).format("YYYY-MM-DD HH:mm:ss");

  const formatUtc = (date: MomentInput) =>
    moment(date).utcOffset(7).format("YYYY-MM-DD HH:mm:ss");

  return {
    now,
    format,
    formatUtc,
  };
};
