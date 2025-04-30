import { Route, Routes } from "react-router-dom";
import SignInForm from "./_auth/forms/SignInForm";
import SignUpForm from "./_auth/forms/SignUpForm";
import Home from "./_root/Pages/Home";
import RootLayout from "./_root/RootLayout";
import Authlayout from "./_auth/Authlayout";
import "./index.css";

function App() {
  return (
    <>
      <main className="flex h-screen">
        <Routes>
          {/*public routes */}
          <Route element={<Authlayout></Authlayout>}>
            <Route path="/signin" element={<SignInForm></SignInForm>} />
            <Route path="/signup" element={<SignUpForm></SignUpForm>} />
          </Route>

          {/*private routes */}
          <Route element={<RootLayout />}>
            <Route index element={<Home></Home>} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
