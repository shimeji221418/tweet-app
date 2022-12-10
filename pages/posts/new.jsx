import { AddIcon, InfoIcon } from "@chakra-ui/icons";
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
import FormButton from "../../components/atoms/button/FormButton";
import PrimaryButton from "../../components/atoms/button/PrimaryButton";
import InputForm from "../../components/atoms/InputForm";
import TextArea from "../../components/atoms/TextArea";
import { app } from "../../firebase";
import { createPost } from "../../lib/api/post";
import { getCurrentUser } from "../../lib/api/user";

const New = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState("");
  const [post, setPost] = useState({
    title: "",
    body: "",
    user_id: "",
    image: "",
  });

  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setPost({ ...post, [name]: value });
  };

  const uploadImage = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setPost({ ...post, [name]: file });
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const createFormData = () => {
    const formData = new FormData();

    formData.append("post[title]", post.title);
    formData.append("post[body]", post.body);
    formData.append("post[image]", post.image ? post.image : "");
    formData.append("user_id", post.user_id);

    return formData;
  };

  const handleonSubmit = async () => {
    try {
      const currentUser = auth.currentUser;
      const token = await currentUser.getIdToken(true);
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
          "Context-Type": "multipart/form-data",
        },
      };
      const data = createFormData();
      const res = await createPost(data, config);
      router.push("/posts");
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getUserList = async () => {
      try {
        const currentUser = auth.currentUser;
        const token = await currentUser.getIdToken(true);
        const config = {
          headers: { authorization: `Bearer ${token}` },
          params: { uid: currentUser.uid },
        };
        const res = await getCurrentUser(config);
        setUser(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (e) {
        console.log(e.errors);
      }
    };
    getUserList();
  }, []);

  useEffect(() => {
    setPost({ ...post, user_id: user.id });
    console.log(post);
  }, [user]);

  return (
    <>
      {!loading && (
        <Flex align="start" justify="center" h="100vh">
          <Box w="lg" bg="white" borderRadius="md" shadow="lg" mt={4}>
            <Stack spacing={6} px={10} pt={10} pb={2}>
              <HStack align="center" justify="center" display="flex">
                <AddIcon color="cyan.600" fontSize="2xl" />
                <Heading
                  as="h1"
                  fontSize="5xl"
                  color="cyan.600"
                  textAlign="center"
                >
                  New Post
                </Heading>
              </HStack>
              <form onSubmit={handleSubmit(handleonSubmit)}>
                <Stack spacing={3}>
                  <InputForm
                    title="title"
                    type="text"
                    handleChange={handleChange}
                  />
                  {errors.title && <p>titleを入力してください</p>}
                  <TextArea
                    title="body"
                    placeholder="投稿を入力してください"
                    handleChange={handleChange}
                  />
                  {errors.body && <Text>投稿を入力してください</Text>}
                  <Input
                    id="image"
                    name="image"
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
                        width="30%"
                        height="30%"
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
                  <FormButton type="submit">Post</FormButton>
                  <PrimaryButton
                    color="red"
                    fontcolor="white"
                    onClick={() => router.push("/posts")}
                  >
                    Back
                  </PrimaryButton>
                </Box>
              </form>
              <HStack textAlign="center">
                <InfoIcon color="cyan.600" fontSize="md" />
                <Text fontSize="md" color="gray.600">
                  タイトル、本文を入力し投稿しましょう。写真も追加できます。
                </Text>
              </HStack>
            </Stack>
          </Box>
        </Flex>
      )}
    </>
  );
};
export default New;
