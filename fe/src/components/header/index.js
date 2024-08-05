import { Box, Button } from "@mui/material";
import { ROUTES } from "../../router";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

const Header = ({ isLoggedIn = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        background: "#FFFFFF",
        height: "70px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0 70px",
        gap: "24px",
        borderBottom: "1px solid #b3b3b3",
      }}
    >
      <Button onClick={() => navigate(ROUTES.dashboard)} variant="outlined">
        Home
      </Button>
      {isLoggedIn && (
        <Button
          onClick={() => {
            localStorage.clear();
            dispatch(
              setUser({
                id: null,
                first_name: "",
                last_name: "",
                email: "",
                is_admin: null,
              })
            );
            navigate(ROUTES.admin_login);
          }}
          variant="outlined"
        >
          Log out
        </Button>
      )}
      {/* <Button variant="outlined">Login</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="outlined">Outlined</Button> */}
    </Box>
  );
};

export default Header;
