// / ======= SIGN IN PAGE =================
// initial page view
// show sign in, hide sign up
let viewSignIn = true;
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
        //if (res.status !== 200) {
        //console.log("Email or password does not match");
        /////////////////////////// Need to add html to show user the error
        // show message in html that the email or password does not match
        //} else {
        // if user exists and the password matches,
        //user should be loggined in on the back end and redirect to landing page
        window.location.replace("/landing");
        //}
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
    const user1 = $("#form-email1")
        .val()
        .trim();
    const user2 = $("#form-email2")
        .val()
        .trim();
    const password = $("#form-pass1")
        .val()
        .trim();

    console.log(first_name, "firstname");
    console.log(last_name, "lastname");
    console.log(user1, "email1");
    console.log(user2, "email2");
    console.log(password, "pass");

    console.log(validateEmail(user1), "this is email input");
    if (validateEmail(user1)) {
        if (validateEmail(user2)) {
            if (user1 === user2) {
                console.log("valid emails and they match");
                //ajax call
                user = user1;
                const userData = {
                    first_name,
                    last_name,
                    user,
                    password
                };
                //////////////////////// Need to chnage if sending multiple errors for different reasons
                // post data for user to be added to database
                // back end should check to see if user already exists and then add or send back error
                $.post("/api/signup", userData).then(function(res) {
                    //if (res.status !== 200) {
                    ////////////////  error adding to database = show error in html
                    //console.log("something went wrong with data base");
                    //} else {
                    //   everything is good so redirect to landing page
                    window.location.replace("/landing");
                    //}
                });
            } else {
                console.log("both valid emails but no match");
            }
        } else {
            ////////////////////// show error in html
            console.log("problem with emails");
        }
    } else {
        //////////////////////// show error in html
        console.log("problem with emails");
    }
}
// check to make sure email is valid - trust me, it works.
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}