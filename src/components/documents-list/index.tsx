// 'use client';

// import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDocuments } from '@/db/documents';
import styles from './documents-list.module.css';
export default async function DocumentsList() {
  const documents = await getDocuments();
  // const [documents, setDocuments] = useState<
  //   { id: string; name: string; updatedAt: Date; createdAt: Date }[]
  // >([]);

  // useEffect(() => {
  //   getDocuments().then((documents) => {
  //     setDocuments(documents || []);
  //   });
  // }, []);

  if (!documents) {
    return <h1 className={styles.h1}>No documents found</h1>;
  }

  return (
    <>
      <h1 className={styles.h1}>Documents</h1>
      <div className={styles.tableHeader}>
        <span className={styles.tableHeaderCell}>Name</span>
        <span className={styles.tableHeaderCell}>Tags</span>
        <span className={styles.tableHeaderCell}>Last Updated At</span>
        <span className={styles.tableHeaderCell}>Created At</span>
        <span className={styles.tableHeaderCell}>ID</span>
      </div>
      {documents.map((document) => (
        <div key={document.id} className={styles.tableRow}>
          <span className={styles.tableCell}>
            <Link href={`/draw?documentId=${document.id}`}>{document.name}</Link>
          </span>
          <span className={styles.tableCell}>
            {document.tags.map((tag) => (
              <span className={styles.tag} key={tag}>
                {tag}
              </span>
            ))}
          </span>
          <span className={styles.tableCell}>
            {new Date(document.updatedAt).toLocaleString('en-US')}
          </span>
          <span className={styles.tableCell}>
            {new Date(document.createdAt).toLocaleString('en-US')}
          </span>
          <span className={styles.tableCell}>{document.id}</span>
        </div>
      ))}
    </>
  );
}
