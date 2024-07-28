'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const AuthCallback: React.FC = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        if (session?.user) {
          const { email } = session.user;

          if (!email) {
            console.log("No email in session");
            return;
          }

          const res = await axios.post('/api/auth/logout/signout', {
            email,
          });

          if (res.status === 200) {
            console.log('un authenticated');
            window.location.href = '/';
          } else {
            console.error('Error response:', res.data);
          }
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    logoutUser();
  }, [status, session]);

  return <div>Loading...</div>;
};

export default AuthCallback;
