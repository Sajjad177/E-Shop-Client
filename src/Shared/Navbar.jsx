import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import SignUpModel from "./SignUpModel";
import SignInModel from "./SignInModel";

const Navbar = () => {
  const { createUser, createUserGoogle, userLogin, userSignOut } =
    useContext(AuthContext);
  const [storedEmail, setStoredEmail] = useState(null);

  // Check localStorage for user email :
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setStoredEmail(email);
    }
  }, []);

  const openModal = () => {
    document.getElementById("sign_up_modal").showModal();
  };

  const closeModal = () => {
    document.getElementById("sign_up_modal").close();
  };

  const openModal2 = () => {
    document.getElementById("sign_in_modal").showModal();
  };

  const closeModal2 = () => {
    document.getElementById("sign_in_modal").close();
  };

  const handlerCreateUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          toast.success("Successfully Signed Up");
          localStorage.setItem("userEmail", email);
          setStoredEmail(email);
        }
        form.reset();
        closeModal();
      })
      .catch((err) => {
        if (err) {
          toast.error(`${err.message}`);
        }
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          toast.success("Successfully Signed In");
          localStorage.setItem("userEmail", email);
          setStoredEmail(email);
        }
        form.reset();
        closeModal2();
      })
      .catch((err) => {
        if (err) {
          toast.error(`${err.message}`);
        }
      });
  };

  const handleGoogleLogin = () => {
    createUserGoogle()
      .then((result) => {
        const user = result.user;
        if (user) {
          const email = user.email;
          toast.success("Successfully Signed In with Google");
          localStorage.setItem("userEmail", email);
          setStoredEmail(email);
        }
      })
      .catch((err) => {
        toast.error(`Google Sign-In failed: ${err.message}`);
      });
  };

  const logOut = () => {
    userSignOut().then(() => {
      toast.success("Successfully Signed Out");
      localStorage.removeItem("userEmail");
      setStoredEmail(null);
    });
  };

  const links = (
    <>
      <li className="hover:text-blue-600 transition-colors duration-300">
        <Link to="/">Home</Link>
      </li>
      <li className="hover:text-blue-600 transition-colors duration-300">
        <Link to="/">Shop</Link>
      </li>
      <li className="hover:text-blue-600 transition-colors duration-300">
        <Link to="/">About Us</Link>
      </li>
      <li className="hover:text-blue-600 transition-colors duration-300">
        <Link to="/">Contact Us</Link>
      </li>
    </>
  );

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-base-200 border-b-2 shadow-lg">
        <div className="navbar container mx-auto flex justify-between items-center py-4">
          <div className="navbar-start">
            <div className="dropdown">
              <button
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow-lg transition duration-300 ease-in-out z-10"
              >
                {links}
              </ul>
            </div>
            <div>
              <img
                src="https://i.ibb.co/y4VtN9x/c6031e24c7f123cbfda1245a81eb75b2.png"
                alt=""
                className="h-14"
              />
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal space-x-6">{links}</ul>
          </div>
          <div className="navbar-end flex items-center space-x-4">
            {storedEmail ? (
              <button
                onClick={logOut}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                Sign Out
              </button>
            ) : (
              <>
                <button
                  onClick={openModal2}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                  Sign In
                </button>
                <button
                  onClick={openModal}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {!storedEmail && (
        <>
          {/* Sign Up Modal */}
          <SignUpModel
            closeModal={closeModal}
            handlerCreateUser={handlerCreateUser}
            handleGoogleLogin={handleGoogleLogin}
          />

          {/* Sign In Modal */}
          <SignInModel
            closeModal2={closeModal2}
            handleLogin={handleLogin}
            handleGoogleLogin={handleGoogleLogin}
          />
        </>
      )}
    </>
  );
};

export default Navbar;
