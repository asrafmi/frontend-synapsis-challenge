import { useCreateUser, useUpdateUser } from '@/frontend/hooks/user';
import { User } from '@/types/user';
import React, { useEffect, useState } from 'react';

interface DialogType {
  title: string;
  onAccept: () => void;
  onDecline: () => void;
  userDetail: User;
  mode?: 'create' | 'edit';
  closeModal: () => void;
}

const Dialog = ({
  title,
  onAccept,
  onDecline,
  userDetail,
  mode,
  closeModal,
}: DialogType) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    status: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (mode === 'edit' && userDetail) {
      setFormData(userDetail);
    }
    console.log('formData', formData);
  }, []);

  const {
    mutateAsync: mutateCreateUser,
    isSuccess: createSuccess,
    isError: createError,
  } = useCreateUser();

  const {
    mutateAsync: mutateUpdateUser,
    isSuccess: updateSuccess,
    isError: updateError,
  } = useUpdateUser();

  return (
    <div
      id="default-modal"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow transition-transform duration-300">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            data-modal-hide="default-modal"
            onClick={onDecline}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid gap-4 mb-6">
            <div>
              <label>Name</label>
              <input
                value={formData.name}
                name="name"
                onChange={handleChange}
                type="text"
                className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label>Email</label>
              <input
                value={formData.email}
                name="email"
                onChange={handleChange}
                type="email"
                className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label>Gender</label>
              <div className="flex items-center my-2">
                <input
                  onChange={handleChange}
                  id="default-radio-male"
                  type="radio"
                  value="male"
                  name="gender"
                  checked={formData.gender === 'male'}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="default-radio-male"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  Male
                </label>
              </div>
              <div className="flex items-center my-2">
                <input
                  onChange={handleChange}
                  id="default-radio-female"
                  type="radio"
                  value="female"
                  name="gender"
                  checked={formData.gender === 'female'}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="default-radio-female"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  Female
                </label>
              </div>
            </div>
            <div>
              <label>Status</label>
              <div className="flex items-center my-2">
                <input
                  onChange={handleChange}
                  id="default-radio-active"
                  type="radio"
                  value="active"
                  name="status"
                  checked={formData.status === 'active'}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="default-radio-active"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  Active
                </label>
              </div>
              <div className="flex items-center my-2">
                <input
                  onChange={handleChange}
                  id="default-radio-inactive"
                  type="radio"
                  value="inactive"
                  name="status"
                  checked={formData.status === 'inactive'}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="default-radio-inactive"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  Inactive
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center p-4 border-t border-gray-200 rounded-b gap-2">
          <button
            onClick={onDecline}
            data-modal-hide="default-modal"
            type="button"
            className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (mode === 'create') {
                mutateCreateUser({ body: formData });
              } else {
                mutateUpdateUser({
                  id: userDetail.id,
                  body: formData,
                });
              }
              closeModal();
            }}
            data-modal-hide="default-modal"
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
