'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const AuthCallback: React.FC = () => {
  const { data: session, status } = useSession();
  

  useEffect(() => {
    const registerUser = async () => {
      if (status === 'authenticated' && session?.user) {
        try {
          const { name, email } = session.user;

          if (!name || !email) {
            console.error("No name or email present in session");
            return;
          }

          const res = await axios.post('/api/auth/register/signin', {
            name,
            email,
          });



          if (res.status === 200) {
            console.log('authenticated');
            window.location.href = '/';

          }
          else {
            console.error('Error response:', res.data);
          }
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }
    };

    registerUser();
  }, [status, session]);

  return <div>Loading...</div>; 
};

export default AuthCallback;
