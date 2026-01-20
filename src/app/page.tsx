'use client';

import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import DocumentsList from '@/components/documents-list';
import styles from './home.module.css';
import { createDocument } from '@/db/documents';
import { useRouter } from 'next/navigation';
import { CirclePlus, LogInIcon, LogOutIcon } from 'lucide-react';
import { useState } from 'react';

export default function App() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [creatingDocument, setCreatingDocument] = useState(false);

  const handleNewDocument = async () => {
    setCreatingDocument(true);
    const name = prompt('Enter a name for your new document');
    if (!name) {
      setCreatingDocument(false);
      return;
    }
    const newDocumentId = await createDocument(
      name,
      JSON.stringify({ elements: [], appState: null }),
    );
    setCreatingDocument(false);
    if (!newDocumentId) return;
    router.push(`/draw?documentId=${newDocumentId}`);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return (
      <header className={styles.header}>
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
        <SignOutButton>
          <button className='btn'>
            Log Out
            <LogOutIcon size={18} />
          </button>
        </SignOutButton>
      </header>
      <section className={styles.section}>
        <button className='btn' onClick={handleNewDocument} disabled={creatingDocument}>
          Start a New Document
          <CirclePlus size={18} />
        </button>
        <DocumentsList />
      </section>
    </>
  );
}
