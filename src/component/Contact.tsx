import User from "@/models/User";
import { auth } from "@/auth";
import { connectToDB } from "@/mongoDb/index";
import Link from "next/link";

const Contact = async () => {
  const session = await auth();

  if (session?.user) {
    const { email } = session.user;

    await connectToDB();
    const hostuser = await User.findOne({email: email});

    const contacts = await User.find({ email: { $ne: email } });
    

    return (
      <div>
        {contacts.map((contact: any) => (
          <Link
            key={contact._id}
            className="bg-blue-300"
            href={{
              pathname: `/contact/${contact._id}`,
              query: {
                sessionEmail: hostuser.email,
                contactId: contact._id,
                contactEmail: contact.email,
                contactName: contact.name,
              },
            }}
          >
            <div>{contact.name}</div>
          </Link>
        ))}
      </div>
    );
  }

  return <div>No user session found</div>;
};

export default Contact;
