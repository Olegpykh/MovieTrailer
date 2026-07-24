import { Link } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function NotFoundPage() {
  useDocumentTitle('Page Not Found');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-paper dark:bg-void">
      <div className="relative py-10">
        <span
          aria-hidden
          className="absolute top-0 left-0 w-5 h-5 border-t border-l border-ink/20 dark:border-ivory/20"
        />
        <span
          aria-hidden
          className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-champagne-dim/50 dark:border-champagne/50"
        />
        <div className="px-6">
          <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-champagne/80">
            404
          </span>
          <h1 className="mt-3 text-4xl font-medium leading-[1.05] text-ink/90 dark:text-ivory/90 sm:text-5xl -tracking-tight">
            This reel{' '}
            <span className="italic font-light text-champagne-dim dark:text-champagne">
              doesn't exist
            </span>
          </h1>
          <p className="max-w-sm mx-auto mt-4 text-sm text-muted">
            The page you're looking for was moved, renamed, or never existed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 mt-8 text-sm font-medium transition-all rounded-full bg-ink dark:bg-ivory text-paper dark:text-void hover:opacity-90"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
