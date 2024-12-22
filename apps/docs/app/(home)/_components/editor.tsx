"use client";

import { BorderBeam, CodeBlock } from "@rehooks/ui/components";
import { Wrench, Settings } from "@rehooks/ui/icons";
import { useState } from "react";

const hookCode = `export function useToggle(
  defaultValue?: boolean,
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
  const [value, setValue] = useState(!!defaultValue);

  const toggle = useCallback(() => {
    setValue((x) => !x);
  }, []);

  return [value, toggle, setValue];
};`;

const settingCode = `export function Settings() {
  const [isOn, toggle, setToggle] = useToggle(false);
  return (
    <div>
      <p>Current state: {isOn ? "ON" : "OFF"}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => setToggle(true)}>Turn On</button>
      <button onClick={() => setToggle(false)}>Turn Off</button>
    </div>
  );
};`;

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
    <div className="text-fd-foreground border-fd-border/50 relative flex h-auto max-w-[350px] flex-col overflow-hidden rounded-2xl border bg-stone-950 sm:max-w-full">
      <div className="flex select-none border-neutral-800">
        <TabButton
          active={activeTab === "hook"}
          onClick={() => setActiveTab("hook")}
        >
          <span className="flex items-center gap-2">
            <Wrench className="size-4" />
            useToggle.ts
          </span>
        </TabButton>
        <TabButton
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        >
          <span className="flex items-center gap-2">
            <Settings className="size-4" />
            Settings.tsx
          </span>
        </TabButton>
      </div>

      <div className="flex w-full flex-1 flex-col md:flex-row">
        <div className="min-h-[300px] max-w-[600px] flex-1 overflow-auto p-4">
          <div className="text-fd-muted-foreground mb-2 select-none rounded-md bg-neutral-900 p-2 font-mono text-sm tracking-tight">
            {activeTab === "hook"
              ? "src > hooks > useToggle"
              : "src > components > Settings"}
          </div>
          <CodeBlock className="text-xs sm:text-sm md:text-base lg:text-lg">
            {activeTab === "hook" ? hookCode : settingCode}
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
      className={`inline-flex w-full items-center justify-center border-b border-neutral-800 px-4 py-2 text-sm font-medium ${className} ${
        active
          ? "border-b-violet-500 bg-neutral-900/50 text-white"
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
