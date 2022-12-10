import React, { useEffect, useState } from "react";
import { countLike, createLike, deleteLike, getLike } from "../../lib/api/like";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { Box, Flex } from "@chakra-ui/react";

const Like = (props) => {
  const { postId, userId } = props;
  const [good, setGood] = useState({});
  const [goodCount, setGoodCount] = useState("");

  useEffect(() => {
    const getLikes = async () => {
      try {
        const params = { post_id: postId, user_id: userId };
        const res = await getLike(params);
        console.log(res.data.data);
        setGood(res.data.data);
        const count = await countLike(postId);
        console.log(count.data);
        setGoodCount(count.data);
      } catch (e) {
        console.log(e);
      }
    };
    getLikes();
  }, []);

  const like = async () => {
    try {
      const params = { post_id: postId, user_id: userId };
      const res = await createLike(params);
      await getLike(params);
      setGood(res.data.data);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteGood = async (id) => {
    try {
      const res = await deleteLike(id);
      setGood("");
      setGoodCount(goodCount);
      console.log(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {good ? (
        <Flex align="center">
          <FontAwesomeIcon
            icon={fasHeart}
            onClick={() => deleteGood(good.id)}
            style={{ color: "red", cursor: "pointer" }}
          />
          <>{goodCount}</>
        </Flex>
      ) : (
        <Flex align="center">
          <FontAwesomeIcon
            icon={farHeart}
            onClick={like}
            style={{ cursor: "pointer" }}
          />
          <>{goodCount}</>
        </Flex>
      )}
    </>
  );
};

export default Like;
