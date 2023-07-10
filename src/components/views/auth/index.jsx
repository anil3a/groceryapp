import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pageType, setPageType] = useState("");

    const navigate = useNavigate();

    const redirect_to = (url = '/home') => {
        navigate(url);
    }

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                // const user = userCredential.user;
                redirect_to();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                // const user = userCredential.user;
                redirect_to()
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            })
    }

    return (
        <div className="login-page">
            <h1 className="d-flex w-100 p-4 d-flex justify-content-center pb-4">Welcome to Jhigu Grocery</h1>
            <div className="d-flex w-100 p-4 d-flex justify-content-center pb-4">
                <form>
                    <div className="card">
                        <div className="text-center card-title">
                            {pageType === "signup" ?
                                <h3>Sign Up</h3>
                                :
                                <h3>Log In</h3>
                            }
                        </div>
                        <div className="card-body">
                            {/* <!-- Email input --> */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form2Example1">Email address</label>
                                <input type="email" id="form2Example1" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}  />
                            </div>

                            {/* <!-- Password input --> */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form2Example2">Password</label>
                                <input type="password" id="form2Example2" className="form-control"  value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            {pageType === "signup" ?
                                <button type="button" className="btn btn-primary btn-block mb-4"  onClick={onSubmit}>Sign up</button>
                                :
                                <button type="button" className="btn btn-primary btn-block mb-4"  onClick={onLogin}>Sign in</button>
                            }
                        </div>
                    </div>
                </form>
            </div>
            <div className="d-flex w-100 p-4 d-flex justify-content-center pb-4">
                {pageType === "signup" ?
                    <div className="text-center">
                        <p>Already have an account? <button className="btn btn-primary" onClick={() => setPageType("login")}>Log in</button></p>
                    </div>
                    :
                    <div className="text-center">
                        <p>Don't have an account? <button className="btn btn-primary" onClick={() => setPageType("signup")}>Sign up</button></p>
                    </div>
                }
            </div>   
        </div>
    )

}

export default Auth;