import prisma from 'lib/prisma';
import { getVideos } from 'lib/data.js';
import { amount } from 'lib/config';

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(501).end();
  }

  if (req.method === 'GET') {
    const take = parseInt(req.query.take || amount);
    const skip = parseInt(req.query.skip || 0);
    const author = req.query.author;
    const subscriptions = req.query.subscriptions;

    const videos = await getVideos(
      { take, skip, author, subscriptions },
      prisma
    );
    res.json(videos);
  }
};

export default handler;
