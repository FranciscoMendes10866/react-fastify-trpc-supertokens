import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "supertokens-web-js/recipe/emailpassword";

const validationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(28),
});

type IFormValues = z.infer<typeof validationSchema>;

export const SignIn = () => {
  const navigate = useNavigate();

  const { handleSubmit, control, reset } = useForm<IFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = useCallback(
    async (values: IFormValues) => {
      try {
        const result = await signIn({
          formFields: [
            { id: "email", value: values.email },
            { id: "password", value: values.password },
          ],
        });

        if (result.status !== "FIELD_ERROR") {
          reset();
          navigate("/dashboard");
        }
      } catch (err) {
        console.error(err);
      }
    },
    [reset]
  );

  return (
    <Container
      h="100vh"
      w={450}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        py={{ base: "0", sm: "8" }}
        px={{ base: "4", sm: "10" }}
        boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
        borderRadius={{ base: "none", sm: "xl" }}
        w="full"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <Input type="email" {...field} />}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => <Input type="password" {...field} />}
                />
              </FormControl>
            </Stack>
            <Stack spacing="4">
              <Button variant="solid" type="submit">
                Sign in
              </Button>
              <Button variant="link" type="button" as={Link} to="/">
                Don't you have an account?
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};
