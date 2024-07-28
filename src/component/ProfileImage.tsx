import React from 'react'
import Image from 'next/image'
import User from '@/models/User'
const ProfileImage =async (session :any) => {
    const profile = await User.findOne({email: session?.user?.email})
    return (    
        <Image
          src={profile?.ProfileImage|| "/profiledefault.jpg"}
          alt="Profile"
          width={50}
          height={50}
          />
    )
}
export default ProfileImage
