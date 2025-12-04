import  { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPerson, getPersonCombinedCredits} from "../api/index"
import { FaBirthdayCake, FaMapMarkerAlt } from 'react-icons/fa';

export default function PersonPage() {
  const { id } = useParams();
  const [person, setPerson] = useState({});
  const [credits, setCredits] = useState({ cast: []});
  const [loading, setLoading] = useState(true);
  const [bioExpanded, setBioExpanded] = useState(false);
console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [personData, creditsData] = await Promise.all([
        getPerson(id),
        getPersonCombinedCredits(id),
      ]);
      setPerson(personData);
      setCredits(creditsData);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <div className="w-12 h-12 border-4 rounded-full border-t-yellow-400 border-white/20 animate-spin"></div>
      </div>
    );
  }
     console.log(person);
     console.log(credits);
     
     
  const knownFor = credits.cast
    .sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0))
    .slice(0, 30);

  const biography = person.biography || 'No biography available.';
  const shouldTruncate = biography.split('\n').join(' ').split(' ').length > 80;

  return (
    <div className="min-h-screen text-black bg-white dark:bg-black/80">
      <div className="px-6 pt-32 mx-auto text-black max-w-7xl dark:text-white">
        <div className="flex flex-col gap-12 md:flex-row">
          <div className="flex-shrink-0">
            {person.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                alt={person.name}
                className="w-80 h-[30rem] object-cover rounded-3xl shadow-2xl ring-2 ring-white/20"
              />
            ) : (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 w-80 h-[30rem] rounded-3xl flex items-center justify-center text-8xl font-bold text-black shadow-2xl">
                ?
              </div>
            )}
          </div>

          <div className="flex-1 space-y-8 text-black dark:text-white">
            <div>
              <h1 className="text-5xl font-black leading-none tracking-tight md:text-7xl">
                {person.name}
              </h1>

              <div className="flex flex-wrap gap-6 mt-6 text-black dark:text-white">
                {person.birthday && (
                  <div className="flex items-center gap-2">
                    <FaBirthdayCake className="w-5 h-5" />
                    <span className="text-lg">
                      {new Date(person.birthday).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                      {person.deathday && (
                        <span className="text-black dark:text-white">
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

                {person.place_of_birth && (
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="w-5 h-5" />
                    <span className="text-lg">{person.place_of_birth}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-lg leading-relaxed text-black dark:text-white">
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
                  className="mt-3 font-medium text-yellow-400 transition-colors hover:text-yellow-300 dark:text-yellow-400"
                >
                  ... Read more
                </button>
              )}

              {bioExpanded && (
                <button
                  onClick={() => setBioExpanded(false)}
                  className="mt-3 font-medium text-yellow-400 transition-colors hover:text-yellow-300 dark:text-yellow-400"
                >
                  Show less
                </button>
              )}
            </div>
          </div>
        </div>

        {knownFor.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-8 text-3xl font-bold tracking-wider text-black uppercase dark:text-white">
              Known For
            </h2>
            <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6">
              {knownFor.map((item) => (
                <Link
                  key={item.id}
                  to={
                    item.media_type === 'movie'
                      ? `/movie/${item.id}`
                      : `/tv/${item.id}`
                  }
                  className="block transition-all duration-300 group"
                >
                  <div className="overflow-hidden shadow-xl rounded-2xl ring-1 ring-white/10">
                    <img
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                          : '/placeholder-poster.jpg'
                      }
                      alt={item.title || item.name}
                      className="w-full aspect-[2/3] object-cover transition-all group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm font-medium text-black line-clamp-2 dark:text-white">
                      {item.title || item.name}
                    </p>
                    <p className="mt-1 text-xs text-black dark:text-white">
                      {item.release_date?.slice(0, 4) ||
                        item.first_air_date?.slice(0, 4) ||
                        '—'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
