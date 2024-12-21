"use client";

import {
  Alert,
  AlertDescription,
  BorderBeam,
  CodeBlock,
} from "@rehooks/ui/components";
import { Wrench, Hammer } from "@rehooks/ui/icons";
import { useState } from "react";

const code = `export function useSessionStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading session storage key:', error);
      return initialValue;
    }
  });`;

export function Editor() {
  const [activeTab, setActiveTab] = useState("hook");

  return (
    <div className="text-fd-foreground border-fd-border/50 relative flex h-auto max-w-full flex-col overflow-hidden rounded-2xl border bg-stone-950">
      <div className="flex select-none border-b border-zinc-800">
        <TabButton
          active={activeTab === "hook"}
          onClick={() => setActiveTab("hook")}
        >
          <span className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            useSessionStorage.ts
          </span>
        </TabButton>
        <TabButton
          className="cursor-not-allowed"
          disabled
          active={activeTab === "component"}
          onClick={() => setActiveTab("component")}
        >
          <span className="flex items-center gap-2">
            <Hammer className="h-4 w-4" /> Product.tsx
          </span>
        </TabButton>
      </div>

      <div className="flex w-full flex-1 flex-col md:flex-row">
        <div className="flex-1 p-4">
          <div className="text-fd-muted-foreground mb-2 select-none font-mono text-sm tracking-tight">
            src &gt; hooks &gt; useSessionStorage
          </div>

          <Alert className="mb-4 border-violet-900 bg-violet-950/50">
            <AlertDescription className="select-none text-violet-300">
              Successfully imported useSessionStorage!
            </AlertDescription>
          </Alert>

          <CodeBlock className="text-sm md:text-base lg:text-lg">
            {code}
          </CodeBlock>
        </div>

        <div className="hidden w-[300px] select-none border-l border-zinc-800 p-4 lg:block">
          <div className="space-y-2">
            {[
              { name: "useSessionStorage" },
              { name: "useEventCallback" },
              { name: "useThrottle" },
              { name: "useFocus" },
              { name: "useFetch" },
            ].map((stat) => (
              <Stat key={stat.name} {...stat} />
            ))}
          </div>
        </div>
      </div>
      <BorderBeam className="absolute inset-0 z-10 rounded-2xl" duration={7} />
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
          ? "border-b-2 border-b-violet-500 text-white"
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
