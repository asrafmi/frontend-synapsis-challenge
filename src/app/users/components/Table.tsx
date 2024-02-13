'use client';
import React, { useEffect, useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import SearchInput from '@/app/components/SearchInput';
import { tableHead } from '@/bin/user';
import {
  useAllUser,
  useDeleteUserById,
  useSearchUser,
} from '@/frontend/hooks/user';
import { User } from '@/types/user';
import Dialog from '@/app/components/Dialog';

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogMode, setDialogMode] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({} as User);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const { data, isLoading, refetch } = useAllUser({
    page: currentPage,
    per_page: 10,
    name: searchQuery,
  });

  const users: User[] = data?.data;

  const {
    mutateAsync: mutateDeleteUser,
    isSuccess: deleteSuccess,
    isError: deleteError,
  } = useDeleteUserById();

  useEffect(() => {
    refetch({ page: currentPage, name: searchQuery } as any);
  }, [currentPage, searchQuery]);

  const totalPages = Math.min(Math.ceil(1000 / 10), 5);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const handleAccept = () => {
    setIsDialogOpen(false);
  };

  const handleDecline = () => {
    setIsDialogOpen(false);
  };
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex flex-col absolute top-2 right-5 gap-2 sm:flex-row">
          <button
            className="ms-3 text-gray-500 shadow-sm bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5"
            onClick={() => {
              setDialogMode('create');
              setIsDialogOpen(true);
            }}
          >
            Create User
          </button>
          <SearchInput
            placeholder={'Search User'}
            onChange={handleSearchChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleKeyPress(e);
              }
            }}
          />
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
                  <td className="px-6 py-4 text-center">{item.gender}</td>
                  <td className="px-6 py-4 text-center">{item.status}</td>
                  <td className="px-6 py-4 flex flex-row gap-3 items-center justify-center">
                    <PencilIcon
                      onClick={() => {
                        setSelectedUser(item);
                        setIsDialogOpen(true);
                        setDialogMode('edit');
                      }}
                      className="w-5 h-5 text-gray-300 hover:text-gray-400"
                    />
                    <TrashIcon
                      onClick={() => mutateDeleteUser({ id: item.id })}
                      className="w-5 h-5 text-red-300 hover:text-red-400"
                    />
                  </td>
                </tr>
              ))
            ) : isLoading ? (
              <tr>
                <td className="text-gray-950 p-4">Loading...</td>
              </tr>
            ) : (
              <tr>
                <td className="text-gray-950 p-4">No Data :(</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {users && (
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
      {isDialogOpen && (
        <Dialog
          userDetail={selectedUser}
          title={dialogMode === 'edit' ? 'Edit User' : 'Create User'} // Title based on edit mode
          mode={dialogMode === 'edit' ? 'edit' : 'create'} //
          onAccept={handleAccept}
          onDecline={handleDecline}
          closeModal={() => setIsDialogOpen(false)}
        />
      )}
    </>
  );
};

export default Table;
