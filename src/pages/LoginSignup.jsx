import { useState } from "react";
// import { connect } from "react-redux";
// import { onGoogleLogin, onLogin, onSignup } from "../store/user.actions";
import { GoogleLogin } from "react-google-login";

export function LoginSignup() {
  const CLIENT_ID =
    "406612332940-4mqv79mrl54e698rlt5ihvlc66t8ovp8.apps.googleusercontent.com";

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [isSignup, setIsSignup] = useState(false);

  const clearState = () => {
    setCredentials({ username: "", password: "", fullname: "" });
    setIsSignup(false);
  };

  const handleGoogleFaliure = (res) => {};

  const handleGoogleLogin = (data) => {
    const username = data.profileObj.givenName;
    const password = data.googleId;
    const fullname = data.profileObj.name;
    const avatar = data.profileObj.imageUrl;
    const credentials = { username, password, fullname, avatar };
    // onGoogleLogin(credentials);
    clearState();
    // props.history.push("/userboards");
  };

  const handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    setCredentials({ ...credentials, [field]: value });
  };

  const onLogin = (ev) => {
    ev.preventDefault();
    // onLogin(credentials);
    clearState();
    // props.history.push("/userboards");
  };

  const onSignup = (ev) => {
    ev.preventDefault();
    // onSignup(credentials);
    clearState();
    // props.history.push("/userboards");
  };

  const toggleSignup = () => {
    setIsSignup(!isSignup);
  };

  return (
    <section className="login-page">
      <div className="login-cmp">
        <p>
          <a className="login-title">{!isSignup ? "Log in" : "Sign up"}</a>
        </p>
        {!isSignup && (
          <form className="login-form">
            <div className="fields">
              <input
                type="text"
                name="username"
                // value={credentials.username}
                placeholder="Enter username"
                onChange={handleChange}
                required
                autoFocus
              />
              <input
                type="password"
                name="password"
                // value={credentials.password}
                placeholder="Enter password"
                onChange={handleChange}
                required
              />
            </div>

            <a className="grey-btn" onClick={onLogin}>
              Log in
            </a>
            <div className="or">OR</div>
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText={"Continue with Google"}
              onSuccess={handleGoogleLogin}
              onFailure={handleGoogleFaliure}
              cookiePolicy="single_host_origin"
            ></GoogleLogin>
            <hr></hr>
            <h5 className="go-to-btn" onClick={toggleSignup}>
              Sign up for an account
            </h5>
          </form>
        )}
        {/* <div className="signup-section"> */}
        {isSignup && (
          <form className="signup-form">
            <div className="fields">
              <div className="field">
                <input
                  type="text"
                  name="fullname"
                  // value={credentials.fullname}
                  placeholder="Enter full name"
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </div>
              <div className="field">
                <input
                  type="text"
                  name="username"
                  // value={credentials.username}
                  placeholder="Enter username"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <input
                  type="password"
                  name="password"
                  // value={credentials.password}
                  placeholder="Enter password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <a className="grey-btn" onClick={onSignup}>
              Sign up
            </a>
            <div className="or">OR</div>
            <GoogleLogin
              clientId={CLIENT_ID}
              // clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText={"Continue with Google"}
              onSuccess={handleGoogleLogin}
              onFailure={handleGoogleFaliure}
              cookiePolicy="single_host_origin"
            ></GoogleLogin>
            <hr></hr>
            <h5 className="go-to-btn" onClick={toggleSignup}>
              Already have an account? Log In
            </h5>
          </form>
        )}
        {/* </div> */}
      </div>
    </section>
  );
}

// function mapStateToProps(state) {
//   return {
//     user: state.userModule.user,
//   };
// }

// const mapDispatchToProps = {
//   onLogin,
//   onSignup,
//   onGoogleLogin,
// };

// export const LoginSignup = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(_LoginSignup);
