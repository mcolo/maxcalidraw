import { AppState } from '@excalidraw/excalidraw/types';

/**
 * Get the canvas state from local storage
 * @returns The canvas state or null if the canvas state is not found
 */
export function getCanvasStateFromLocalStorage() {
  const rawState: string | null = localStorage.getItem('canvas-state');
  if (!rawState) return null;

  const state = JSON.parse(rawState);
  if (!state || !state.appState || !state.elements) return null;

  return {
    elements: state.elements,
    appState: state.appState,
  };
}

/**
 * Set the canvas state to local storage
 * @param appState - The app state
 * @param elements - The elements
 */
export function setCanvasStateToLocalStorage(elements: any, appState: AppState) {
  if (!appState || !elements) return;

  const state = {
    appState,
    elements,
  };

  localStorage.setItem('canvas-state', JSON.stringify(state));
}

/**
 * Clear the canvas state from local storage
 */
export function clearCanvasStateFromLocalStorage() {
  localStorage.removeItem('canvas-state');
}

/**
 * Check if the canvas elements have changed
 * @param elements - The elements
 * @returns True if the elements have changed, false otherwise
 */
export function hasCanvasElementsChanged(elements: any) {
  const currentState = getCanvasStateFromLocalStorage();
  if (!currentState) return true;

  return JSON.stringify(elements) !== JSON.stringify(currentState.elements);
}
