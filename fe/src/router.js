import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/dashboard";
import AdminRegistration from "./components/admin-registration";
import CustomerRegistration from "./components/customer-registration";
import AdminLogin from "./components/admin-login";
import EmailVerify from "./components/email-verify";

export const ROUTES = {
  dashboard: "/",
  admin_login: "/admin-login",
  admin_registration: "/admin-registration",
  customer_registration: "/customer-registration",
  verify_email: "/verify-email",
};

const router = createBrowserRouter([
  {
    path: ROUTES.dashboard,
    element: <Dashboard />,
  },
  {
    path: ROUTES.admin_login,
    element: <AdminLogin />,
  },
  {
    path: ROUTES.admin_registration,
    element: <AdminRegistration />,
  },
  {
    path: ROUTES.customer_registration,
    element: <CustomerRegistration />,
  },
  {
    path: ROUTES.verify_email,
    element: <EmailVerify />,
  },
]);

export default router;
