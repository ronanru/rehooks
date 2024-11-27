import { useThrottle } from "./index";
import { useState } from "react";

function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const searchAPI = async (term: string) => {
    console.log("🔍 Searching for:", term);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [
      `Result 1 for ${term}`,
      `Result 2 for ${term}`,
      `Result 3 for ${term}`,
    ];
  };

  const handleSearch = useThrottle(
    async (term: string) => {
      if (term.trim() === "") {
        setResults([]);
        return;
      }
      const searchResults = await searchAPI(term);
      setResults(searchResults);
    },
    { wait: 1000 },
  );

  return (
    <div className="mx-auto max-w-md p-4">
      <div className="mb-4">
        <input
          type="text"
          className="w-full rounded border p-2"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e.target.value);
          }}
        />
        <div className="mt-1 text-sm text-gray-500">
          Try typing quickly - the search is throttled to once per second
        </div>
      </div>

      <div className="space-y-2">
        {results.map((result, index) => (
          <div key={index} className="rounded border p-2">
            {result}
          </div>
        ))}
      </div>
    </div>
  );
}
