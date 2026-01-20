'use client';

import dynamic from 'next/dynamic';
import '@excalidraw/excalidraw/index.css';
import { ArrowBigLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AppState } from '@excalidraw/excalidraw/types';
import { getDocumentById, updateDocument } from '@/db/documents';
import {
  clearCanvasStateFromLocalStorage,
  hasCanvasElementsChanged,
  setCanvasStateToLocalStorage,
} from '@/utils/local-storage';
import throttle from '@/utils/throttle';
import { ImportedDataState } from '@excalidraw/excalidraw/data/types';
import styles from './draw.module.css';

const Excalidraw = dynamic(async () => (await import('@excalidraw/excalidraw')).Excalidraw, {
  ssr: false,
});

export default function DrawClientComponent({ documentId }: { documentId: string }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [documentName, setDocumentName] = useState('');
  const [initialData, setInitialData] = useState<ImportedDataState>({
    elements: [],
    appState: null,
  });

  /**
   * Go to the all files page
   * @returns void
   */
  const goToAllFiles = () => {
    router.push('/');
  };

  /**
   * Load an existing document by its ID
   * @param documentId - The ID of the document to load
   * @returns void
   */
  const loadExistingDocument = async (documentId: string) => {
    try {
      const document = await getDocumentById(documentId);
      setDocumentName(document.name);
      const { data } = document as { data: ImportedDataState };
      // collaborators converts to an object when JSON stringified
      // need to convert it back to a Map
      if (data.appState) {
        data.appState = {
          ...data.appState,
          collaborators: new Map(),
        };
      }
      setInitialData(data);
    } catch (error) {
      console.error('Error loading existing document', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle changes to the canvas
   * @param elements - The elements
   * @param appState - The app state
   * @returns void
   */
  const handleChange = throttle((elements: any, appState: AppState) => {
    if (loading) return;
    console.log('handleChange');
    if (!documentId) return;
    const hasElementsChanged = hasCanvasElementsChanged(elements);
    if (hasElementsChanged) {
      setCanvasStateToLocalStorage(elements, appState);
      updateDocument(documentId, JSON.stringify({ elements, appState }));
    }
  }, 250);

  /**
   * Render the top right UI within the Excalidraw component
   * @returns React.ReactNode
   */
  const renderTopRightUI = () => {
    return (
      <>
        <span className={styles.documentName}>{documentName}</span>
        <span className={styles.backBtn} onClick={goToAllFiles}>
          <ArrowBigLeft size={16} /> All Files
        </span>
      </>
    );
  };

  /**
   * Load the initial data for the document
   * @returns void
   */
  useEffect(() => {
    if (documentId) {
      loadExistingDocument(documentId);
    } else {
      router.push('/');
    }
  }, [documentId]);

  /**
   * Clear the canvas state from local storage when the component unmounts
   * @returns void
   */
  useEffect(() => {
    return () => {
      clearCanvasStateFromLocalStorage();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Excalidraw
      isCollaborating={false}
      initialData={initialData}
      renderTopRightUI={renderTopRightUI}
      onChange={handleChange}
    />
  );
}
