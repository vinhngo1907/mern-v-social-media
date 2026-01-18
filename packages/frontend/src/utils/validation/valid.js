const valid = ({fullname, username, email, password, cf_password}) => {
  const err = {};

  if (!fullname) {
    err.fullname = 'Please add your full name.';
  }

  if (!username) {
    err.username = 'Please add your username.';
  } else if (username.replace(/ /g, '').length > 20) {
    err.username = 'Username is up to 20 chars long.';
  }

  if (!email) {
    err.email = 'Please add your email.';
  } else if (!validateEmail(email)) {
    err.email = 'Email format is incorrect.';
  }

  if (!password) {
    err.password = 'Please add your password.';
  } else if (password.length < 6) {
    err.password = 'Password must be at least 6 characters.';
  }

  if (password !== cf_password) {
    err.cf_password = 'Confirm password did not match.';
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

function validateEmail(email) {
  // const re =
  //   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default valid;

export const validateUpdateProfile =(profileData) => {
   const { fullname, mobile, story } = profileData;
    let error = {}
    if (!fullname) {
        error.fullname = "Please add your full name."
    } else if (fullname && fullname.length > 25) {
        error.fullname = "Fullname is up to 25 chars long"
    }

    // if (mobile) {
    //     if (!validatePhone(mobile)) {
    //         error.mobile = "Mobile format is incorrect";
    //     }
    // }

    if (story && story.length > 200) {
        error.story = "Your story too long."
    }

    return {
        errMsg: error,
        errLength: Object.keys(error).length
    }
}

export const validateLoginSMS = (phone) => {
    let error = {}
    if (!validatePhone(phone)) {
        error = "Mobile format is incorrect";
    }
    
    return {
        errMsg: error,
        errLength: Object.keys(error).length
    }
}

function validatePhone(phone) {
    const re = /^[+]/g
    return re.test(phone);
}