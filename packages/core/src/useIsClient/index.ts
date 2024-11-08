import { useEffect, useState } from "react";

const description =
  "Custom hook that determines if the component is being rendered on the client side";

/**
 * A custom React hook that determines if the component is being rendered on the client side.
 *
 * @returns {boolean} - Returns true if the component is mounted on the client, false otherwise.
 */
export function useIsClient(): boolean {
  const [isClient, setClient] = useState<boolean>(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return isClient;
}
