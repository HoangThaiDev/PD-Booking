const checkValidateFormForgotPassword = (infoUserLogin) => {
  const { email } = infoUserLogin;
  let isCheck = true;
  let errorMessages = {
    email: false,
  };

  if (email.trim().length < 5 || !email.includes("@")) {
    isCheck = false;
    errorMessages.email = true;
  }

  return { isCheck, errorMessages };
};

const checkFormBooking = (valueFormBooking) => {
  const { startDate, endDate, adults, children, rooms, maxPeople } =
    valueFormBooking;
  const totalPeople = adults + children;
  const maxPeopleInRooms = maxPeople * rooms.length;
  const isCheckValidate = { state: true, message: "" };

  if (startDate === "Invalid date" || endDate === "Invalid date") {
    isCheckValidate.state = false;
    isCheckValidate.message = "Please choice Your Date Booking!";
    return isCheckValidate;
  }

  if (adults === 0 && children === 0) {
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

export { checkValidateFormForgotPassword, checkFormBooking };
