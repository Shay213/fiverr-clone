import { FastifyRequest, FastifyReply } from "fastify";

interface CreateReviewBody {
  gigId: string;
  description: string;
  star: 1 | 2 | 3 | 4 | 5;
}

enum Star {
  ONE = 1,
  TWO,
  THREE,
  FOUR,
  FIVE,
}

export const createReview = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { sendError } = req.server.replyHelpers;
  const { isSeller, userId } = req.payload;
  const { gigId, description, star } = req.body as CreateReviewBody;

  if (isSeller) return sendError(reply, "Sellers can't create a review!", 403);
  try {
    const review = await req.server.prisma.review.findFirst({
      where: {
        AND: {
          userId: userId,
          gigId: gigId,
        },
      },
    });

    if (review)
      return sendError(reply, "You have already created a review!", 403);

    const starStr = Star[star];

    const newReview = await req.server.prisma.review.create({
      data: {
        user: { connect: { id: userId } },
        gig: { connect: { id: gigId } },
        description: description,
        star: starStr as keyof typeof Star,
      },
    });

    await req.server.prisma.gig.update({
      where: {
        id: gigId,
      },
      data: {
        totalStars: { increment: star },
        starNumber: { increment: 1 },
      },
    });

    return reply.code(201).send(newReview);
  } catch (error: any) {
    return sendError(reply, error.message, 500);
  }
};

interface GetReviewsParams {
  gigId: string;
}

export const getReviews = async (req: FastifyRequest, reply: FastifyReply) => {
  const { sendError } = req.server.replyHelpers;
  const { gigId } = req.params as GetReviewsParams;
  try {
    const reviews = await req.server.prisma.review.findMany({
      where: {
        gigId: gigId,
      },
      include: {
        user: {
          select: {
            username: true,
            img: true,
            country: true,
          },
        },
      },
    });
    return reply.code(200).send(reviews);
  } catch (error: any) {
    return sendError(reply, error.message, 500);
  }
};

export const deleteReview = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {};
