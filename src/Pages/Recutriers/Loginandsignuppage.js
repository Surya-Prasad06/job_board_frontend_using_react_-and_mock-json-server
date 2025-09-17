import axios from "axios";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Loginandsignuppage = () => {
    const isAuthenticated = !!sessionStorage.getItem("companyId");

    const [isLogined, setIsLogined] = useState(true);
    if (isAuthenticated) {
        return <Navigate to="/companypage" />;
    }



    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                <div className="card shadow p-4">
                    {isLogined ? (
                        <>
                            {/* Login Form */}
                            <h3 className="text-center mb-4">Login</h3>
                            <Loginform />

                            <div className="text-center mt-3">
                                <span className="text-muted">Don’t have an account?</span>
                                <button
                                    onClick={() => setIsLogined(false)}
                                    className="btn btn-link p-0 ms-1"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Sign Up Form */}
                            <h3 className="text-center mb-4">Sign Up</h3>
                            <SignUpform />

                            <div className="text-center mt-3">
                                <span className="text-muted">Already have an account?</span>
                                <button
                                    onClick={() => setIsLogined(true)}
                                    className="btn btn-link p-0 ms-1"
                                >
                                    Login
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>


    );
};

export default Loginandsignuppage;




const Loginform = () => {
    const [identifier, setIdentifier] = useState(""); // email or phone
    const API_URL = process.env.REACT_APP_API_URL;
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginsubmit = (e) => {
        e.preventDefault();
        axios.get(`${API_URL}/users`)
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

        <form onSubmit={loginsubmit} className="card p-4 shadow-sm">
            {/* Email or Phone */}
            <div className="mb-3">
                <label className="form-label">Email or Phone Number</label>
                <input
                    type="text"
                    className="form-control"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    placeholder="Enter email or phone"
                />
            </div>

            {/* Password */}
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter password"
                />
            </div>

            {/* Submit */}
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </div>
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
const API_URL = process.env.REACT_APP_API_URL;
    const signuphandler = (e) => {
        e.preventDefault();
        if (password.length >= 8 && repassword === password) {

            axios.post(`${API_URL}/users`, { name, phonenumber, password, email })
                .then((response) => {
                   
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
            {/* <form onSubmit={signuphandler} className="company-signup-form">
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
            </form> */}

            <form onSubmit={signuphandler} className="card p-4 shadow-sm">
                <h2 className="text-center mb-4">Company Signup</h2>

                {/* Company Name */}
                <div className="mb-3">
                    <label className="form-label">Company Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter company name"
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
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                    />
                </div>

                {/* Phone Number */}
                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                        placeholder="Enter phone number"
                        pattern="[0-9]{10}"
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
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                </div>

                {/* Re-enter Password */}
                <div className="mb-3">
                    <label className="form-label">Re-enter Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={repassword}
                        onChange={(e) => setRepassword(e.target.value)}
                        placeholder="Re-enter password"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                    <button type="submit" className="btn btn-success">
                        Signup
                    </button>
                </div>
            </form>

        </>
    )
}
