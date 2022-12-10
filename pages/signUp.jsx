import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase";
import InputForm from "../components/atoms/InputForm";
import FormButton from "../components/atoms/button/FormButton";
import { signUpUser } from "../lib/api/user";
import { useFormContext } from "react-hook-form";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const SignUp = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [newUser, setNewUser] = useState({
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
    setNewUser({ ...newUser, [name]: value });
  };

  const handleonSubmit = () => {
    const request = async () => {
      await signUpEmail();
      if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken(true);
        const config = { token };
        try {
          await signUpUser(config);
          router.push("/users");
        } catch (e) {
          console.log(e);
        }
      }
    };
    request();
  };

  const signUpEmail = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );
      await updateProfile(auth.currentUser, {
        displayName: newUser.name,
      });
      console.log(auth.currentUser.displayName);
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
            <Heading as="h1" fontSize="5xl" color="cyan.600" textAlign="center">
              SignUp
            </Heading>

            {error && <Text>{error}</Text>}
            <form onSubmit={handleSubmit(handleonSubmit)}>
              <Stack spacing={2}>
                <InputForm
                  title="name"
                  type="text"
                  handleChange={handleChange}
                />
                {errors.name && <Text>nameを入力してください</Text>}
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
                  SignUp
                </FormButton>
              </Box>
            </form>
            <HStack textAlign="center">
              <InfoIcon color="cyan.600" fontSize="md" />
              <Text fontSize="md" color="gray.600">
                名前、メールアドレス、パスワードを入力して新規登録してください!
              </Text>
            </HStack>
          </Stack>
        </Box>
      </Flex>
    </>
  );
};

export default SignUp;
