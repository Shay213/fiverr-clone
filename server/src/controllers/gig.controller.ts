import { FastifyRequest, FastifyReply } from "fastify";
import { Body } from "../routes/gig.route";

export const createGig = async (req: FastifyRequest, reply: FastifyReply) => {
  const { sendError } = req.server.replyHelpers;
  const { isSeller, userId } = req.payload;
  if (!isSeller) return sendError(reply, "Only sellers can create a gig!", 403);
  const body = req.body as Body;

  try {
    const gig = await req.server.prisma.gig.create({
      data: {
        ...body,
        user: { connect: { id: userId } },
      },
    });
    return reply.code(201).send(gig);
  } catch (error: any) {
    return sendError(reply, error.message, 500);
  }
};

interface Params {
  id: string;
}

export const deleteGig = async (req: FastifyRequest, reply: FastifyReply) => {
  const { sendError, sendSuccess } = req.server.replyHelpers;
  const params = req.params as Params;
  try {
    const gig = await req.server.prisma.gig.findUnique({
      where: {
        id: params.id,
      },
    });
    if (gig?.userId !== req.payload.userId)
      return sendError(reply, "You can delete only your gig!", 403);

    await req.server.prisma.gig.delete({
      where: {
        id: params.id,
      },
    });
    return sendSuccess(reply, "Gig has been deleted!", 200);
  } catch (error: any) {
    return sendError(reply, error.message, 500);
  }
};

export const getGig = async (req: FastifyRequest, reply: FastifyReply) => {
  const { sendError } = req.server.replyHelpers;
  const params = req.params as Params;

  try {
    const gig = await req.server.prisma.gig.findUnique({
      where: {
        id: params.id,
      },
      include: {
        user: {
          select: {
            username: true,
            img: true,
            createdAt: true,
            country: true,
            desc: true,
          },
        },
      },
    });
    if (!gig) return sendError(reply, "Gig not found!", 404);
    return reply.code(200).send(gig);
  } catch (error: any) {
    return sendError(reply, error.message, 500);
  }
};

interface Query {
  userId?: string;
  cat?: string;
  min?: number;
  max?: number;
  search?: string;
  sort?: string;
}

enum SearchMode {
  INSENSITIVE = "insensitive",
  DEFAULT = "default",
}

enum SortMode {
  ASC = "asc",
  DESC = "desc",
}

export const getGigs = async (req: FastifyRequest, reply: FastifyReply) => {
  const { sendError } = req.server.replyHelpers;
  const q = req.query as Query;

  const filters = {
    ...(q.userId && { user: { id: q.userId } }),
    ...(q.cat && { category: q.cat }),
    ...((q.min || q.max) && {
      price: { ...(q.min && { gt: q.min }), ...(q.max && { lt: q.max }) },
    }),
    ...(q.search && {
      title: { contains: q.search, mode: SearchMode.INSENSITIVE },
    }),
  };

  const sort = {
    orderBy: {
      ...(q.sort && { [q.sort]: SortMode.DESC }),
    },
  };

  try {
    const gigs = await req.server.prisma.gig.findMany({
      where: {
        ...filters,
      },
      ...sort,
      include: {
        user: { select: { username: true, img: true } },
      },
    });
    console.log(gigs);
    return reply.code(200).send(gigs);
  } catch (error: any) {
    return sendError(reply, error.message, 500);
  }
};
