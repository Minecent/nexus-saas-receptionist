import Link from 'next/link'

const links = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'AI Receptionist', href: '#features' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: 'mailto:contact@nexus.ai' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="text-lg font-bold tracking-tight text-white">
              NEXUS<span className="text-teal-400">.</span>
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              AI receptionists that never miss a call. Answer calls. Take messages. Book
              appointments. Grow faster.
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 transition-colors hover:text-white"
              >
                Twitter
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 transition-colors hover:text-white"
              >
                GitHub
              </a>
            </div>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                {group}
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-500 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-xs text-slate-600">
          © {new Date().getFullYear()} NEXUS AI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
