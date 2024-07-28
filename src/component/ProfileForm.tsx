'use client'
import React from 'react';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import { useForm } from 'react-hook-form';
import axios from 'axios';

type ProfileFormProps = {
    profile: {
        ProfileImage: string;
        name: string;
        email: string;
    }
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profile }) => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            name: profile.name,
            ProfileImage: profile.ProfileImage
        }
    });

    const uploadphoto = (result: any) => {
        setValue("ProfileImage", result?.info?.secure_url);
    };

    const onSubmit = async (data: any) => {
        try {
            await axios.post('/api/updateProfile', {
                email: profile.email,
                ...data
            });
            alert('Profile updated successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    return (
        <div>
            <div>Edit your Profile</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        {...register('name', {
                            required: "Name is required",
                            validate: value => value.length >= 3 || "Username must be at least 3 characters"
                        })}
                        type="text"
                        placeholder='Name'
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div>
                    <Image src={watch("ProfileImage") || '/profiledefault.jpg'} alt="Profile" width={100} height={100} />
                    <CldUploadButton options={{ maxFiles: 1 }} onUpload={uploadphoto} uploadPreset='b10fcadn'>
                        <p>Upload your photo</p>
                    </CldUploadButton>
                </div>
                <button type='submit'>Save Changes</button>
            </form>
        </div>
    );
}

export default ProfileForm;
