import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface PostItemsProps {
  id: number;
  title: string;
  description: string;
}

export type State = {
  posts: PostItemsProps[];
};

export type Actions = {
  addPost: (newPost: PostItemsProps) => void;
  editPost: (id: number, newPost: PostItemsProps) => void;
  deletePost: (id: number) => void;
};

export type StoreType = State & Actions;

const store = create<StoreType>()(
  devtools(
    persist(
      (set) => ({
        posts: [
          {
            id: 1,
            title: "Post 1",
            description: "Post 1 Description",
          },
          {
            id: 2,
            title: "Post 2",
            description: "Post 2 Description",
          },
        ],
        addPost: (newPost) => {
          set((state) => {
            return { posts: [...state.posts, newPost] };
          });
        },
        editPost: (id, updatePost) => {
          set((state) => {
            const updatePosts = state.posts.map((post) => {
              if (post.id === id) {
                return { ...post, ...updatePost };
              }
              return post;
            });

            return { posts: updatePosts };
          });
        },
        deletePost: (id) => {
          set((state) => {
            const updatePosts = state.posts.filter((post) => post.id !== id);
            return { posts: updatePosts };
          });
        },
      }),
      {
        name: "posts-store",
      }
    )
  )
);
const useStore = new Proxy(store, {
  get(target, prop) {
    if (prop === "setState") {
      return () => {
        throw new Error(
          `\`setState\` should not be used to mutate state directly on the 
        store, rather you should use actions that are defined within state
        slices to mutate the state in a safe way that will reject invalid
        state updates based on the provided Zod schema, as well as update
        the state tree in a more efficient manner with immutable structures.`
        );
      };
    }
    return Reflect.get(target, prop);
  },
});

export { store, useStore };
