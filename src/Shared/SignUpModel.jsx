import { FcGoogle } from "react-icons/fc";

const SignUpModel = ({ closeModal, handlerCreateUser, handleGoogleLogin }) => {
  return (
    <div>
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
    </div>
  );
};

export default SignUpModel;