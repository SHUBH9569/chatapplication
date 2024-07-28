'use client'
import React, { useState } from 'react';
import axios from 'axios';

interface InputFieldProps {
  contactId: string;
  sessionEmail: string;
}

const InputField: React.FC<InputFieldProps> = ({ contactId, sessionEmail }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(`Message: ${message}`);
    console.log(`Contact ID: ${contactId}`);

    try {
      const response = await axios.post('/api/sendMessage', {
        contactId,
        message,
        email: sessionEmail,
      });


      if (response.status === 200) {
        console.log('Message sent:', response.data);
        setMessage("");
        window.location.reload()
      } else {
        console.log("Message not sent");
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Type message here'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button type='submit'>Send</button>
    </form>
  );
};

export default InputField;
