const checkValidateFormRegister = (infoUserRegister) => {
  const { username, email, password, confirmPassword } = infoUserRegister;
  let isCheck = true;
  let errorMessages = {
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  };

  if (username.trim().length < 5) {
    isCheck = false;
    errorMessages.username = true;
  }

  if (email.trim().length < 5 || !email.includes("@")) {
    isCheck = false;
    errorMessages.email = true;
  }

  if (password.trim().length < 8) {
    isCheck = false;
    errorMessages.password = true;
  }

  if (confirmPassword.trim().length === 0 || password !== confirmPassword) {
    isCheck = false;
    errorMessages.confirmPassword = true;
  }

  return { isCheck, errorMessages };
};

const checkValidateFormLogin = (infoUserLogin) => {
  const { email, password } = infoUserLogin;
  let isCheck = true;
  let errorMessages = {
    email: false,
    password: false,
  };

  if (email.trim().length < 5 || !email.includes("@")) {
    isCheck = false;
    errorMessages.email = true;
  }

  if (password.trim().length < 8) {
    isCheck = false;
    errorMessages.password = true;
  }

  return { isCheck, errorMessages };
};

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

  if (startDate === "Invalid date" || endDate === "Invalid date") {
    alert("Please choice Your Date Booking !");

    return false;
  }

  if (adults === 0 && children === 0) {
    alert("Please choice Your Number People Stay In Room !");

    return false;
  }

  if (rooms.length === 0) {
    alert("Please choice Your Rooms !");

    return false;
  }
  // maxpeople >= totalPeople
  if (maxPeopleInRooms < totalPeople) {
    alert("Your Choice People greater than maxPeople of Room !");

    return false;
  }

  return true;
};

export {
  checkValidateFormRegister,
  checkValidateFormLogin,
  checkValidateFormForgotPassword,
  checkFormBooking,
};
