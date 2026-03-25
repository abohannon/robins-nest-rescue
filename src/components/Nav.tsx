import { useState } from 'react';

interface NavProps {
  currentPath?: string;
}

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
];

export function Nav({ currentPath = '/' }: NavProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="/" className="font-heading text-xl font-bold text-primary no-underline">
          Robin's Nest Rescue
        </a>
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((prev) => !prev)}
          className="block cursor-pointer border-none bg-transparent p-1 text-2xl text-text md:hidden"
        >
          {open ? '✕' : '☰'}
        </button>
        <nav
          role="navigation"
          data-open={open}
          className={`items-center gap-6 md:flex ${open ? 'absolute left-0 right-0 top-full flex flex-col border-b border-border bg-white p-6' : 'hidden'}`}
        >
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              aria-current={currentPath === href ? 'page' : undefined}
              className={`font-body text-sm no-underline hover:text-primary ${
                currentPath === href ? 'font-semibold text-primary' : 'text-text'
              }`}
            >
              {label}
            </a>
          ))}
          <a
            href="/donate"
            className="rounded-md bg-accent px-4 py-2 font-body text-sm font-semibold text-white no-underline hover:bg-accent-dark"
          >
            Donate
          </a>
        </nav>
      </div>
    </header>
  );
}
