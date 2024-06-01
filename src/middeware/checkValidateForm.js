const checkFormBooking = (valueFormBooking) => {
  const { startDate, endDate, options, rooms, maxPeople } = valueFormBooking;
  const totalPeople = options.adults + options.children;
  const maxPeopleInRooms = maxPeople * rooms.length;
  const isCheckValidate = { state: true, message: "" };

  if (startDate === "Invalid date" || endDate === "Invalid date") {
    isCheckValidate.state = false;
    isCheckValidate.message = "Please choice Your Date Booking!";
    return isCheckValidate;
  }

  if (options.adults === 0 && options.children === 0) {
    isCheckValidate.state = false;
    isCheckValidate.message = "Please choice Your Number People Stay In Room!";
    return isCheckValidate;
  }

  if (rooms.length === 0) {
    isCheckValidate.state = false;
    isCheckValidate.message = "Please choice Your Rooms!";
    return isCheckValidate;
  }
  // maxpeople >= totalPeople
  if (maxPeopleInRooms < totalPeople) {
    isCheckValidate.state = false;
    isCheckValidate.message =
      "Your Choice People greater than maxPeople of Room!";
    return isCheckValidate;
  }

  return isCheckValidate;
};

export { checkFormBooking };
