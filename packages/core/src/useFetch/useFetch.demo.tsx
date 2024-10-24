import { useFetch } from "./index";

interface User {
  id: number;
  name: string;
}

export default function Component() {
  const { data, error, isLoading, revalidate } = useFetch<User[]>(
    "https://api.example.com/users",
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map((user) => <div key={user.id}>{user.name}</div>)}
      <button onClick={revalidate}>Refetch</button>
    </div>
  );
}
