import { useState } from 'react';
import { Review } from '@/types/tmdb';
import { FaStar, FaUserCircle } from 'react-icons/fa';

interface ReviewsProps {
  reviews: Review[];
}

// TMDB's avatar_path is either null, a normal TMDB image path, or an
// external Gravatar URL stored with a leading slash (e.g. "/https://...").
function resolveAvatarUrl(avatarPath: string | null): string | null {
  if (!avatarPath) return null;
  if (avatarPath.startsWith('/http')) return avatarPath.slice(1);
  return `https://image.tmdb.org/t/p/w92${avatarPath}`;
}

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const avatarUrl = resolveAvatarUrl(review.author_details.avatar_path);
  const rating = review.author_details.rating;
  const shouldTruncate = review.content.length > 400;

  return (
    <div className="p-5 rounded-2xl bg-ink/[0.03] dark:bg-ivory/[0.04] ring-1 ring-ink/10 dark:ring-ivory/10">
      <div className="flex items-center gap-3">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={review.author}
            className="object-cover w-10 h-10 rounded-full ring-1 ring-ink/10 dark:ring-ivory/10"
          />
        ) : (
          <FaUserCircle className="w-10 h-10 text-muted/50" />
        )}

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate text-ink dark:text-ivory">
            {review.author}
          </p>
          <p className="text-xs text-muted">
            {new Date(review.created_at).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
        </div>

        {rating != null && (
          <span className="flex items-center flex-shrink-0 gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-champagne/15 text-champagne-dim dark:text-champagne">
            <FaStar className="text-[10px]" />
            {rating}/10
          </span>
        )}
      </div>

      <p
        className={`mt-4 text-sm leading-relaxed text-ink/70 dark:text-ivory/70 ${
          expanded ? '' : 'line-clamp-4'
        }`}
      >
        {review.content}
      </p>

      {shouldTruncate && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-xs font-medium transition-opacity text-champagne-dim dark:text-champagne hover:opacity-75"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}

export default function Reviews({ reviews }: ReviewsProps) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="mt-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="w-6 h-[2px] bg-champagne" />
        <h2 className="text-xl font-semibold tracking-wide text-ink dark:text-ivory">
          Reviews
        </h2>
      </div>

      <div className="flex gap-4 pb-2 overflow-x-auto reel-scroll scrollbar-hide">
        {reviews.map((review) => (
          <div key={review.id} className="flex-shrink-0 w-[320px] sm:w-[360px]">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  );
}
