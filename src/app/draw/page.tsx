'use client';

import dynamic from 'next/dynamic';
import '@excalidraw/excalidraw/index.css';
import { ArrowBigLeft, Save } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types';
import { getDocumentById } from '@/db/documents';

const Excalidraw = dynamic(async () => (await import('@excalidraw/excalidraw')).Excalidraw, {
  ssr: false,
});

export default function Draw() {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const documentId = searchParams.get('documentId');

  useEffect(() => {
    if (documentId) {
      handleLoad(documentId);
    }
  }, [documentId]);

  const goToAllFiles = () => {
    router.push('/');
  };

  const handleSave = async () => {
    if (!excalidrawAPI) return;
    // const { serializeAsJSON } = await import('@excalidraw/excalidraw');
    // const elements = excalidrawAPI.getSceneElements();
    // const appState = excalidrawAPI.getAppState();
    // const files = undefined as unknown as BinaryFiles;
    // const type = 'local';
    // const json = serializeAsJSON(elements, appState, files, type);
    // console.log(json);
  };

  const handleLoad = async (documentId: string) => {
    if (!excalidrawAPI) return;
    const { restore } = await import('@excalidraw/excalidraw');
    const document = await getDocumentById(documentId);
    if (!document) return;
    const importedDataState = JSON.parse(document[0].data as string);
    restore(importedDataState, null, null);

    // const { loadFromBlob } = await import('@excalidraw/excalidraw');
    // const scene = await loadFromBlob(file, null, null);
    // excalidrawAPI.updateScene(scene);
  };

  const renderTopRightUI = () => {
    return (
      <>
        <span
          className='flex cursor-pointer items-center gap-2 rounded-lg bg-[#ececf4] p-[.625rem] text-xs text-slate-900 hover:bg-[#f1f0ff]'
          onClick={goToAllFiles}
        >
          <ArrowBigLeft className='h-4 w-4' /> All Files
        </span>
        <span
          className='flex cursor-pointer items-center gap-2 rounded-lg bg-[#6965db] p-[.625rem] text-xs font-bold text-white hover:bg-[#5b57d1]'
          onClick={handleSave}
        >
          <Save className='h-4 w-4' /> Save File
        </span>
      </>
    );
  };

  return (
    <Excalidraw
      excalidrawAPI={(api) => setExcalidrawAPI(api)}
      renderTopRightUI={renderTopRightUI}
    />
  );
}
