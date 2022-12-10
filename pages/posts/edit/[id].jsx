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
import TextArea from "../../../components/atoms/TextArea";
import { app } from "../../../firebase";
import { getSelectPost, updatePost } from "../../../lib/api/post";

const EditPost = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [editPost, setEditPost] = useState({
    title: "",
    body: "",
    image: "",
  });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setEditPost({ ...editPost, [name]: value });
    console.log(editPost);
  };

  const uploadImage = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setEditPost({ ...editPost, [name]: file });
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const createFormData = () => {
    const formData = new FormData();

    formData.append("post[title]", editPost.title);
    formData.append("post[body]", editPost.body);
    formData.append("post[image]", editPost.image ? editPost.image : "");

    return formData;
  };

  const handleonSubmit = async () => {
    try {
      const routeId = router.query.id;
      const currentUser = auth.currentUser;
      const token = await currentUser.getIdToken(true);
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
          "Context-Type": "multipart/form-data",
        },
      };
      const data = createFormData();
      const res = await updatePost(routeId, data, config);
      router.push("/posts");
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        if (router.isReady) {
          const routeId = router.query.id;
          const currentUser = auth.currentUser;
          const token = await currentUser.getIdToken(true);
          const config = { headers: { authorization: `Bearer ${token}` } };
          const res = await getSelectPost(routeId, config);
          setEditPost({
            title: res.data.title,
            body: res.data.body,
            image: res.data.image,
          });
          console.log(res.data);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    getPost();
  }, []);
  return (
    <>
      <h1>EditPost</h1>
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
                  Edit Post
                </Heading>
                <EditIcon color="cyan.600" fontSize="xl" />
              </HStack>
              <form onSubmit={handleSubmit(handleonSubmit)}>
                <Stack spacing={5}>
                  <InputForm
                    title="title"
                    type="text"
                    value={editPost.title}
                    handleChange={handleChange}
                  />
                  {errors.title && <Text>nameを入力してください</Text>}
                  <TextArea
                    title="body"
                    value={editPost.body}
                    handleChange={handleChange}
                  />
                  {errors.body && <p>本文を入力してください</p>}
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
                  <PrimaryButton
                    color="red"
                    onClick={() => router.push(`/posts/${router.query.id}`)}
                  >
                    Back
                  </PrimaryButton>
                  <FormButton type="submit">Edit</FormButton>
                </Box>
              </form>
              <HStack textAlign="center">
                <InfoIcon color="cyan.600" fontSize="md" />
                <Text fontSize="md" color="gray.600">
                  タイトル、本文を入力し編集を行ってください。画像の追加が可能です。
                </Text>
              </HStack>
            </Stack>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default EditPost;
