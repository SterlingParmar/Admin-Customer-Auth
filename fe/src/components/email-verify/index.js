import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router";
import Layout from "../layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyUserEmail } from "../../store/userSlice";
import { toast } from "react-toastify";
import { ROUTES } from "../../router";

const style = {
  width: "100%",
  height: "100px",
  background: "#FFFFFF",
  padding: "30px",
  borderRadius: "16px",
  fontSize: "30px",
  fontWeight: 700,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
};

const EmailVerify = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.search) {
      const token = location.search.replace("?token=", "");
      dispatch(verifyUserEmail(token)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("User verified");
        } else {
          toast.error(res?.error?.message);
        }
        navigate(ROUTES.dashboard);
      });
    }
  }, [dispatch, location.search, navigate]);

  return (
    <Layout>
      <Box component="section" sx={{ display: "flex", gap: "48px" }}>
        <Paper elevation={3} sx={{ ...style }}>
          Email verification in process ....
        </Paper>
      </Box>
    </Layout>
  );
};

export default EmailVerify;
