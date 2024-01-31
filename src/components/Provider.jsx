"use client";
import * as React from "react";
import { Toaster } from "react-hot-toast";

export const Provider = ({ children }) => {
  return (
    <>
      <div>{children}</div>
      <Toaster />
    </>
  );
};
