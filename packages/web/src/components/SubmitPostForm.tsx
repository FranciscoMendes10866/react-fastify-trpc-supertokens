import {
  Box,
  Button,
  Stack,
  Input,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { trpc } from "../utils/trpc";

const validationSchema = z.object({
  title: z.string(),
  content: z.string(),
});

type IFormValues = z.infer<typeof validationSchema>;

export const SubmitPostForm = () => {
  const { handleSubmit, control, reset } = useForm<IFormValues>({
    defaultValues: {
      title: "",
      content: "",
    },
    resolver: zodResolver(validationSchema),
  });

  const utils = trpc.useContext();
  const { mutateAsync } = trpc.createPost.useMutation({
    onSuccess: () => {
      utils.getPosts.invalidate();
    },
  });

  const onSubmit = useCallback(
    async (values: IFormValues) => {
      try {
        await mutateAsync(values);
        reset();
      } catch (err) {
        console.error(err);
      }
    },
    [reset, mutateAsync]
  );

  return (
    <Box
      as="section"
      py={8}
      boxShadow={{ base: "none", sm: useColorModeValue("sm", "sm-dark") }}
      borderRadius={{ base: "none", sm: "xl" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="20px" align="start" direction={["column", "row"]}>
          <Box w={{ sm: "full", md: "400px" }}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input type="text" placeholder="Title..." {...field} />
              )}
            />
          </Box>

          <Box w={{ sm: "full", md: "400px" }}>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <Textarea placeholder="Content..." {...field} />
              )}
            />
          </Box>

          <Button variant="solid" colorScheme="teal" size="md" type="submit">
            Add Post
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
