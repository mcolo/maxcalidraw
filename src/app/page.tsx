import { auth } from '@clerk/nextjs/server';
import { SignInButton, SignOutButton } from '@clerk/nextjs';
import { LineSquiggle, LogInIcon, LogOutIcon } from 'lucide-react';
import styles from './home.module.css';
import NewDocumentButton from '@/components/new-documents-button';
import DocumentsList from '@/components/documents-list';
import { Suspense } from 'react';

export default async function Page() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return (
      <header className={styles.header}>
        <Logo />
        <SignInButton>
          <button className='btn'>
            Log In
            <LogInIcon size={18} />
          </button>
        </SignInButton>
      </header>
    );
  }

  return (
    <>
      <header className={styles.header}>
        <Logo />
        <SignOutButton>
          <button className='btn'>
            Log Out
            <LogOutIcon size={18} />
          </button>
        </SignOutButton>
      </header>
      <main className={styles.mainContent}>
        <NewDocumentButton />
        <section style={{ width: '100%' }}>
          <Suspense fallback={<div>Loading...</div>}>
            <DocumentsList />
          </Suspense>
        </section>
      </main>
    </>
  );
}

function Logo() {
  return (
    <h1 className={styles.title}>
      <LineSquiggle /> Maxcalidraw
    </h1>
  );
}
