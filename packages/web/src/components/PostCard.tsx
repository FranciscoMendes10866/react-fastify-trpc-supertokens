import { FC, useCallback } from "react";
import { Box, Text, Button, Stack } from "@chakra-ui/react";

import { trpc } from "../utils/trpc";

interface IProps {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

export const PostCard: FC<IProps> = ({ id, title, content }) => {
  const utils = trpc.useContext();

  const { mutateAsync } = trpc.deletePost.useMutation({
    onSuccess: () => {
      utils.getPosts.invalidate();
    },
  });

  const onDeleteHandler = useCallback(async () => {
    try {
      await mutateAsync({ postId: id });
    } catch (err) {
      console.error(err);
    }
  }, [mutateAsync, id]);

  return (
    <Box
      px={2}
      py={4}
      display={{ md: "flex" }}
      maxWidth="32rem"
      borderWidth={1}
      margin={2}
    >
      <Stack
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
      >
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="lg"
          letterSpacing="wide"
        >
          {title}
        </Text>
        <Text
          my={1}
          fontWeight="semibold"
          fontSize="md"
          letterSpacing="wide"
          lineHeight="normal"
        >
          {content}
        </Text>
        <Button w="full" colorScheme="red" onClick={onDeleteHandler}>
          Delete
        </Button>
      </Stack>
    </Box>
  );
};
