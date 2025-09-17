import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Candidatesuserloginandsignup = () => {
  const [isLogined, setIsLogined] = useState(true);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">
          {isLogined ? "Login" : "Sign Up"}
        </h3>

        {isLogined ? (
          <Loginform onSwitch={() => setIsLogined(false)} />
        ) : (
          <SignUpform onSwitch={() => setIsLogined(true)} />
        )}
      </div>
    </div>

  );
};

export default Candidatesuserloginandsignup;

const Loginform = ({ onSwitch }) => {
  const [password, setPassword] = useState("");
  const [identifier, setIdentifier] = useState("");
  const navigate = useNavigate();

  const loginformsubmit = (e) => {
    e.preventDefault();
    axios.get("http://localhost:5000/cadidatesregistration")
      .then((response) => {
        const users = response.data;
        const matchedUser = users.find(user =>
          (user.email?.toLowerCase() === identifier.toLowerCase() ||
            user.phonenumber === identifier) &&
          user.password === password
        );
        if (matchedUser) {
          sessionStorage.setItem('candiateid', matchedUser.id);
          sessionStorage.setItem('username', matchedUser.username);
          alert("Login successful!");
          navigate('/candidateprofile')
        } else {
          alert("Invalid credentials");
        }
      })
      .catch(error => {
        console.error("Error fetching users", error);
        alert("Something went wrong!");
      });
  };

  return (

    <form onSubmit={loginformsubmit} className="needs-validation" noValidate>
      {/* Email or Phone Number */}
      <div className="mb-3">
        <label className="form-label">Email or Phone Number</label>
        <input
          type="text"
          className="form-control"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
      </div>

      {/* Password */}
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      {/* Submit Button */}
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </div>

      {/* Switch Link */}
      <div className="text-center mt-3">
        <span className="text-muted">Don&apos;t have an account? </span>
        <button
          type="button"
          className="btn btn-link p-0 fw-bold"
          onClick={onSwitch}
        >
          Sign Up
        </button>
      </div>
    </form>

  );
};

const SignUpform = ({ onSwitch }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [reemail, setReemail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [rephonenumber, setRephonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const navigate = useNavigate();

  const Signupformsubmit = (e) => {
    e.preventDefault();
    if (email === reemail && phonenumber === rephonenumber && password === repassword && password.length >= 8) {
      axios.post("http://localhost:5000/cadidatesregistration", { email, password, username, phonenumber })
        .then((response) => {
          alert("Scessfully Created an account😊")
          console.log(response.data)
          navigate('/candidateregister')
          sessionStorage.setItem("candiateid", response.data.id)
          sessionStorage.setItem("username", username)
        }
        )
        .catch((error) => {
          console.error(error)
        }
        )
    }
    else {
      alert("Enter the details corectly")
    }
  };

  return (

    <form onSubmit={Signupformsubmit} className="needs-validation" noValidate>
      <h3 className="text-center mb-4">Create Account</h3>

      {/* Username */}
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      {/* Re-Enter Email */}
      <div className="mb-3">
        <label className="form-label">Re-Enter Email</label>
        <input
          type="email"
          className="form-control"
          value={reemail}
          onChange={(event) => setReemail(event.target.value)}
          required
        />
      </div>

      {/* Phone Number */}
      <div className="mb-3">
        <label className="form-label">Phone Number</label>
        <input
          type="tel"
          className="form-control"
          pattern="[0-9]{10}"
          value={phonenumber}
          onChange={(event) => setPhonenumber(event.target.value)}
          required
        />
        <div className="form-text">Enter 10 digits</div>
      </div>

      {/* Re-Enter Phone Number */}
      <div className="mb-3">
        <label className="form-label">Re-Enter Phone Number</label>
        <input
          type="tel"
          className="form-control"
          pattern="[0-9]{10}"
          value={rephonenumber}
          onChange={(event) => setRephonenumber(event.target.value)}
          required
        />
      </div>

      {/* Password */}
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      {/* Re-Enter Password */}
      <div className="mb-3">
        <label className="form-label">Re-Enter Password</label>
        <input
          type="password"
          className="form-control"
          value={repassword}
          onChange={(event) => setRepassword(event.target.value)}
          required
        />
      </div>

      {/* Submit Button */}
      <div className="d-grid">
        <button type="submit" className="btn btn-success">
          Sign Up
        </button>
      </div>

      {/* Switch Link */}
      <div className="text-center mt-3">
        <span className="text-muted">Already have an account? </span>
        <button
          type="button"
          className="btn btn-link p-0 fw-bold"
          onClick={onSwitch}
        >
          Login
        </button>
      </div>
    </form>

  );
};