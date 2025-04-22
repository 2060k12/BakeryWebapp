import React from "react";

const Footer = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full p-6 bg-black text-white  mt-2 md:mt-16">
      <ul className="flex gap-3">
        <li>Help</li>
        <li>Terms & condition</li>
        <li>Contact US</li>
        <li>FAQ</li>
      </ul>
      <ul className="flex gap-3">
        <li>Instagram</li>
        <li>Facebook</li>
        <li>TikTok</li>
      </ul>
      <h1 className="text-2xl font-bold"> HamroKarasabari</h1>
      <span className="">© 2024, BeatByte. All right reserved</span>
    </section>
  );
};

export default Footer;
