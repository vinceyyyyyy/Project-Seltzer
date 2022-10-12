import React, {useRef, useState} from "react";
import {Link} from "react-router-dom";
import useOutsideClick from "../hooks/useOutsideClick";

export default function Nav(props: {
  menuItems: { name: string; path: string }[];
}) {
  const wrapperRef = useRef(null);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  useOutsideClick(wrapperRef, isNavExpanded, () => {
    setIsNavExpanded(false);
  });

  const menuItemList = props.menuItems.map((item) => (
    <li key={item.name}>
      <Link
        to={item.path}
        className="block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:text-blue-700 md:p-0"
      >
        {item.name}
      </Link>
    </li>
  ));

  return (
    <nav className="bg-gray-900 border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="self-center text-xl font-semibold whitespace-nowrap text-white p-2">
          Project Seltzer
        </div>
        <div ref={wrapperRef}>
          <button
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`${
            !isNavExpanded ? "hidden " : ""
          }w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul
            className="flex flex-col p-4 mt-4 rounded-lg border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white bg-gray-800 md:bg-gray-900 border-gray-700">
            {menuItemList}
          </ul>
        </div>
      </div>
    </nav>
  );
}
