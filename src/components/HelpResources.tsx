import helpLinks from '../data/helpLinks.json' assert { type: 'json' }

function formatTitle(key: string) {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function HelpResources() {
  return (
    <div className="space-y-8">
      {Object.entries(helpLinks.videos).map(([category, links]) => (
        <section key={category}>
          <h2 className="text-xl font-semibold mb-2">{formatTitle(category)}</h2>
          <ul className="list-disc list-inside space-y-1">
            {links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
      {Object.entries(helpLinks.songs).map(([type, instruments]) => (
        <section key={type}>
          <h2 className="text-xl font-semibold mb-2">
            {formatTitle(type)} Songs
          </h2>
          {Object.entries(instruments).map(([instrument, songs]) => (
            <div key={instrument} className="mb-4">
              <h3 className="text-lg font-medium mb-1">
                {formatTitle(instrument)}
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {songs.map((song) => (
                  <li key={song.url}>
                    <a
                      href={song.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {song.title}
                      {song.artist ? ` — ${song.artist}` : ''}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
