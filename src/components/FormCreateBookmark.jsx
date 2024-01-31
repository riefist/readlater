"use client";
import { useRouter } from "next/navigation";

import { useAtom } from "jotai";
import toast from "react-hot-toast";
import { isEditMode } from "@/atoms/atoms";
import {
  bookmarkTitle,
  bookmarkDescription,
  bookmarkUrl,
  bookmarkDataId,
} from "@/atoms/atoms";

export const FormCreateBookmark = () => {
  const router = useRouter();
  const [title, setBookmarkTitle] = useAtom(bookmarkTitle);
  const [description, setBookmarkDescription] = useAtom(bookmarkDescription);
  const [url, setBookmarkUrl] = useAtom(bookmarkUrl);
  const [editMode, setEditMode] = useAtom(isEditMode);
  const [bookmarkId] = useAtom(bookmarkDataId);

  async function handleCreateBookmark() {
    const res = await fetch("https://v1.appbackend.io/v1/rows/PQJGOeAfm5jZ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          title,
          description,
          url,
        },
      ]),
    });

    resetUi();
    router.refresh();
    toast.success("Bookmark berhasil dibuat");
  }

  async function handleUpdate() {
    const res = await fetch("https://v1.appbackend.io/v1/rows/PQJGOeAfm5jZ", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: bookmarkId, title, description, url }),
    });
    resetUi(false);
    router.refresh();
    toast.success("Bookmark berhasil diupdate");
  }

  function resetUi() {
    setBookmarkTitle("");
    setBookmarkDescription("");
    setBookmarkUrl("");
    setEditMode(false);
  }

  if (editMode) {
    return (
      <div className="max-w-xl m-auto space-y-4">
        <input
          value={title}
          placeholder="Belajar CSS..."
          onChange={(e) => setBookmarkTitle(e.target.value)}
        />
        <textarea
          value={description}
          placeholder="Belajar penataan layout pada website menggunakan grid..."
          onChange={(e) => setBookmarkDescription(e.target.value)}
        ></textarea>
        <input
          value={url}
          placeholder="https://..."
          onChange={(e) => setBookmarkUrl(e.target.value)}
        />
        <div className="flex gap-2">
          <button onClick={handleUpdate}>Update</button>
          <button onClick={resetUi}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl m-auto space-y-4">
      <input
        value={title}
        placeholder="Belajar CSS..."
        onChange={(e) => setBookmarkTitle(e.target.value)}
      />
      <textarea
        value={description}
        placeholder="Belajar penataan layout pada website menggunakan grid..."
        onChange={(e) => setBookmarkDescription(e.target.value)}
      ></textarea>
      <input
        value={url}
        placeholder="https://..."
        onChange={(e) => setBookmarkUrl(e.target.value)}
      />
      <button onClick={handleCreateBookmark}>Save</button>
    </div>
  );
};
