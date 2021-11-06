import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function Search({ hasOptions, options, onSearch }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(options[0].value);

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(query, status);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="sm:flex items-center bg-white rounded-lg overflow-hidden justify-between px-2 py-1"
    >
      <input
        className="text-base text-gray-400 flex-grow outline-none px-2 "
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Nhập từ khóa ở đây..."
      />

      <div className="sm:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
        {hasOptions && (
          <select
            defaultValue={status}
            onChange={e => setStatus(e.target.value)}
            className="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg"
          >
            {options?.map((opt, idx) => (
              <option key={idx} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
        <Button
          type="submit"
          colorScheme="purple"
          p={4}
          rightIcon={<BsSearch />}
        >
          Tìm kiếm
        </Button>
      </div>
    </form>
  );
}
