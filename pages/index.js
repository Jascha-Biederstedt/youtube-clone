import Head from 'next/head';

import prisma from 'lib/prisma';
import { getVideos } from 'lib/data';
import Videos from 'components/Videos';
import Heading from 'components/Heading';

export const getServerSideProps = async () => {
  let videos = await getVideos({}, prisma);
  videos = JSON.parse(JSON.stringify(videos));

  return {
    props: {
      videos,
    },
  };
};

const Home = ({ videos }) => {
  return (
    <div>
      <Head>
        <title>YouTube Clone</title>
        <meta name='description' content='YouTube Clone' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Heading />

      {videos.length === 0 && (
        <p className='flex justify-center mt-20'>No videos found!</p>
      )}
      <Videos videos={videos} />
    </div>
  );
};

export default Home;
