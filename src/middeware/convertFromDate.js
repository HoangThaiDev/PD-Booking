// Import Modules
import moment from "moment";

const convertFromStartDate = (startDateInput) => {
  const startDate = new Date(startDateInput);
  return moment(startDate).format("DD/MM/YYYY");
};

const convertFromEndDate = (endDateInput) => {
  const endDate = new Date(endDateInput);
  return moment(endDate).format("DD/MM/YYYY");
};

export { convertFromStartDate, convertFromEndDate };
