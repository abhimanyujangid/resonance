import { z } from "zod";
import { prisma } from "@/src/lib/db";
import { createTRPCRouter, orgProcedure } from "../init";
import { TRPCError } from "@trpc/server";
import { deleteAudio } from "@/src/lib/r2";

export const voicesRouter = createTRPCRouter({
  getAll: orgProcedure
    .input(
      z
        .object({
          query: z.string().trim().optional(),
        })
        .optional(),
    )
    .query(async ({ input, ctx }) => {
      const searchFilter = input?.query
        ? {
            OR: [
              { name: { contains: input.query, mode: "insensitive" as const } },
              { description: { contains: input.query, mode: "insensitive" as const } },
            ],
          }
        : {
            // No search query, return all voices for the organization
          };

      const [custom, system] = await Promise.all([
        prisma.voice.findMany({
          where: {
            variant: "CUSTOM",
            orgId: ctx.orgId,
            ...searchFilter,
          },
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            name: true,
            description: true,
            variant: true,
            category: true,
            language: true,
          },
        }),
        prisma.voice.findMany({
          where: {
            variant: "SYSTEM",
            ...searchFilter,
          },
          orderBy: {
            createdAt: "asc",
          },
          select: {
            id: true,
            name: true,
            description: true,
            variant: true,
            category: true,
            language: true,
          },
        }),
      ]);

      return {
        custom,
        system,
      };
    }),

  // Only organization owners can delete voices
  delete: orgProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // Ensure the voice belongs to the organization
      const voice = await prisma.voice.findFirst({
        where: {
          id: input.id,
          variant: "CUSTOM",
          orgId: ctx.orgId,
        },
        select: {
          id: true,
          r2ObjectKey: true,
        },
      });

      if (!voice) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Voice not found or does not belong to your organization.",
        });
      }

      await prisma.voice.delete({
        where: {
          id: input.id,
        },
      });

      if (voice.r2ObjectKey) {
        // In a production environment, you might want to handle this asynchronously or with a background job to avoid slowing down the API response. For simplicity, we're doing it synchronously here.
        await deleteAudio(voice.r2ObjectKey).catch((err) => {
          console.error(`Failed to delete audio from R2 for voice ${input.id}:`, err);
        });
      }
      return { success: true };
    }),
});
