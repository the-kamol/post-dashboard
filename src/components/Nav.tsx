import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Logo from 'assets/brand/logo.svg';

interface NavProps {
  navItems: {
    id: number;
    title: string;
    image: string;
    link: string;
  }[];
}

export const Nav: React.FC<NavProps> = (props) => {
  const [navbar, setNavbar] = useState(false);
  return (
    <nav className="md:h-screen md:min-w-[208px]">
      <div className="h-12 border-b-[1px] border-slate-200 flex items-center px-3 md:px-6 justify-between py-1 md:py-4">
        <Link href="/">
          <Image src={Logo} alt="Logo Zotify" />
        </Link>
        <div className="md:hidden">
          <button
            className="p-2 text-gray-700 border-2 border-transparent outline-none focus:border-blue-300"
            onClick={() => setNavbar(!navbar)}
            type="button"
          >
            {navbar ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-slate-800"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-slate-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div
        className={`pb-3 md:block bg-blue-500 md:bg-white ${
          navbar ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex-col items-start space-y-2 p-3 flex">
          {props.navItems.map((navItem) => (
            <li
              className="text-black md:w-full btn"
              key={
                props.navItems.length === 0
                  ? 1
                  : Number(props.navItems[props.navItems.length - 1].id) +
                    Number(1)
              }
            >
              <Link
                href={navItem.link}
                className="py-2 px-[18px] md:rounded-lg md:w-full rounded-md flex items-center bg-secondary"
              >
                <Image
                  className="mr-2"
                  src={navItem.image}
                  alt={navItem.title}
                />
                {navItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
