import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SubscribedButton = ({ user, subscribed }) => {
  const router = useRouter();
  const [subscribedButtonText, setSubscribedButtonText] =
    useState('Subscribed');
  const [subscribedButtonColor, setSubscribedButtonColor] = useState('green');

  return (
    <>
      {subscribed ? (
        <button
          className={`bg-${subscribedButtonColor}-500 px-3 py-2 rounded-md`}
          onClick={async () => {
            await fetch('/api/unsubscribe', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                unsubscribeTo: user.id,
              }),
            });

            router.reload(window.location.pathname);
          }}
          onMouseOver={() => {
            setSubscribedButtonText('Unsubscribe');
            setSubscribedButtonColor('red');
          }}
          onMouseOut={() => {
            setSubscribedButtonText('Subscribed');
            setSubscribedButtonColor('green');
          }}
        >
          {subscribedButtonText}
        </button>
      ) : (
        <button
          className=' bg-red-500 px-3 py-2  rounded-md'
          onClick={async () => {
            await fetch('/api/subscribe', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                subscribeTo: user.id,
              }),
            });

            router.reload(window.location.pathname);
          }}
        >
          Subscribe
        </button>
      )}
    </>
  );
};

export default SubscribedButton;
