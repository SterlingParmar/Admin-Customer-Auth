import { Button, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router";
import { ROUTES } from "../../router";
import Layout from "../layout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const style = {
  width: "100%",
  height: "200px",
  background: "#FFFFFF",
  padding: "30px",
  borderRadius: "16px",
  color: "#FFFFFF",
  fontSize: "30px",
  fontWeight: 700,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);
  }, []);

  return (
    <Layout isLoggedIn={isLoggedIn}>
      {!loading && (
        <>
          {!isLoggedIn ? (
            <Box component="section" sx={{ display: "flex", gap: "180px" }}>
              <Paper elevation={3} sx={{ ...style, background: "#3ca9dd" }}>
                ADMIN
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    gap: "80px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      background: "#FFF",
                      color: "#3ca9dd",
                      fontSize: "20px",
                      fontWeight: 500,
                      "&:hover": { background: "#dddddd" },
                    }}
                    onClick={() => navigate(ROUTES.admin_registration)}
                  >
                    Sign Up
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      background: "#FFF",
                      color: "#3ca9dd",
                      fontSize: "20px",
                      fontWeight: 500,
                      "&:hover": { background: "#dddddd" },
                    }}
                    onClick={() => navigate(ROUTES.admin_login)}
                  >
                    Login
                  </Button>
                </Box>
              </Paper>
              <Paper elevation={3} sx={{ ...style, background: "#008ccf" }}>
                CUSTOMER
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    gap: "80px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      background: "#FFF",
                      color: "#008ccf",
                      fontSize: "20px",
                      fontWeight: 500,
                      "&:hover": { background: "#dddddd" },
                    }}
                    onClick={() => navigate(ROUTES.customer_registration)}
                  >
                    Sign Up
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      background: "#FFF",
                      color: "#008ccf",
                      fontSize: "20px",
                      fontWeight: 500,
                      "&:hover": { background: "#dddddd" },
                      "&:disabled": { background: "#d1d1d1" },
                    }}
                    disabled
                  >
                    Login
                  </Button>
                </Box>
              </Paper>
            </Box>
          ) : (
            <Box component="section" sx={{ display: "flex", gap: "48px" }}>
              <Paper
                elevation={3}
                sx={{ ...style, height: "100px", background: "#3ca9dd" }}
              >
                Welcome {data.first_name} {data.last_name} !
              </Paper>
            </Box>
          )}
        </>
      )}
    </Layout>
  );
};

export default Dashboard;
