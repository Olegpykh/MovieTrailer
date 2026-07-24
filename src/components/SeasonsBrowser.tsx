import { useState, useEffect, useCallback, useRef } from 'react';
import { Season, Episode } from '@/types/tmdb';
import { getTvSeasonDetails } from '../api';
import { FaStar, FaFilm } from 'react-icons/fa';

interface SeasonsBrowserProps {
  tvId: string;
  seasons: Season[];
}

export default function SeasonsBrowser({ tvId, seasons }: SeasonsBrowserProps) {
  // Skip "Specials" (season 0) as the default selection when a real season exists
  const defaultSeason =
    seasons.find((s) => s.season_number > 0)?.season_number ??
    seasons[0]?.season_number ??
    1;

  const [selectedSeason, setSelectedSeason] = useState(defaultSeason);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);
  const hasFetchedOnce = useRef(false);

  const fetchEpisodes = useCallback(
    async (seasonNumber: number) => {
      if (hasFetchedOnce.current) {
        setIsSwitching(true);
      } else {
        setIsInitialLoading(true);
      }

      const data = await getTvSeasonDetails(tvId, seasonNumber);
      setEpisodes(data?.episodes ?? []);

      setIsInitialLoading(false);
      setIsSwitching(false);
      hasFetchedOnce.current = true;
    },
    [tvId]
  );

  useEffect(() => {
    fetchEpisodes(selectedSeason);
  }, [selectedSeason, fetchEpisodes]);

  const sortedSeasons = [...seasons].sort(
    (a, b) => a.season_number - b.season_number
  );

  if (sortedSeasons.length === 0) return null;

  return (
    <div className="mt-20">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-6 h-[2px] bg-champagne" />
        <h2 className="text-xl font-semibold tracking-wide text-ink dark:text-ivory">
          Episodes
        </h2>
      </div>

      {/* Season selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {sortedSeasons.map((season) => (
          <button
            key={season.id}
            onClick={() => setSelectedSeason(season.season_number)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
              selectedSeason === season.season_number
                ? 'bg-champagne text-void'
                : 'bg-ink/5 dark:bg-ivory/10 text-ink/70 dark:text-ivory/70 hover:bg-ink/10 dark:hover:bg-ivory/15'
            }`}
          >
            {season.season_number === 0
              ? 'Specials'
              : `Season ${season.season_number}`}
          </button>
        ))}
      </div>

      {/* Episode list */}
      {isInitialLoading ? (
        <div className="flex justify-center py-12">
          <span className="relative flex w-6 h-6">
            <span className="absolute inset-0 border-2 rounded-full border-champagne/20" />
            <span className="absolute inset-0 border-2 border-transparent rounded-full border-t-champagne animate-spin" />
          </span>
        </div>
      ) : episodes.length === 0 ? (
        <p className="py-8 text-sm text-center text-muted">
          No episode data available for this season.
        </p>
      ) : (
        <div
          className={`space-y-3 transition-opacity duration-300 ${
            isSwitching ? 'opacity-40' : 'opacity-100'
          }`}
        >
          {episodes.map((episode) => (
            <div
              key={episode.id}
              className="flex flex-col gap-4 p-3 transition-colors duration-300 rounded-2xl sm:flex-row hover:bg-ink/[0.03] dark:hover:bg-ivory/[0.04]"
            >
              <div className="flex-shrink-0 w-full sm:w-44">
                {episode.still_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                    alt={episode.name}
                    className="object-cover w-full aspect-video rounded-xl ring-1 ring-ink/10 dark:ring-ivory/10"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full aspect-video rounded-xl bg-surface text-muted/50 ring-1 ring-ink/10 dark:ring-ivory/10">
                    <FaFilm className="text-xl" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-medium text-ink dark:text-ivory">
                    <span className="text-muted">
                      {episode.episode_number}.
                    </span>{' '}
                    {episode.name}
                  </h3>
                  {episode.vote_average > 0 && (
                    <span className="flex items-center flex-shrink-0 gap-1 text-xs text-champagne-dim dark:text-champagne">
                      <FaStar className="text-[10px]" />
                      {episode.vote_average.toFixed(1)}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted">
                  {episode.air_date
                    ? new Date(episode.air_date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'Unaired'}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink/60 dark:text-ivory/60 line-clamp-2">
                  {episode.overview || 'No description available.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
