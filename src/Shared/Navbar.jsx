import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Navbar = () => {
  const { user, createUser, createUserGoogle, userLogin, userSignOut } =
    useContext(AuthContext);

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
        // closeModal2();
        // closeModal();
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
      <dialog id="sign_up_modal" className="modal">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeModal}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Sign Up</h3>
          <form onSubmit={handlerCreateUser} className="py-4" method="dialog">
            <div className="form-control">
              <label htmlFor="username" className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                name="name"
                id="username"
                type="text"
                placeholder="Enter your username"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-4">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                id="email"
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-4">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                id="password"
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-4">
              <button
                type="submit"
                className="btn text-white bg-[#0F42AB] hover:bg-[#0F42AB]"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="flex justify-center items-center">
            <button
              className="btn btn-primary  mt-4"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="mr-2" /> Sign in with Google
            </button>
            <p></p>
          </div>
        </div>
      </dialog>
      {/* Sign In Modal */}
      <dialog id="sign_in_modal" className="modal">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeModal2}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Sign In</h3>
          <form onSubmit={handleLogin} className="py-4" method="dialog">
            <div className="form-control mt-4">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                id="email"
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-4">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                id="password"
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-4">
              <button
                type="submit"
                className="btn text-white bg-[#0F42AB] hover:bg-[#0F42AB]"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="flex justify-center items-center">
            <button
              className="btn btn-primary  mt-4"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="mr-2" /> Sign in with Google
            </button>
            <p></p>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Navbar;
