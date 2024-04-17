"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const RequireAuth = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const authorizedEmail = process.env.NEXT_PUBLIC_AUTHORIZED_EMAIL;

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  if (session.user.email !== authorizedEmail) {
    router.push('/login');
    return null;
  }

  return <>{children}</>;
};

export default RequireAuth;
