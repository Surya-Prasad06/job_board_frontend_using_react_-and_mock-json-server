import axios from "axios";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Css/Loginandsignuppage.css'
const Loginandsignuppage = () => {
    const isAuthenticated = !!sessionStorage.getItem("companyId");

    const [isLogined, setIsLogined] = useState(true);
    if (isAuthenticated) {
        return <Navigate to="/companypage" />;
    }



    return (
        // <>
        //     <div>
        //         {isLogined ? (
        //             <>
        //                 <div>

        //                     <Loginform />
        //                 </div>
        //                 <div>

        //                     didn't have account <button onClick={() => {
        //                         setIsLogined(false)
        //                     }
        //                     }>SignUp</button>
        //                 </div>
        //             </>
        //         ) : (
        //             <>
        //                 <div>

        //                     <SignUpform />
        //                 </div>
        //                 <div>

        //                     already have an account <button onClick={() => {
        //                         setIsLogined(true)
        //                     }
        //                     }>Login</button>
        //                 </div>
        //             </>
        //         )}
        //     </div>
        // </>

        <div className="auth-container">
            {isLogined ? (
                <div className="auth-card">
                    <Loginform />
                    <div className="switch-text">
                        Don't have an account?
                        <button onClick={() => setIsLogined(false)} className="switch-btn">Sign Up</button>
                    </div>
                </div>
            ) : (
                <div className="auth-card">
                    <SignUpform />
                    <div className="switch-text">
                        Already have an account?
                        <button onClick={() => setIsLogined(true)} className="switch-btn">Login</button>
                    </div>
                </div>
            )}
        </div>

    );
};

export default Loginandsignuppage;




const Loginform = () => {
    const [identifier, setIdentifier] = useState(""); // email or phone
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const loginsubmit = (e) => {
        e.preventDefault();

        axios.get("http://localhost:5000/users")
            .then((response) => {
                const users = response.data;

                const matchedUser = users.find(user =>
                    (user.email?.toLowerCase() === identifier.toLowerCase() ||
                        user.phonenumber === identifier) &&
                    user.password === password
                );


                if (matchedUser) {
                    sessionStorage.setItem('companyId', matchedUser.id);
                    sessionStorage.setItem('username', matchedUser.name);
                    alert("Login successful!");
                    navigate('/companypage')
                } else {
                    alert("Invalid credentials");
                }
            })
            .catch(error => {
                console.error("Error fetching users", error);
                alert("Something went wrong!");
            });
    }

    return (
        // <>
        // <form onSubmit={loginsubmit}>
        //     <h1>Login</h1>

        //     <label>Email or Phone Number</label><br />
        //     <input
        //         type="text"
        //         value={identifier}
        //         onChange={(e) => setIdentifier(e.target.value)}
        //     /><br />

        //     <label>Password</label><br />
        //     <input
        //         type="password"
        //         value={password}
        //         onChange={(e) => setPassword(e.target.value)}
        //     /><br />

        //     <input type="submit" value="Login" />
        // </form>
        // </>
        <form onSubmit={loginsubmit} className="login-form">
  <h1 className="form-title">Login</h1>

  <label>Email or Phone Number</label>
  <input
    type="text"
    value={identifier}
    onChange={(e) => setIdentifier(e.target.value)}
    required
    placeholder="Enter email or phone"
  />

  <label>Password</label>
  <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    placeholder="Enter password"
  />

  <input type="submit" value="Login" className="submit-btn" />
</form>

    );
};



const SignUpform = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [repassword, setRepassword] = useState("")
    const navigate = useNavigate()

    const signuphandler = (e) => {
        e.preventDefault();
        if (password.length >= 8 && repassword === password) {

            axios.post("http://localhost:5000/users", { name, phonenumber, password, email })
                .then((response) => {
                    console.log(response.data)
                    alert("account created successfully")
                    navigate('/companyregisteration')
                    sessionStorage.setItem('username', name);
                    sessionStorage.setItem('companyId', response.data.id);

                }
                ).catch((error) => {
                    console.error(error);
                    alert("Failed to create account. Please check your input and try again.");
                })
        } else {
            alert("failed to create")



        }
    }
    return (
        <>
        {/* <form action="" onSubmit={signuphandler}>
            <label htmlFor="">Company Name</label><br />
            <input value={name} onChange={
                (event) => {
                    setName(event.target.value)
                }

            } type="text" /><br />
            <label htmlFor="">Email</label><br />
            <input value={email} onChange={
                (event) => {
                    setEmail(event.target.value)
                }

            } type="email" name="" id=" " /><br />
            <label for="phone">phone number</label> <br />
            <input
                onChange={
                    (event) => {
                        setPhonenumber(event.target.value)
                    }

                } value={phonenumber} type="tel" id="phone" name="phone" pattern="[0-9]{4}[0-9]{2}[0-9]{4}" /><br />
            <label htmlFor="">Password</label><br />
            <input value={password} onChange={
                (event) => {
                    setPassword(event.target.value)
                }

            } type="password" /><br />
            <label htmlFor="">reenter password</label><br />
            <input value={repassword} onChange={
                (event) => {
                    setRepassword(event.target.value)
                }

            } type="password" /> <br />
            <input type="submit" value="Signup" />
        </form> */}
        <form onSubmit={signuphandler} className="company-signup-form">
  <h1 className="form-title">Company Signup</h1>

  <label>Company Name</label>
  <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Enter company name"
    required
  />

  <label>Email</label>
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Enter email"
    required
  />

  <label>Phone Number</label>
  <input
    type="tel"
    value={phonenumber}
    onChange={(e) => setPhonenumber(e.target.value)}
    placeholder="Enter phone number"
    pattern="[0-9]{10}"
    required
  />

  <label>Password</label>
  <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Enter password"
    required
  />

  <label>Re-enter Password</label>
  <input
    type="password"
    value={repassword}
    onChange={(e) => setRepassword(e.target.value)}
    placeholder="Re-enter password"
    required
  />

  <input type="submit" value="Signup" className="submit-btn" />
</form>

        </>
    )
}
