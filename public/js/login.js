// / ======= SIGN IN PAGE =================
// initial page view
// show sign in, hide sign up
let viewSignIn = true;
let userErr;
let emailErr1;
let emailErr2;
let emailErrMatch;
function errMessage(location, errID, message) {
  $(location).after(`<div id="${errID}" <h5 style="color:red">
                                        <i class="mdl-color-text--red material-icons">error_outline
                                        </i> ${message}</h5></div>`);
}
let loginErr = {
  signIn: function() {
    errMessage("#signInBtn", "signIn-error", "Invalid email or password");
  },
  signUp: {
    email1: function() {
      errMessage("#signUp-email1", "signUp-error1", "Invalid email address");
    },
    email2: function() {
      errMessage("#signUp-email2", "signUp-error2", "Invalid email address");
    },
    emailMatch: function() {
      errMessage("#signUpBtn", "signUp-error3", "Emails don't match");
    },
    dbErr: function() {
      alert(
        "SORRY, Our Database Developer is either drunk or a little too high.  Please notify your Student Success Manager of our error. :("
      );
    }
  }
};
$(".signIn").show();
$(".signUp").hide();
$(document).on("click", ".signUpLink", toggleLoginView);
$(document).on("click", ".signInLink", toggleLoginView);

function toggleLoginView(event) {
  event.preventDefault();
  if (viewSignIn === true) {
    $(".signIn").hide();
    $(".signUp").show();
    viewSignIn = false;
  } else {
    $(".signIn").show();
    $(".signUp").hide();
    viewSignIn = true;
  }
}

//////////////////////////// Work on this
// need to check if user is logged in on each page.
//we will only be showing this page if the user is not logged in
// if user is already logged in go to landing page

// ---- Sign-In------
// user clicks Submit button to sign in
$(document).on("click", "#signInBtn", handleSignInBtn);

function handleSignInBtn(event) {
  event.preventDefault();
  // get user email
  let user = $("#signIn-email")
    .val()
    .trim();
  // get user password
  let password = $("#signIn-pass")
    .val()
    .trim();
  console.log(user, password);

  let userinfo = {
    user: user,
    password: password
  };

  //   send user info to login route/db to check info
  $.post("/api/login", userinfo).then(function(res) {
    //   get error html if any
    userErr = document.getElementById("signIn-error");
    if (res.status !== 200) {
      console.log("Invalid email or password<");
      //   if there is not already an error shown
      if (userErr == null) {
        // show message in html that the email or password does not match
        loginErr.signIn();
      }
    } else {
      // if user exists and the password matches,
      //  if error message exists, remove
      if (userErr !== null) {
        $("#signIn-error").remove();
      }
      //user should be loggined in on the back end and redirect to landing page
      window.location.replace("/landing");
    }
  });
}

// ----- Sign - Up --------
// register click event
$(document).on("click", "#signUpBtn", handleSignUpBtn);

function handleSignUpBtn(event) {
  event.preventDefault();
  // get user info
  const first_name = $("#first-name")
    .val()
    .trim();
  const last_name = $("#last-name")
    .val()
    .trim();
  const email1 = $("#form-email1")
    .val()
    .trim();
  const email2 = $("#form-email2")
    .val()
    .trim();
  const password = $("#form-pass1")
    .val()
    .trim();
  const userClass = $("#classSelector")
    .val()
    .trim();

  console.log(first_name, "firstname");
  console.log(last_name, "lastname");
  console.log(email1, "email1");
  console.log(email2, "email2");
  console.log(password, "pass");
  console.log(userClass, "class");

  console.log(validateEmail(email1), "this is email input");
  if (validateEmail(email1)) {
    if (validateEmail(email2)) {
      if (email1 === email2) {
        console.log("valid emails and they match");
        //ajax call
        user = email1;
        const userData = {
          first_name,
          last_name,
          user,
          password,
          userClass
        };
        // post data for user to be added to database
        // back end should check to see if user already exists and then add or send back error
        $.post("/api/signup", userData).then(function(res) {
          emailErr1 = document.getElementById("signUp-error1");
          emailErr2 = document.getElementById("signUp-error2");
          emailErrMatch = document.getElementById("signUp-error3");
          if (!res.created_at) {
            ////////////////  error adding to database = show error
            console.log("something went wrong with database");
            loginErr.signUp.dbErr();
          } else {
            //   everything is good so redirect to landing page &
            //   remove any error messages if they exists
            if (emailErrMatch !== null) {
              $("#signUp-error3").remove();
            }
            if (emailErr2 !== null) {
              $("#signUp-error2").remove();
            }
            if (emailErr1 !== null) {
              $("#signUp-error1").remove();
            }
            console.log("Should redirect to landing page");
            window.location.replace("/landing");
          }
        });
      } else {
        console.log("both valid emails but no match");
        if (emailErrMatch == null) {
          LoginErr.signUp.emailMatch();
        }
      }
    } else {
      // show error in html
      console.log("problem with email 2");
      if (emailErr2 == null) {
        loginErr.signUp.email2();
      }
    }
  } else {
    // show error in html
    console.log("problem with email 1");
    if (emailErr1 == null) {
      loginErr.signUp.email1();
    }
  }
}

// check to make sure email is valid - trust me, it works.
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
