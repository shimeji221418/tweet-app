import { EditIcon, InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import FormButton from "../../../components/atoms/button/FormButton";
import PrimaryButton from "../../../components/atoms/button/PrimaryButton";
import InputForm from "../../../components/atoms/InputForm";
import { app } from "../../../firebase";
import { getSelectUser, updateUser } from "../../../lib/api/user";

const Edit = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    uid: "",
    icon: "",
  });
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setEditUser({ ...editUser, [name]: value });
    console.log(editUser);
  };

  const uploadImage = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setEditUser({ ...editUser, [name]: file });
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const createFormData = () => {
    const formData = new FormData();

    formData.append("user[name]", editUser.name);
    formData.append("user[icon]", editUser.icon ? editUser.icon : "");

    return formData;
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        if (router.isReady) {
          const routeId = router.query.id;
          const currentUser = auth.currentUser;
          const token = await currentUser.getIdToken(true);
          const config = { headers: { authorization: `Bearer ${token}` } };
          const res = await getSelectUser(routeId, config);
          if (auth.currentUser.uid !== res.data.uid) {
            router.replace("/users");
          }
          setEditUser({
            name: res.data.name,
            email: res.data.email,
            uid: res.data.uid,
            icon: res.data.icon,
          });
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const handleonSubmit = async () => {
    try {
      const id = router.query.id;
      const currentUser = auth.currentUser;
      const token = await currentUser.getIdToken(true);
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
          "Context-Type": "multipart/form-data",
        },
      };
      const data = createFormData();
      const res = await updateUser(id, data, config);
      console.log(res.data);
      router.push("/users");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {!loading && (
        <Flex align="start" justify="center" h="100vh">
          <Box w="lg" bg="white" borderRadius="md" shadow="lg" mt={4}>
            <Stack spacing={8} px={10} pt={10} pb={2}>
              <HStack align="center" justify="center" display="flex">
                <Heading
                  as="h1"
                  fontSize="5xl"
                  color="cyan.600"
                  textAlign="center"
                >
                  Edit User
                </Heading>
                <EditIcon color="cyan.600" fontSize="xl" />
              </HStack>
              <form onSubmit={handleSubmit(handleonSubmit)}>
                <Stack spacing={5}>
                  <InputForm
                    title="name"
                    type="text"
                    value={editUser.name}
                    handleChange={handleChange}
                  />
                  {errors.name && <Text>nameを入力してください</Text>}
                  <Input
                    id="icon"
                    name="icon"
                    type="file"
                    variant="unstyled"
                    onChange={uploadImage}
                  />
                  {preview && (
                    <Box>
                      <Text>preview</Text>
                      <Image
                        src={preview}
                        alt="preview img"
                        width="100px"
                        height="100px"
                        borderRadius="full"
                      />
                    </Box>
                  )}
                </Stack>
                <Box
                  mt={6}
                  justifyContent="center"
                  alignItems="center"
                  display="flex"
                >
                  <PrimaryButton
                    color="red"
                    fontcolor="white"
                    onClick={() => router.push("/users")}
                  >
                    Back
                  </PrimaryButton>
                  <FormButton type="submit">Edit</FormButton>
                </Box>
              </form>
              <HStack textAlign="center">
                <InfoIcon color="cyan.600" fontSize="md" />
                <Text fontSize="md" color="gray.600">
                  ユーザー名、アイコンを入力し編集を行ってください。
                </Text>
              </HStack>
            </Stack>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default Edit;
