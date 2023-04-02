import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const todosRouter = createTRPCRouter({
  getAll: protectedProcedure
  .input(z.object({
    done: z.boolean().optional(),
  }))
  .query(({ ctx, input }) => {
    return ctx.prisma.todo.findMany({
      where: {
        done: input.done
      }
    });
  }),

  create: protectedProcedure
    .input(z.object({
      content: z.string(),
    }))
    .mutation( async ({ ctx, input }) => {

    const todo = await ctx.prisma.todo.create({
      data: {
        authorId: ctx.session.user.id,
        content: input.content,
        done: false,
      },
    })

    return todo;
    }),

  deleteOne: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const todoId = await ctx.prisma.todo.delete({
        where: {
          id: input.id
        }
      });

      return todoId;
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      done: z.boolean(),
    }))
    .mutation(async ({ ctx, input }) => {
      const todo = await ctx.prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          done: input.done,
        }
      })

      return todo;
    }),

  deleteDone: protectedProcedure
    .mutation(async ({ ctx }) => {
      const todoIds = await ctx.prisma.todo.deleteMany({
        where: {
          done: true,
        }
      });

      return todoIds;
    })
});
