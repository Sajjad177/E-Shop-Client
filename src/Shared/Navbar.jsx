import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import SignUpModel from "./SignUpModel";
import SignInModel from "./SignInModel";

const Navbar = () => {
  const { user, createUser, createUserGoogle, userLogin, userSignOut } =
    useContext(AuthContext);

  console.log(user);
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
    // const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          toast.success("Successfully Signed Up");
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
        console.log("Google Sign-In successful:", user);
        toast.success("Successfully Signed In with Google");
      })
      .catch((err) => {
        console.error("Google Sign-In error:", err);
        toast.error(`Google Sign-In failed: ${err.message}`);
      });
  };

  const logOut = () => {
    userSignOut().then(() => {
      toast.success("Successfully Signed Out");
    });
  };
  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/">Shop</Link>
      </li>
      <li>
        <Link to="/">About Us</Link>
      </li>
      <li>
        <Link to="/">Contact Us</Link>
      </li>
    </>
  );

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-base-200">
        <div className="navbar container mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
              </div>
              <ul
                tabIndex={0}
                className="menu font-bold menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>
            {/* <Link to="/">
              <img className="w-24 h-24" src="./logo.png" alt="Logo" />
            </Link> */}
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu font-bold menu-horizontal px-1">{links}</ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <button
                onClick={logOut}
                className="bg-[#0F42AB] text-white btn transition-all hover:bg-[#0e4ed0]"
              >
                Sign Out
              </button>
            ) : (
              <>
                <button
                  onClick={openModal2}
                  className="bg-[#0F42AB] text-white btn transition-all hover:bg-[#0e4ed0]"
                >
                  Sign In
                </button>
                <button
                  onClick={openModal}
                  className="bg-[#0F42AB] text-white btn transition-all hover:bg-[#0e4ed0]"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>

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
  );
};

export default Navbar;
