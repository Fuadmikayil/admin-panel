import Link from "next/link";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex gap-12">
      <nav className="flex flex-col">
        <Link href="/adminPanel"> Home</Link>
        <Link href="/adminPanel/products"> Products</Link>
        <Link href="/adminPanel/orders"> Orders</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
