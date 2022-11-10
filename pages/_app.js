import { useRouter } from "next/router";
import { LoginUser } from "../components/templates/LoginUser";
import { NotLoginUser } from "../components/templates/NotLoginUser";
import { AuthProvider } from "../provider/AuthProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  if (router.pathname === "/Login" || router.pathname === "/signUp") {
    return (
      <AuthProvider>
        <LoginUser>
          <Component {...pageProps} />
        </LoginUser>
      </AuthProvider>
    );
  } else {
    return (
      <AuthProvider>
        <NotLoginUser>
          <Component {...pageProps} />
        </NotLoginUser>
      </AuthProvider>
    );
  }
}

export default MyApp;
