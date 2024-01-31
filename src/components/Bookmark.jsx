"use client";

import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import {
  isEditMode,
  bookmarkTitle,
  bookmarkDescription,
  bookmarkUrl,
  bookmarkDataId,
} from "@/atoms/atoms";

export const Bookmark = ({ item }) => {
  const router = useRouter();

  const [editMode, setIsEditMode] = useAtom(isEditMode);
  const [title, setBookmarkTitle] = useAtom(bookmarkTitle);
  const [description, setBookmarkDescription] = useAtom(bookmarkDescription);
  const [url, setBookmarkUrl] = useAtom(bookmarkUrl);
  const [id, setBookmarkDataId] = useAtom(bookmarkDataId);

  //Delete Data
  async function handleDelete() {
    const res = await fetch("https://v1.appbackend.io/v1/rows/PQJGOeAfm5jZ", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([item._id]),
    });
    const data = await res.json();
    console.log(data);

    router.refresh();
  }
  //Update Data
  function handleUpdate() {
    setIsEditMode(true);
    setBookmarkTitle(item.title);
    setBookmarkDescription(item.description);
    setBookmarkUrl(item.url);
    setBookmarkDataId(item._id);
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow gap-4 flex flex-col justify-between">
      <div className="flex">
        <div className="flex-1">
          <div>{item.title}</div>
          <p className="text-gray-400 text-sm mb-4">{item.description}</p>
        </div>
        <div className="flex bg-gray-200 h-fit p-2 rounded-xl gap-2">
          <img
            onClick={handleUpdate}
            src="/edit.png"
            className="w-[20px] h-[20px] hover:cursor-pointer"
          />
          <img
            onClick={handleDelete}
            src="/trash.png"
            className="w-[20px] h-[20px] hover:cursor-pointer"
          />
        </div>
      </div>
      <div className="flex gap-1">
        <img src="/link.png" className="w-[18px] h-[18px]" />
        <a href={item.url} className="text-gray-500 text-sm ">
          {item.url}
        </a>
      </div>
    </div>
  );
};
