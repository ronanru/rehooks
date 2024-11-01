import { useOnlineStatus } from "./index";

function Component() {
  const isOnline = useOnlineStatus();

  return <p>Is online: {isOnline ? "Yes" : "No"}</p>;
}
