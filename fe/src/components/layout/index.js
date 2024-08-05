import { Box } from "@mui/material";
import Header from "../header";

const Layout = ({ children, isLoggedIn = false }) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Box
        sx={{
          height: "100%",
          padding: "70px 400px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
