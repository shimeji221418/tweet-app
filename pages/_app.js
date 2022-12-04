import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import HeaderLayout from "../components/templates/HeaderLayout";
import { LoginUser } from "../components/templates/LoginUser";
import { NotLoginUser } from "../components/templates/NotLoginUser";
import { AuthProvider } from "../provider/AuthProvider";
import theme from "../theme/theme";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const methods = useForm();
  if (router.pathname === "/Login" || router.pathname === "/signUp") {
    return (
      <AuthProvider>
        <LoginUser>
          <FormProvider {...methods}>
            <ChakraProvider theme={theme}>
              <Component {...pageProps} />
            </ChakraProvider>
          </FormProvider>
        </LoginUser>
      </AuthProvider>
    );
  } else {
    return (
      <AuthProvider>
        <NotLoginUser>
          <FormProvider {...methods}>
            <ChakraProvider theme={theme}>
              <HeaderLayout>
                <Component {...pageProps} />
              </HeaderLayout>
            </ChakraProvider>
          </FormProvider>
        </NotLoginUser>
      </AuthProvider>
    );
  }
}

export default MyApp;
