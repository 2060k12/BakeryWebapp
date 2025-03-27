import React from "react";
import { IoMdCart } from "react-icons/io";
import Link from "next/link";

interface NavItemProps {
  href: string;
  label: string;
  children?: React.ReactNode; // Allow children
}

const NavItems: React.FC<NavItemProps> = ({ href, label, children }) => {
  return (
    <a href={href} className="flex items-center space-x-2 hover:text-gray-400">
      {children}
      <span>{label}</span>
    </a>
  );
};

const NavBar = () => {
  return (
    <nav className="flex items-center place-content-between px-0 py-8">
      <div className="flex items-center  ">
        <h1 className="text-4xl">Hamro</h1>
        <h1 className="text-4xl font-bold text-green-400">Karasabari</h1>
      </div>

      <div className="hidden md:flex space-x-6">
        <NavItem href="/" label="Home" />
        <NavItem href="/about" label="About" />
        <NavItem href="/explore" label="Explore" />
        <NavItem href="/search" label="Search" />
        <NavItems href="/cart" label="">
          <IoMdCart size={24} className="cursor-pointer" />
        </NavItems>
      </div>
    </nav>
  );
};

const NavItem = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} className="hover:text-green-400 transition text-xl pl-5">
    {label}
  </Link>
);

export default NavBar;
