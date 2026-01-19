'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDocuments } from '@/db/documents';

export default function DocumentsList() {
  const [documents, setDocuments] = useState<{ id: string; name: string; updatedAt: Date }[]>([]);

  useEffect(() => {
    getDocuments().then((documents) => {
      setDocuments(documents || []);
    });
  }, []);

  return (
    <>
      <h1>Documents</h1>
      <ul>
        {documents.map((document) => (
          <li key={document.id}>
            <Link href={`/draw?documentId=${document.id}`}>
              {document.name} - {new Date(document.updatedAt).toLocaleString('en-US')}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
