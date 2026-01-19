'use client';

import { SignedIn, SignedOut, SignInButton, useClerk } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Files, PencilLine } from 'lucide-react';

export default function SiteNav() {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const isActive = (path: string) => pathname === path;

  const linkClass =
    'flex items-center font-bold gap-2 text-xs cursor-pointer text-slate-400 uppercase hover:text-slate-900';
  const activeLinkClass = 'text-slate-900';
  const inactiveLinkClass = 'text-slate-400';

  const getLinkClasses = (path: string) => {
    return `${linkClass} ${isActive(path) ? activeLinkClass : inactiveLinkClass}`;
  };

  return (
    <header className='h-8 w-full bg-slate-50 px-4'>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <nav className='flex min-h-8 w-full items-center justify-between'>
          <div className='flex gap-4'>
            <Link href='/' className={getLinkClasses('/')}>
              <Files className='h-4 w-4' /> Files
            </Link>
            <Link href='/draw' className={getLinkClasses('/draw')}>
              <PencilLine className='h-4 w-4' /> Draw
            </Link>
          </div>
          <span className={linkClass} onClick={() => signOut()}>
            Sign Out
          </span>
        </nav>
      </SignedIn>
    </header>
  );
}
