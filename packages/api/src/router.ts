import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import Session from "supertokens-node/recipe/session";

import { Post } from "./db/Models/Post";
import { dataSource } from "./db/data-source";
import { IContext } from "./context";

const t = initTRPC.context<IContext>().create();

const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  const session = await Session.getSession(ctx.req, ctx.res);
  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: {
        userId: session.getUserId(),
      },
    },
  });
});

const authenticatedProcedure = t.procedure.use(isAuthenticated);

export const router = t.router({
  getPosts: authenticatedProcedure.query(async () => {
    const postRepository = dataSource.getRepository(Post);
    return await postRepository.find();
  }),
  getPostById: authenticatedProcedure
    .input(z.object({ postId: z.string().uuid() }))
    .query(async ({ input }) => {
      const postRepository = dataSource.getRepository(Post);
      return await postRepository.findOne({
        where: { id: input.postId },
      });
    }),
  createPost: authenticatedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        authorId: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const postRepository = dataSource.getRepository(Post);

      const postInstance = new Post();
      postInstance.title = input.title;
      postInstance.content = input.content;
      postInstance.authorId = input.authorId;

      return await postRepository.save(postInstance);
    }),
  updatePost: authenticatedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        title: z.string(),
        content: z.string(),
        authorId: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...rest } = input;
      const postRepository = dataSource.getRepository(Post);

      await postRepository.update({ id }, rest);
      return await postRepository.findOne({
        where: { id },
      });
    }),
  deletePost: authenticatedProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const postRepository = dataSource.getRepository(Post);
      const postToDelete = await postRepository.findOne({
        where: { id: input.postId },
      });

      if (postToDelete) {
        await postRepository.remove(postToDelete);
      }

      return postToDelete;
    }),
});

export type IRouter = typeof router;
