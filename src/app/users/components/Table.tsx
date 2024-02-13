'use client';
import SearchInput from '@/app/components/SearchInput';
import { tableHead } from '@/bin/user';
import { useAllUser } from '@/frontend/hooks/user';
import { User } from '@/types/user';
import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

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

  let [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex flex-row absolute top-2 right-5 gap-2">
        <button
          className="px-4 py-1 shadow-md text-[10px] text-center rounded-md"
          onClick={() => setIsOpen(true)}
        >
          Create User
        </button>
        <SearchInput />
      </div>
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
                <td className="px-6 py-4 flex flex-row gap-3 items-center justify-center">
                  <PencilIcon className="w-5 h-5 text-gray-300 hover:text-gray-400" />
                  <TrashIcon className="w-5 h-5 text-red-300 hover:text-red-400" />
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
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel>
          <Dialog.Title>Deactivate account</Dialog.Title>
          <Dialog.Description>
            This will permanently deactivate your account
          </Dialog.Description>

          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>

          <button onClick={() => setIsOpen(false)}>Deactivate</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default Table;
