import React from "react";

const page = () => {
  return (
    <div className="m-16">
      <form
        action="post"
        className="border-black border-2 p-12 w-2/5 flex-col m-auto rounded-xl "
      >
        <h1 className="text-xl ">LOGIN</h1>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="border-grey-400 border-2 rounded-sm w-full p-3 text-xl"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="border-grey-400 border-2 rounded-sm  w-full p-3 text-xl"
          />
        </div>

        <button
          type="submit"
          className="bg-green-400 py-3 text-2xl font-bold text-white w-full rounded-sm hover:cursor-pointer hover:bg-green-300 "
        >
          Login
        </button>

        <h3 className="text-right">Forgot password?</h3>
      </form>
    </div>
  );
};

export default page;
