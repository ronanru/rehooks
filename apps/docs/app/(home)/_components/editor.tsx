"use client";

import {
  Alert,
  AlertDescription,
  BorderBeam,
  CodeBlock,
} from "@rehooks/ui/components";
import { Wrench, Hammer } from "@rehooks/ui/icons";
import { useState } from "react";

const hookCode = `export function useSessionStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [store, setStore] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error('Error reading session key:', err);
      return initialValue;
    }
 });`;

const productCode = `export function Product() {
  const [product, setProduct] = useSessionStorage(
    "product", {
    name: "Rehooks",
    price: 100,
  });

  const handleChange = (event) => {
    setProduct(event.target.value);
  };

  return (
    <div>
      <h2>Session Storage Demo</h2>
      <input value={product} onChange={handleChange} />
      <p>Your name is: {product}</p>
    </div>
  );
}`;

const hooksList = [
  { name: "useSessionStorage" },
  { name: "useEventCallback" },
  { name: "useThrottle" },
  { name: "useFocus" },
  { name: "useFetch" },
];

const componentsList = [
  { name: "Dropdown" },
  { name: "Command" },
  { name: "Product" },
  { name: "Table" },
  { name: "List" },
];

export function Editor() {
  const [activeTab, setActiveTab] = useState("hook");
  const list = activeTab === "hook" ? hooksList : componentsList;

  return (
    <div className="text-fd-foreground border-fd-border/50 relative flex h-auto max-w-full flex-col overflow-hidden rounded-2xl border bg-stone-950">
      <div className="flex select-none border-b border-neutral-800">
        <TabButton
          active={activeTab === "hook"}
          onClick={() => setActiveTab("hook")}
        >
          <span className="flex items-center gap-2">
            <Wrench className="size-4" />
            useSessionStorage.ts
          </span>
        </TabButton>
        <TabButton
          active={activeTab === "product"}
          onClick={() => setActiveTab("product")}
        >
          <span className="flex items-center gap-2">
            <Hammer className="size-4" /> Product.tsx
          </span>
        </TabButton>
      </div>

      <div className="flex w-full flex-1 flex-col md:flex-row">
        <div className="min-h-[300px] max-w-[750px] flex-1 overflow-auto p-4">
          <div className="text-fd-muted-foreground mb-2 select-none font-mono text-sm tracking-tight">
            {activeTab === "hook"
              ? "src > hooks > useSessionStorage"
              : "src > components > Product"}
          </div>
          <CodeBlock className="text-xs sm:text-sm md:text-base lg:text-lg">
            {activeTab === "hook" ? hookCode : productCode}
          </CodeBlock>
        </div>

        <div className="max-w-full select-none border-t border-neutral-800 p-4 md:border-l md:border-t-0 lg:w-[300px]">
          <div className="space-y-2">
            {list.map((stat) => {
              return <Stat key={stat.name} {...stat} />;
            })}
          </div>
        </div>
      </div>
      <BorderBeam className="absolute inset-0 z-10 rounded-2xl" duration={5} />
    </div>
  );
}

function TabButton({
  children,
  active,
  onClick,
  className,
  disabled,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium ${className} ${
        active
          ? "border-b border-b-violet-500 bg-neutral-900/50 text-white"
          : "text-fd-muted-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Stat({ name }: { name: string }) {
  return (
    <div className="flex items-center text-sm">
      <span className="text-fd-muted-foreground mr-2">→</span>
      <span className="flex-1 text-white">{name}</span>
    </div>
  );
}
