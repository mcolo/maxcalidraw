'use client';

import { createDocument } from '@/db/documents';
import { redirect } from 'next/navigation';
import { CirclePlus } from 'lucide-react';

export default function NewDocumentButton() {
  const handleNewDocument = async () => {
    const name = prompt('Enter a name for your new document');
    if (!name) return;
    const newDocumentId = await createDocument(
      name,
      JSON.stringify({ elements: [], appState: null }),
    );
    if (!newDocumentId) return;
    redirect(`/draw?documentId=${newDocumentId}`);
  };

  return (
    <button className='btn' onClick={handleNewDocument}>
      Start a New Document
      <CirclePlus size={18} />
    </button>
  );
}
