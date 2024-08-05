import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import router from "./router";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer
          hideProgressBar={true}
          autoClose={2000}
          type="success"
          position="top-center"
        />
      </Provider>
    </div>
  );
}

export default App;
