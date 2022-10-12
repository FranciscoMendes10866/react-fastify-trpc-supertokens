import { Box, SimpleGrid } from "@chakra-ui/react";

import { Navbar } from "../components/Navbar";
import { SubmitPostForm } from "../components/SubmitPostForm";
import { PostCard } from "../components/PostCard";

import { trpc } from "../utils/trpc";

export const Dashboard = () => {
  const getPosts = trpc.getPosts.useQuery();

  return (
    <div>
      <Navbar />
      <SubmitPostForm />

      <Box px={8}>
        <SimpleGrid columns={4} spacing={4} py={12}>
          {getPosts.data?.map((elm) => (
            <PostCard key={elm.id} {...elm} />
          ))}
        </SimpleGrid>
      </Box>
    </div>
  );
};
