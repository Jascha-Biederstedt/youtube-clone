export const getVideos = async (options, prisma) => {
  const videos = await prisma.video.findMany({
    where: {},
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: true,
    },
  });

  return videos;
};
