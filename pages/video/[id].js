import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Head from 'next/head';

import prisma from 'lib/prisma';
import timeago from 'lib/timeago';
import { getVideo, getVideos } from 'lib/data.js';

import Video from 'components/Video';
import Heading from 'components/Heading';

export const getServerSideProps = async context => {
  let video = await getVideo(context.params.id, prisma);
  video = JSON.parse(JSON.stringify(video));

  let videos = await getVideos({ take: 3 }, prisma);
  videos = JSON.parse(JSON.stringify(videos));

  return {
    props: {
      video,
      videos,
    },
  };
};

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

const SingleVideo = ({ video, videos }) => {
  if (!video) return <p className='text-center p-5'>Video does not exist 😞</p>;

  useEffect(() => {
    const incrementViews = async () => {
      await fetch('/api/view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          video: video.id,
        }),
      });
    };
    incrementViews();
  }, []);

  return (
    <>
      <Head>
        <title>{video.title}</title>
        <meta name='description' content={video.title} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Heading />

      <div className='h-screen flex'>
        <div className='flex w-full md:w-2/3 flex-col mb-4 border-t border-r border-b border-3 border-black pl-0 bg-black'>
          <div className='relative pt-[60%]'>
            <ReactPlayer
              className='react-player absolute top-0 left-0'
              url={video.url}
              width='100%'
              height='100%'
              controls={true}
              light={video.thumbnail}
            />
          </div>

          <div className='px-5 mt-5'>
            <div className='flex '>
              <div>
                <p className='text-2xl font-bold'>{video.title}</p>

                <div className='text-gray-400'>
                  {video.views} views ·{' '}
                  {timeago.format(new Date(video.createdAt))}
                </div>
              </div>
            </div>

            <div className='flex justify-between border-t border-gray-500 mt-5 pt-5'>
              <Link href={`/channel/${video.author.username}`}>
                <a className=' flex '>
                  {video.author.image && (
                    <img
                      className='w-16 h-16 mt-2 mr-2 rounded-full'
                      src={video.author.image}
                    />
                  )}
                  <span className='mt-6 ml-2 text-xl text-gray-400'>
                    {video.author.name}
                  </span>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className='hidden md:block md:w-1/3'>
          <div className='flex flex-wrap'>
            {videos.map((video, index) => (
              <div className='w-full' key={index}>
                <Video video={video} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleVideo;
