import { amount } from 'lib/config';

const LoadMore = ({ videos, setVideos, setReachedEnd, author }) => {
  const handleBtnClick = async () => {
    const url = `/api/videos?skip=${videos.length}`;

    if (author) {
      url += `&author=${author.id}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    if (data.length < amount) {
      setReachedEnd(true);
    }

    setVideos([...videos, ...data]);
  };

  return (
    <div className='flex justify-center'>
      <button
        onClick={() => handleBtnClick()}
        className='border px-8 py-2 my-10 mr-2 font-bold rounded-full'
      >
        Load more
      </button>
    </div>
  );
};

export default LoadMore;
