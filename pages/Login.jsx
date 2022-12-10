import { InfoIcon, LockIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import FormButton from "../components/atoms/button/FormButton";
import InputForm from "../components/atoms/InputForm";
import { app } from "../firebase";

const Login = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [loginUser, setLoginUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setLoginUser({ ...loginUser, [name]: value });
  };

  const handleonSubmit = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        loginUser.email,
        loginUser.password
      );
      router.push("/");
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };
  return (
    <>
      <Flex align="center" justify="center" h="100vh">
        <Box w="lg" bg="white" borderRadius="md" shadow="md">
          <Stack spacing={8} px={10} pt={10} pb={2}>
            <HStack justify="center">
              <Heading as="h1" fontSize="5xl" color="cyan.600">
                Tweet-up
              </Heading>
              <LockIcon color="cyan.600" fontSize="4xl" />
            </HStack>
            {error && <Text>{error}</Text>}
            <form onSubmit={handleSubmit(handleonSubmit)}>
              <Stack spacing={2}>
                <InputForm
                  title="email"
                  type="text"
                  handleChange={handleChange}
                />
                {errors.email && <Text>emailを入力してください</Text>}
                <InputForm
                  title="password"
                  type="password"
                  handleChange={handleChange}
                />
              </Stack>
              {errors.password && <Text>passwordを入力してください</Text>}
              <Box
                mt={6}
                justifyContent="center"
                alignItems="center"
                display="flex"
              >
                <FormButton type="submit" size="lg">
                  Login
                </FormButton>
              </Box>
            </form>
            <HStack>
              <InfoIcon color="cyan.600" fontSize="md" />
              <Text fontSize="lg" color="gray.600">
                ユーザー登録が済んでいない方は
                <Link
                  color="cyan.400"
                  fontSize="xl"
                  fontWeight="bold"
                  href="/signUp"
                >
                  こちら
                </Link>
                から
              </Text>
            </HStack>
          </Stack>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
