import React from "react";
import { Bookmark } from "./Bookmark";

export const SavedBookmark = ({ data }) => {
  return (
    <div className="grid grid-cols-3 gap-4 max-w-7xl m-auto">
      {data.map((item, index) => {
        return <Bookmark key={index} item={item} />;
      })}
    </div>
  );
};
