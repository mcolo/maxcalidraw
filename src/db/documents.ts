'use server';

import { db } from './drizzle';
import { documents } from './schema';
import { desc, eq } from 'drizzle-orm';

/**
 * Get all documents
 * @returns Array of documents
 */
export async function getDocuments() {
  const data = await db
    .select({
      id: documents.id,
      name: documents.name,
      updatedAt: documents.updatedAt,
    })
    .from(documents)
    .orderBy(desc(documents.updatedAt));
  return data;
}

/**
 * Get a document by its ID
 * @param documentId
 * @returns Document
 */
export async function getDocumentById(documentId: string) {
  const data = await db.select().from(documents).where(eq(documents.id, documentId));
  return data[0];
}

/**
 * Update a document by its ID
 * @param documentId
 * @param data
 * @returns void
 */
export async function updateDocument(documentId: string, data: string) {
  await db
    .update(documents)
    .set({ data, updatedAt: new Date() })
    .where(eq(documents.id, documentId));
}

/**
 * Delete a document by its ID
 * @param documentId
 * @returns void
 */
export async function deleteDocument(documentId: string) {
  await db.delete(documents).where(eq(documents.id, documentId));
}

/**
 * Create a new document
 * @param name
 * @param data
 * @returns The ID of the created document or null if the document creation failed
 */
export async function createDocument(name: string, data: string): Promise<string | null> {
  const [insertedId] = await db
    .insert(documents)
    .values({ name, data })
    .returning({ id: documents.id });
  if (!insertedId || !insertedId.id) {
    console.error('Failed to create document');
    return null;
  }
  return insertedId.id;
}
