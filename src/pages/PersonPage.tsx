import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPerson, getPersonCombinedCredits } from '../api/index';
import { FaBirthdayCake, FaMapMarkerAlt } from 'react-icons/fa';
import { Person, PersonCombinedCredits, CreditItem } from '@/types/tmdb';

export default function PersonPage() {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [credits, setCredits] = useState<PersonCombinedCredits | null>(null);
  const [loading, setLoading] = useState(true);
  const [bioExpanded, setBioExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [personData, creditsData] = await Promise.all([
          getPerson(String(id)),
          getPersonCombinedCredits(String(id)),
        ]);

        setPerson(personData);
        setCredits(creditsData);
      } catch (error) {
        console.error('Failed to fetch person data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-paper dark:bg-void">
        <span className="relative flex w-8 h-8">
          <span className="absolute inset-0 border-2 rounded-full border-champagne/20" />
          <span className="absolute inset-0 border-2 border-transparent rounded-full border-t-champagne animate-spin" />
        </span>
        <span className="text-xs font-medium tracking-[0.25em] uppercase text-muted">
          Loading
        </span>
      </div>
    );
  }

  const knownFor: CreditItem[] =
    credits?.cast
      ?.filter((item) => !!item.poster_path)
      .sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0))
      .slice(0, 30) ?? [];

  const biography = person?.biography || 'No biography available.';

  const shouldTruncate = biography.split('\n').join(' ').split(' ').length > 80;

  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-void dark:text-ivory">
      <div className="px-6 pt-32 pb-20 mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 md:flex-row">
          <div className="flex-shrink-0">
            {person?.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                alt={person.name}
                className="w-72 h-[26rem] mx-auto object-cover rounded-2xl ring-1 ring-ink/10 dark:ring-ivory/10 shadow-subtle"
              />
            ) : (
              <div className="bg-surface w-72 h-[26rem] rounded-2xl flex items-center justify-center text-6xl font-medium text-muted ring-1 ring-ink/10 dark:ring-ivory/10">
                ?
              </div>
            )}
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                {person?.name}
              </h1>

              <div className="flex flex-wrap gap-6 mt-4 text-sm text-ink/60 dark:text-ivory/60">
                {person?.birthday && (
                  <div className="flex items-center gap-2">
                    <FaBirthdayCake className="w-3.5 h-3.5 text-champagne-dim dark:text-champagne" />
                    <span>
                      {new Date(person.birthday).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                      {person.deathday && (
                        <span>
                          {' '}
                          —{' '}
                          {new Date(person.deathday).toLocaleDateString(
                            'en-GB',
                            {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            }
                          )}
                        </span>
                      )}
                    </span>
                  </div>
                )}

                {person?.place_of_birth && (
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="w-3.5 h-3.5 text-champagne-dim dark:text-champagne" />
                    <span>{person.place_of_birth}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-base leading-relaxed text-ink/70 dark:text-ivory/70">
              <p
                className={`transition-all duration-500 ${
                  bioExpanded ? '' : 'line-clamp-4'
                }`}
              >
                {biography}
              </p>

              {shouldTruncate && !bioExpanded && (
                <button
                  onClick={() => setBioExpanded(true)}
                  className="mt-3 text-sm font-medium transition-colors text-champagne-dim dark:text-champagne hover:opacity-75"
                >
                  Read more
                </button>
              )}

              {bioExpanded && (
                <button
                  onClick={() => setBioExpanded(false)}
                  className="mt-3 text-sm font-medium transition-colors text-champagne-dim dark:text-champagne hover:opacity-75"
                >
                  Show less
                </button>
              )}
            </div>
          </div>
        </div>

        {knownFor.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-[2px] bg-champagne" />
              <h2 className="text-xl font-semibold tracking-wide">Known For</h2>
            </div>
            <div className="grid grid-cols-3 gap-x-5 gap-y-8 sm:grid-cols-4 md:grid-cols-6">
              {knownFor.map((item) => {
                const isMovie = !!item.title && !!item.release_date;

                return (
                  <Link
                    key={item.id}
                    to={isMovie ? `/movie/${item.id}` : `/tv/${item.id}`}
                    className="block transition-opacity duration-300 group hover:opacity-80"
                  >
                    <div className="overflow-hidden transition-shadow duration-300 rounded-2xl bg-surface ring-1 ring-ink/10 dark:ring-ivory/10 shadow-subtle group-hover:shadow-lifted">
                      <img
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                            : '/placeholder-poster.jpg'
                        }
                        alt={item.title || item.name}
                        className="w-full aspect-[2/3] object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-sm font-medium line-clamp-2 text-ink dark:text-ivory/90">
                        {item.title || item.name}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        {item.release_date?.slice(0, 4) ||
                          item.first_air_date?.slice(0, 4) ||
                          '—'}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
