'use client';
import { useAllPost } from '@/frontend/hooks/post';
import { loadBindings } from 'next/dist/build/swc';
import Image from 'next/image';

export default function Home() {
  const { data, isLoading } = useAllPost();
  console.log('data', data);
  const posts: Post[] = data?.data;
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl bg-gray-50">
      <h1 className="text-black font-bold">Blogs</h1>
      {posts && posts.length ? (
        posts.map((post) => (
          <p key={post.id} className="text-black">
            {post.title}
          </p>
        ))
      ) : isLoading ? (
        <p className="text-black">loading...</p>
      ) : (
        <p className="text-black">No posts found.</p>
      )}
    </main>
  );
}
