import Link from 'next/link';
import { getDocuments } from '@/db/documents';
import styles from './documents-list.module.css';

export default async function DocumentsList() {
  const documents = await getDocuments();

  if (!documents) {
    return <h1 className={styles.h1}>No documents found</h1>;
  }

  return (
    <>
      <h1 className={styles.h1}>Documents</h1>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.headerCell}>Name</th>
              <th className={styles.headerCell}>Tags</th>
              <th className={styles.headerCell}>Last Updated</th>
              <th className={styles.headerCell}>Created</th>
              <th className={styles.headerCell}>ID</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document) => (
              <tr key={document.id} className={styles.tableRow}>
                <td className={`${styles.cell} ${styles.nameCell}`}>
                  <Link href={`/draw?documentId=${document.id}`}>{document.name}</Link>
                </td>
                <td className={`${styles.cell} ${styles.tagsCell}`}>
                  <div className={styles.tagsContainer}>
                    {document.tags.map((tag) => (
                      <span className={styles.tag} key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className={styles.cell}>
                  {new Date(document.updatedAt).toLocaleString('en-US')}
                </td>
                <td className={styles.cell}>
                  {new Date(document.createdAt).toLocaleString('en-US')}
                </td>
                <td className={`${styles.cell} ${styles.idCell}`}>{document.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
