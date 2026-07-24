import { WatchProviderRegion, WatchProvider } from '@/types/tmdb';

interface WatchProvidersProps {
  providers: WatchProviderRegion | null;
}

function ProviderRow({
  label,
  items,
  link,
}: {
  label: string;
  items: WatchProvider[];
  link: string;
}) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-medium tracking-[0.2em] uppercase text-muted">
        {label}
      </p>
      <div className="flex flex-wrap gap-2.5">
        {items
          .slice()
          .sort(
            (a, b) => (a.display_priority ?? 99) - (b.display_priority ?? 99)
          )
          .map((provider) => (
            <a
              key={provider.provider_id}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              title={`Watch on ${provider.provider_name}`}
              className="block transition-transform duration-200 rounded-xl hover:scale-105"
            >
              <img
                src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                alt={provider.provider_name}
                className="w-10 h-10 rounded-xl ring-1 ring-ink/10 dark:ring-ivory/10 shadow-subtle"
              />
            </a>
          ))}
      </div>
    </div>
  );
}

export default function WatchProviders({ providers }: WatchProvidersProps) {
  if (!providers) return null;

  const { flatrate, rent, buy, link } = providers;
  const hasAny =
    (flatrate && flatrate.length > 0) ||
    (rent && rent.length > 0) ||
    (buy && buy.length > 0);

  if (!hasAny) return null;

  return (
    <div className="space-y-4">
      <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-champagne-dim dark:text-champagne">
        Where to Watch
      </p>

      <div className="flex flex-wrap gap-8">
        {flatrate && flatrate.length > 0 && (
          <ProviderRow label="Stream" items={flatrate} link={link} />
        )}
        {rent && rent.length > 0 && (
          <ProviderRow label="Rent" items={rent} link={link} />
        )}
        {buy && buy.length > 0 && (
          <ProviderRow label="Buy" items={buy} link={link} />
        )}
      </div>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-[11px] text-muted hover:text-ink dark:hover:text-ivory transition-colors"
      >
        Data provided by JustWatch
      </a>
    </div>
  );
}
