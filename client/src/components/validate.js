export const validate = (data, type) => {
  const errors = {};

  if (!data.email) {
    errors.email = "Email is Required!";
  } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(data.email).toLowerCase())) {
    errors.email = "Email address is invalid!";
  } else {
    delete errors.email;
  }

  if (!data.password) {
    errors.password = "Password is Required";
  } else if (!(data.password.length >= 6)) {
    errors.password = "Password needs to be 6 character or more";
  } else {
    delete errors.password;
  }

  if (!data.contact) {
    errors.contact = "Contact is Required";
  } 
 else {
    delete errors.contact;
  }

  if (!data.college) {
    errors.college = "college is Required";
  } 
 else {
    delete errors.college;
  }

  if (type === "signUp") {
    if (!data.username.trim()) {
      errors.username = "Username is Required!";
    } else {
      delete errors.username;
    }
  }
  if (!data.prn.trim()) {
    errors.prn = "PRN is Required!";
  } else {
    delete errors.prn;
  }

  return errors;
};
