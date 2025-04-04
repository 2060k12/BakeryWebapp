"use client";
import React, { useState } from "react";

import { IoMdCart } from "react-icons/io";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="md:flex-row md:flex flex flex-col md:items-center md:place-content-between px-6 pt-8 md:px-8  ">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <h1 className="text-4xl">Hamro</h1>
          <h1 className="text-4xl font-bold text-green-400">Karasabari</h1>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-3xl py-2 rounded-md hover:text-green-500 dark:hover:bg-gray-700 hover:cursor-pointer"
          >
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      <div
        className={`md:flex-row flex flex-col  md:gap-x-6 ${
          !isMenuOpen ? "hidden sm:flex" : ""
        } items-center justify-center mx-auto w-full`}
      >
        <NavItem href="/" label="Home" />
        <NavItem href="/about" label="About" />
        <NavItem href="/explore" label="Explore" />
        <NavItem href="/search" label="Search" />
        <NavItems href="/cart" label="">
          <button className=" flex justify-between place-items-center cursor-pointerborder-2 md:border-0 hover:cursor-pointer hover:text-white border-gray-700 hover:bg-green-500 border-2 m-1 p-1  ">
            <IoMdCart className="  m-1 text-3xl " />
            <h4 className="md:hidden text-xl ">Cart</h4>
          </button>
        </NavItems>
      </div>
    </nav>
  );
};

const NavItem = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="hover:text-white hover:bg-green-500 hover:border-green-500  hover:cursor-pointer text-center transition text-xl border-gray-700 border-2 md:border-0 w-full md:w-auto m-1 py-2 md:py-0 rounded:xl"
  >
    {label}
  </Link>
);
export default NavBar;
