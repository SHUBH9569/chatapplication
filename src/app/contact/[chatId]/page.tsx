'use client'

import InputField from "@/component/InputField";
import axios from "axios";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";

type MessageType = {
  _id: string;
  text: string;
  sender: string;
};

const Page = () => {
  const searchParams = useSearchParams();
  const [conversation, setConversation] = useState<MessageType[] | null>(null);
  const sessionEmail = searchParams.get('sessionEmail') || '';

  const contactId = searchParams.get('contactId');
  const contactName = searchParams.get('contactName');

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await axios.post('/api/conversation', {
          sessionEmail,
          contactId,
        });
        setConversation(response.data.messages);
      } catch (error) {
        console.error('Error fetching conversation:', error);
      }
    };

    if (contactId && sessionEmail) {
      fetchConversation();
    }
  }, [contactId, sessionEmail]);

  console.log("the session email", sessionEmail);

  if (!contactId) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>{contactName}</p>
      
      { conversation && conversation.length > 0 ? (
          conversation.map((message) => (
            <div key={message._id}>
              <p><strong>{message.sender === contactId ? contactName:'You'  }:</strong> {message.text}</p>
            </div>
          ))
        ) : (
          <p>No messages found</p>
        )}
           
      <InputField contactId={contactId} sessionEmail={sessionEmail} />
    </div>
  );
};

export default Page;
