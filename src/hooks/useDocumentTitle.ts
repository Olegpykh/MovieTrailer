import { useEffect } from 'react';

export function useDocumentTitle(title?: string | null) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} • StreamVerse` : 'StreamVerse';

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}
