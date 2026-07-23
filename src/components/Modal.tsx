import { Movie, PersonCreditsMovieCard, TV } from '@/types/tmdb';
import { FaStar, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  movie: Movie | TV;
  closeModal: () => void;
  poster: string | null;
  title: string | null;
  trailerKey: string | null;
  trailerName: string;
  year: number | 'N/A';
  allCredits: PersonCreditsMovieCard[];
}

export default function Modal({
  movie,
  closeModal,
  poster,
  title,
  trailerKey,
  trailerName,
  year,
  allCredits = [],
}: ModalProps) {
  const navigate = useNavigate();
  const topCast = allCredits.filter((actor) => actor.profile_path).slice(0, 6);

  const handleActorClick = (id: number) => {
    navigate(`/person/${id}`);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 transition-opacity duration-300 bg-void/40 dark:bg-void/70 backdrop-blur-md"
        onClick={closeModal}
      />
      <div
        className="relative w-full max-w-5xl max-h-[95vh] my-12 overflow-y-auto rounded-2xl ring-1 ring-ink/10 dark:ring-ivory/10 text-ink dark:text-ivory bg-paper dark:bg-surface shadow-lifted"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute z-10 p-2 transition-colors rounded-full top-5 right-5 bg-ink/5 dark:bg-ivory/10 text-ink dark:text-ivory hover:bg-ink/10 dark:hover:bg-ivory/15"
          aria-label="Close"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        <div className="flex flex-col gap-6 p-6 md:flex-row md:p-10">
          <div className="flex flex-col items-center w-full space-y-8 md:w-2/5">
            <div className="flex justify-center w-full">
              <img
                src={poster ?? ''}
                alt={title ?? undefined}
                className="object-contain w-full h-auto max-w-md mx-auto bg-surface rounded-xl ring-1 ring-ink/10 dark:ring-ivory/10 shadow-subtle"
              />
            </div>
            {topCast.length > 0 && (
              <div className="w-full">
                <h3 className="mb-4 text-[11px] font-medium tracking-[0.2em] text-muted uppercase">
                  Top Cast
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {topCast.map((actor) => (
                    <button
                      key={actor.id}
                      onClick={() => handleActorClick(actor.id)}
                      className="flex flex-col items-center space-y-2 transition-all group hover:opacity-80"
                    >
                      <div className="overflow-hidden rounded-full ring-1 ring-ink/10 dark:ring-ivory/10">
                        <img
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                          alt={actor.name ?? undefined}
                          className="object-cover w-20 h-20"
                        />
                      </div>
                      <p className="text-xs font-medium text-center text-ink/80 dark:text-ivory/80 line-clamp-2">
                        {actor.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col w-full space-y-6 md:w-3/5">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-ink dark:text-ivory md:text-4xl">
                {title}
              </h1>
              <div className="flex items-center gap-2.5 mt-3 text-sm text-ink/70 dark:text-ivory/70">
                <FaStar className="w-3.5 h-3.5 text-champagne-dim dark:text-champagne" />
                <span className="font-medium">
                  {movie.vote_average?.toFixed(1) ?? 'N/A'}
                </span>
                <span className="text-muted">·</span>
                <span>{year}</span>
              </div>
              <p className="mt-4 text-base leading-relaxed text-ink/70 dark:text-ivory/70">
                {movie.overview || 'No description available.'}
              </p>
            </div>
            {trailerKey && (
              <div>
                <p className="mb-3 text-[11px] font-medium tracking-[0.2em] uppercase text-muted">
                  {trailerName}
                </p>
                <div className="overflow-hidden rounded-xl ring-1 ring-ink/10 dark:ring-ivory/10 shadow-subtle">
                  <iframe
                    className="w-full aspect-video"
                    src={`https://www.youtube.com/embed/${trailerKey}?rel=0&modestbranding=1`}
                    title="Trailer"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
