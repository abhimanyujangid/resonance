import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { deleteAudio } from "@/src/lib/r2";
import { prisma } from "@/src/lib/db";
import { createTRPCRouter } from "../init";

export const voicesRouter = createTRPCRouter({});
