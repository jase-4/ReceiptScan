class EmailError extends Error{
  constructor(message){
    super(message);
    this.name = "EmailError";
  }
}

class PasswordError extends Error{
  constructor(message){
    super(message);
    this.name = "PasswordError";
  }
}

export function validRegister(email,password){
  var validPassword;
  var validEmail;

  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  password >= 6 ? validPassword = true :  validPassword = false;
  email.match(regex) ? validEmail = true : validEmail = false;

  if(validEmail==true){
    if(validPassword==true){
      return "Valid Email Address & Password"
    }
    else {
      throw new PasswordError("InvalidPasswordError")
    }
  }
  else {
    throw new EmailError("InvalidEmailAddressError")
  }
}

