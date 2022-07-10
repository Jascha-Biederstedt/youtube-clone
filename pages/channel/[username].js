import React, { useState } from 'react';
import Head from 'next/head';

import prisma from 'lib/prisma';
import { getUser, getVideos, getSubscribersCount } from 'lib/data.js';
import { amount } from 'lib/config';

import Videos from 'components/Videos';
import Heading from 'components/Heading';
import LoadMore from 'components/LoadMore';

export const getServerSideProps = async context => {
  let user = await getUser(context.params.username, prisma);
  user = JSON.parse(JSON.stringify(user));

  let videos = await getVideos({ author: user.id }, prisma);
  videos = JSON.parse(JSON.stringify(videos));

  const subscribers = await getSubscribersCount(
    context.params.username,
    prisma
  );

  return {
    props: {
      initialVideos: videos,
      user,
      subscribers,
    },
  };
};

const Channel = ({ user, initialVideos, subscribers }) => {
  const [videos, setVideos] = useState(initialVideos);
  const [reachedEnd, setReachedEnd] = useState(initialVideos.length < amount);

  if (!user)
    return <p className='text-center p-5'>Channel does not exist 😞</p>;

  return (
    <>
      <Head>
        <title>Channel of {user.name}</title>
        <meta name='description' content={`Channel of ${user.name}`} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Heading />

      <div>
        <div className='flex justify-between'>
          <div className='flex m-5'>
            {user.image && (
              <img
                className='w-20 h-20 mt-2 mr-2 rounded-full'
                src={user.image}
              />
            )}
            <div className='mt-5'>
              <p className='text-lg font-bold text-white'>{user.name}</p>
              <div className=''>
                <div className=''>
                  <div className='text-gray-400'>{subscribers} subscribers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Videos videos={videos} />
          {!reachedEnd && (
            <LoadMore
              videos={videos}
              setVideos={setVideos}
              setReachedEnd={setReachedEnd}
              author={user}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Channel;
