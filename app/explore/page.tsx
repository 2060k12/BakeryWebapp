import React from "react";
import PhotoView from "../components/PhotoView";

const Explore = () => {
  return (
    <div className="px-24 py-16">
      {/* The navigation bar inside the explore page */}
      <nav className="flex space-x-8 text-2xl">
        <h3 className="font-bold underline">Photos</h3>
        <h3>videos</h3>
        <h3>SocialMedia</h3>
        <h3>CreateYourOwn</h3>
      </nav>

      {/* This is the explore page Feed */}
      <div className="flex flex-wrap gap-6 my-12 justify-center ">
        <PhotoView image="/images/cake1.jpg" imageAlt="Sample Image" />
        <PhotoView image="/images/cake2.jpg" imageAlt="Sample Image" />
        <PhotoView image="/images/cake3.jpg" imageAlt="Sample Image" />
        <PhotoView image="/images/cake4.jpg" imageAlt="Sample Image" />
        <PhotoView image="/images/cake5.jpg" imageAlt="Sample Image" />
        <PhotoView image="/images/cake6.jpg" imageAlt="Sample Image" />
        <PhotoView image="/images/cake7.jpg" imageAlt="Sample Image" />
      </div>
    </div>
  );
};

export default Explore;
