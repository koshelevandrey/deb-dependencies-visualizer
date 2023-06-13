import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-gray-700 to-gray-800 p-3 text-sm text-white">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};
