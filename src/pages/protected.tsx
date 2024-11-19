import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

const ProtectedPage = () => {
  const { data: session, status } = useSession();
  console.log(session);
  

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
  }, [status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    return <div>Welcome</div>;
  }

  return null;
};

export default ProtectedPage;