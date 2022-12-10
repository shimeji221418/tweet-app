import { Box, Image, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";

const UserCard = (props) => {
  const { imageUrl, userName, id } = props;
  return (
    <>
      <Box h="300px" w="240px" borderRadius="md" shadow="md" p={4} bg="gray.50">
        <Stack textAlign="center" spacing={5}>
          <Image
            src={imageUrl}
            boxSize="150px"
            alt="userImage"
            borderRadius="full"
            m="auto"
          />
          <Text fontSize="2xl" fontWeight="bold">
            <Link href={`/users/${id}`}>{userName}</Link>
          </Text>
        </Stack>
      </Box>
    </>
  );
};

export default UserCard;
