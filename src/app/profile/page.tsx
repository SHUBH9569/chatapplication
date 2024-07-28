
import { auth } from '@/auth';
import React from 'react'
import axios from 'axios';
import ProfileForm from '@/component/ProfileForm';


const page = async () => {
    const session =await auth();
    const user = session?.user;
    const email = user?.email;
    
      const res = await axios.post("http://localhost:3000/api/profile",{email});
      const profile = res.data.profile;
      
    
  return (
    
      <ProfileForm profile={profile} />

    
  )
}

export default page 