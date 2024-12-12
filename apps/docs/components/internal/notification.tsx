"use client";

import React, { useState, useEffect, useMemo } from "react";
import { AnimatedList } from "@/components/ui";
import { cn } from "utils";

interface Item {
  name: string;
  icon: string;
}

const baseNotifications = [
  {
    name: "useDebounceValue",
    icon: "🔧",
  },
  {
    name: "useKeyPress",
    icon: "🔧",
  },
  {
    name: "useFetch",
    icon: "🔧",
  },
  {
    name: "useEventCallback",
    icon: "🔧",
  },
  {
    name: "useDevice",
    icon: "🔧",
  },
  {
    name: "useThrottle",
    icon: "🔧",
  },
  {
    name: "useLocalStorage",
    icon: "🔧",
  },
  {
    name: "useSessionStorage",
    icon: "🔧",
  },
  {
    name: "useToggle",
    icon: "🔧",
  },
  {
    name: "useWindowSize",
    icon: "🔧",
  },
  {
    name: "useFocus",
    icon: "🔧",
  },
  {
    name: "useEventlistener",
    icon: "🔧",
  },
];

const Notification = ({ name, icon }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-full cursor-pointer overflow-hidden rounded-2xl border p-4",
        "transform-gpu transition-all duration-200 ease-in-out hover:scale-[103%]",
        "border-neutral-400 bg-neutral-200/50 hover:border-neutral-500 hover:bg-neutral-200/80",
        "dark:border-neutral-800 dark:bg-neutral-900/50 hover:dark:border-neutral-700 hover:dark:bg-neutral-900/80",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className={`flex size-10 items-center justify-center rounded-xl bg-neutral-300 dark:bg-neutral-800`}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
          </figcaption>
        </div>
      </div>
    </figure>
  );
};

export function Notifications({
  className,
  visibleItems = 3,
  rotationInterval = 3000,
  animationDelay = 1000,
}: {
  className?: string;
  visibleItems?: number;
  rotationInterval?: number;
  animationDelay?: number;
}) {
  const [displayedNotifications, setDisplayedNotifications] = useState<Item[]>(
    [],
  );
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const updateNotifications = () => {
      const endIndex = startIndex + visibleItems;
      const newNotifications =
        endIndex > baseNotifications.length
          ? [
              ...baseNotifications.slice(startIndex),
              ...baseNotifications.slice(
                0,
                endIndex % baseNotifications.length,
              ),
            ]
          : baseNotifications.slice(startIndex, endIndex);

      setDisplayedNotifications(newNotifications);
    };

    updateNotifications();

    const interval = setInterval(() => {
      setStartIndex((current) => (current + 1) % baseNotifications.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [startIndex, visibleItems, rotationInterval]);

  const notificationElements = useMemo(
    () =>
      displayedNotifications.map((item, index) => (
        <Notification key={`${item.name}-${startIndex}-${index}`} {...item} />
      )),
    [displayedNotifications, startIndex],
  );

  return (
    <div
      className={cn(
        "relative flex h-52 w-full flex-col overflow-hidden p-2",
        className,
      )}
    >
      <AnimatedList delay={animationDelay}>{notificationElements}</AnimatedList>
    </div>
  );
}
