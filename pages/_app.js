import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { LoginUser } from "../components/templates/LoginUser";
import { NotLoginUser } from "../components/templates/NotLoginUser";
import { AuthProvider } from "../provider/AuthProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const methods = useForm();
  if (router.pathname === "/Login" || router.pathname === "/signUp") {
    return (
      <AuthProvider>
        <LoginUser>
          <FormProvider {...methods}>
            <Component {...pageProps} />
          </FormProvider>
        </LoginUser>
      </AuthProvider>
    );
  } else {
    return (
      <AuthProvider>
        <NotLoginUser>
          <FormProvider {...methods}>
            <Component {...pageProps} />
          </FormProvider>
        </NotLoginUser>
      </AuthProvider>
    );
  }
}

export default MyApp;
