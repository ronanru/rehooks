import { useScroll } from "./index";

function Component() {
  const scrolled = useScroll(100);
  return <div>{scrolled ? "Scrolled" : "Not scrolled"}</div>;
}
