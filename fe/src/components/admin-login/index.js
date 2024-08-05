import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../store/userSlice";
import * as yup from "yup";
import Layout from "../layout";
import { useNavigate } from "react-router";
import { ROUTES } from "../../router";

const style = {
  width: "500px",
  background: "#FFFFFF",
  padding: "30px",
  borderRadius: "16px",
  fontSize: "20px",
  fontWeight: 500,
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  alignItems: "center",
};

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    dispatch(loginAdmin({ ...values })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        localStorage.setItem('token', res.payload.token)
        toast.success("Login successfully.");
        navigate(ROUTES.dashboard);
      }
    });
  };

  return (
    <Layout>
      <Box component="section">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper elevation={3} gap={4} sx={{ ...style }}>
            <Typography variant="h5">ADMIN LOGIN</Typography>
            <Grid container gap={4} sx={{ paddingTop: "20px" }}>
              <Grid item sm={12}>
                <TextField
                  sx={{ width: "100%" }}
                  {...register("email")}
                  label="Email *"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  sx={{ width: "100%" }}
                  {...register("password")}
                  label="Password *"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                marginTop: "40px",
                borderTop: "1px solid #b3b3b3",
                padding: "20px 20px 0 20px",
                display: "flex",
                flexDirection: "row",
                gap: "80px",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button variant="contained" type="submit" disabled={isLoading}>
                Submit
              </Button>
            </Box>
          </Paper>
        </form>
      </Box>
    </Layout>
  );
};

export default AdminLogin;
