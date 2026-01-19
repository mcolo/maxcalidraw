'use client';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function App() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <h1>Please sign in to continue</h1>;
  }

  return (
    <section>
      <Link href='/draw' className='text-sm text-blue-500'>
        Start a new file
      </Link>
    </section>
  );
}
