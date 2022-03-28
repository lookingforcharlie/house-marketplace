import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    console.log(e.target.id);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // https://firebase.google.com/docs/auth/web/start?hl=en&authuser=1#sign_up_new_users
    try {
      const auth = getAuth();

      // createUserWithEmailAndPassword returns a promise
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      // prepare formDataCopy to update it into the database
      const formDataCopy = { ...formData };
      // we don't want password put in the database
      delete formDataCopy.password;
      // add timestamp property to the object
      formDataCopy.timestamp = serverTimestamp();

      // https://firebase.google.com/docs/firestore/manage-data/add-data#set_a_document
      // setDoc will update the database, put users into users collection
      // db is we imported from firebase config, users is the name of the collection in the database
      // get user id from userCredential
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome back</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type='text'
            className='nameInput'
            placeholder='Name'
            id='name'
            value={name}
            onChange={onChange}
          />
          <input
            type='email'
            className='emailInput'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
          />
          <div className='passwordInputDiv'>
            <input
              type={showPassword ? "text" : "password"}
              className='passwordInput'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
            />
            <img
              src={visibilityIcon}
              alt='show password'
              className='showPassword'
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <Link to='/forgot-psw' className='forgotPasswordLink'>
            Forgot Password
          </Link>

          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        {/* Google OAuth */}

        <Link to='/sign-in' className='registerLink'>
          Sign In Instead
        </Link>
      </div>
    </>
  );
}

export default SignUp;
