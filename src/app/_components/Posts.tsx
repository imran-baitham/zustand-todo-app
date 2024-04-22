"use client";

import { MouseEvent, useState } from "react";
import { PostItemsProps, useStore } from "../_store/useStore";

export default function Posts() {
  const { posts, addPost, editPost, deletePost } = useStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [postId, setPostId] = useState<number>();

  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!title && !description) return;

    const newPost = {
      id: Date.now(),
      title,
      description,
    };

    addPost(newPost);

    setTitle("");
    setDescription("");
  }

  function handleEditPost(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!title && !description) return;

    const updatedPost: PostItemsProps = {
      id: postId!,
      title,
      description,
    };

    editPost(updatedPost.id, updatedPost);
    setTitle("");
    setDescription("");

    setIsEdit(false);
  }

  const EditPost = (postId: number) => {
    const post = posts.filter((post) => post.id === postId)[0];
    setTitle(post.title);
    setDescription(post.description);
    setPostId(postId);
    setIsEdit(true);
  };
  const handleRemovePost = (postId: number) => {
    deletePost(postId);
  };

  return (
    <section className="space-y-5 w-[350px]">
      <form className="space-y-3">
        <input
          type="text"
          className="block w-full rounded-lg text-lg outline-none py-2 px-3 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 ring-2 focus:ring-inset ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="block w-full rounded-lg text-lg outline-none py-2 px-3 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 ring-2 focus:ring-inset ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={isEdit ? handleEditPost : handleSubmit}
          className="py-2 w-full rounded-lg bg-blue-500 text-white border-none"
          type="submit"
        >
          {isEdit ? "Edit Post" : "Add New Post"}
        </button>
      </form>

      {posts.length > 0 ? (
        posts.map((post: PostItemsProps, index: number) => (
          <div key={index} className="border p-5 rounded-lg max-w-lg">
            <h1 className="font-bold text-xl">{post.title}</h1>
            <p>{post.description}</p>
            <div className="flex justify-between pt-2 space-x-2">
              <button
                className="p-1 border w-full rounded-lg"
                onClick={() => EditPost(post.id)}
              >
                Edit
              </button>
              <button
                className="p-1 border w-full rounded-lg bg-red-500 text-white"
                onClick={() => handleRemovePost(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">
          <b>No Posts Found</b>
        </div>
      )}
    </section>
  );
}
