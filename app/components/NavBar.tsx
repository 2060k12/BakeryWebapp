import React from "react";
import { IoMdCart } from "react-icons/io";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="flex items-center place-content-between px-16 py-8">
      <div className="flex items-center  ">
        <h1 className="text-4xl">Hamro</h1>
        <h1 className="text-4xl font-bold text-green-400">Karasabari</h1>
      </div>

      <div className="hidden md:flex space-x-6">
        <NavItem href="/" label="Home" />
        <NavItem href="/about" label="About" />
        <NavItem href="/explore" label="Explore" />
        <NavItem href="/search" label="Search" />
        <div className="pl-5">
          <IoMdCart size={24} className="cursor-pointer hover:text-gray-400" />
        </div>
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
