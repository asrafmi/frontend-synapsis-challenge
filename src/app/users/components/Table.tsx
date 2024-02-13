'use client';
import { tableHead } from '@/bin/user';
import { useAllUser } from '@/frontend/hooks/user';
import { User } from '@/types/user';
import { useEffect, useState } from 'react';

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch } = useAllUser({
    page: currentPage,
    per_page: 10,
  });

  const users: User[] = data?.data;
  console.log('users', users);

  useEffect(() => {
    refetch({ page: currentPage } as any);
  }, [currentPage, refetch]);

  const totalPages = Math.min(Math.ceil(1000 / 10), 5);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white">
          Our Lists
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {tableHead.map((item) => (
              <th key={item.label} scope="col" className={item.class}>
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users && users.length ? (
            users.map((item, index) => (
              <tr className="bg-white border-b" key={index}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.gender}</td>
                <td className="px-6 py-4">{item.status}</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-60 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))
          ) : isLoading ? (
            <tr>
              <td className="border-2 text-gray-950">Loading...</td>
            </tr>
          ) : (
            <tr>
              <td className="border-2 text-gray-950">No Data :(</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
