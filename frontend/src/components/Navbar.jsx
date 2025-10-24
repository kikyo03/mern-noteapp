import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        {/* Flex container for logo and button */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold font-poppins tracking-tighter">
            Notes
          </h1>

          <Link to="/create" className="btn flex items-center gap-2">
            <PlusIcon className="size-5" />
            <span>New Note</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
