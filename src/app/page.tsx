'use client';
import { useEffect, useState } from 'react';
import { useAllPost } from '@/frontend/hooks/post';
import Card from './components/Card';
import { Post } from '@/types/post';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch } = useAllPost({
    page: currentPage,
    per_page: 10,
  });

  const posts: Post[] = data?.data;

  useEffect(() => {
    refetch({ page: currentPage } as any);
  }, [currentPage, refetch]);

  const totalPages = Math.min(Math.ceil(1000 / 10), 5);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl bg-gray-50">
      <h1 className="text-gray-900 font-bold">Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
        {posts && posts.length ? (
          posts.map((post) => (
            <Card
              key={post.id}
              title={post.title}
              body={post.body}
              id={post.id}
            />
          ))
        ) : isLoading ? (
          <p className="text-gray-900">loading...</p>
        ) : (
          <p className="text-gray-900">No posts found.</p>
        )}
      </div>
      {posts && (
        <nav
          className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{' '}
            <span className="font-semibold text-gray-900">
              {(currentPage - 1) * 10 + 1}-{Math.min(currentPage * 10, 1000)}
            </span>{' '}
            of <span className="font-semibold text-gray-900">50</span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                    currentPage === index + 1 ? 'font-semibold' : ''
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() =>
                  handlePageChange(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </main>
  );
}
