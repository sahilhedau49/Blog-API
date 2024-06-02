import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { CgMenu, CgClose } from "react-icons/cg";

const Navbar = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="flex text-[#112D4E] border-b-2 border-slate-950 justify-between overflow-x-hidden py-6 px-24 md:px-2">
      <div>
        <Link to={"/"}>
          <p className="text-2xl font-semibold">Blog App</p>
        </Link>
      </div>
      <div
        className={`flex place-items-center gap-10 md:duration-300 md:flex-col md:z-10 md:gap-8 mobile-nav-bg md:text-black md:absolute md:top-0 md:py-20 md:left-0 md:w-[100vw] md:h-fit ${
          openMenu ? "md:translate-x-0" : "md:hidden"
        }`}
      >
        {isAuthenticated && (
          <Link
            className="text-lg md:text-xl font-semibold md:font-medium duration-300 "
            to={"/createPost"}
          >
            Write a Blog
          </Link>
        )}
        {!isAuthenticated && (
          <Link
            className="text-lg md:text-xl font-semibold md:font-medium duration-300"
            onClick={() => loginWithRedirect()}
          >
            LogIn
          </Link>
        )}
        {isAuthenticated && (
          <button
            className="text-lg md:text-xl font-semibold md:font-medium duration-300"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            LogOut
          </button>
        )}
        {isAuthenticated && (
          <div className="flex gap-4 place-items-center">
            <img
              src={user.picture}
              className="w-8 md:w-10 rounded-full"
              alt="user"
            />
            <div className="text-lg md:text-xl md:font-medium font-semibold duration-300">
              {user.name}
            </div>
          </div>
        )}
      </div>
      <div
        className={`hidden md:inline-block py-3 md:z-50 text-3xl text-slate-950`}
      >
        <CgMenu
          name="menu-outline"
          className={`absolute top-6 right-8 ${
            openMenu ? "md:hidden" : "md:inline-block"
          }`}
          onClick={() => setOpenMenu(true)}
        />
        <CgClose
          name="close-outline"
          className={`absolute top-6 right-8 ${
            openMenu ? "md:inline-block" : "md:hidden"
          }`}
          onClick={() => setOpenMenu(false)}
        />
      </div>
    </div>
  );
};

export default Navbar;
