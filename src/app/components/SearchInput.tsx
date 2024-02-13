interface SearcInput {
  label?: string;
  placeholder: string;
  onChange: () => void;
  onKeyPress: () => void;
}

const SearchInput = ({ label, placeholder, onChange, onKeyPress }) => {
  return (
    <form>
      {label && (
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              style={{
                strokeWidth: 2,
                strokeLinejoin: 'round',
                strokeLinecap: 'round',
              }}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          placeholder={placeholder}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </div>
    </form>
  );
};

export default SearchInput;
