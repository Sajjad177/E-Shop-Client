// import PropTypes from "prop-types";
// import { Navigate, useLocation } from "react-router-dom";
// import useAuth from "../Hook/useAuth";
// import Loader from "../Components/Loader";

// const PrivateRoute = ({ children }) => {
//   const { user, loading } = useAuth();
//   const location = useLocation();

//   if (loading) return <Loader />;
//   if (user) return children;
//   return <Navigate to="/login" state={location.pathname} replace="true" />;
// };

// PrivateRoute.propTypes = {
//   children: PropTypes.element,
// };

// export default PrivateRoute;
