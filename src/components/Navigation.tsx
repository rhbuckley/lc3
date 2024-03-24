"use client";

import { useEffect, useState } from "react";

type Anchors = { text: string; href: string }[];

export function DocsNavigation({ anchors }: { anchors: Anchors }) {
    const [hash, setHash] = useState("docs");

    function scrollToHash(hash: string) {
        removeScrollListener();

        // update the new hash
        setHash(hash);
        window.location.hash = hash;

        // scroll to the element
        const section = document.getElementById(hash);
        if (!section) {
            console.error(`Element with id ${hash} not found`);
            return;
        }

        section.scrollIntoView({ behavior: "smooth" });

        // while scrolling, do nothing
        let scrollLock = setTimeout(() => {});
        window.addEventListener("scroll", () => {
            clearTimeout(scrollLock);
            scrollLock = setTimeout(() => {
                addScrollListener();
            }, 250);
        });
    }

    function updateHash() {
        const currentHash = { href: "", top: -1 };
        for (const anchor of anchors) {
            const section = document.getElementById(anchor.href);
            if (!section) continue;

            const rect = section.getBoundingClientRect();

            // if the current hash hasn't been set, then set it
            if (currentHash.top === -1) {
                currentHash.href = anchor.href;
                currentHash.top = rect.top;
                continue;
            }

            // if the last section hasn't ended and the
            // current section is not in the viewport, then
            // break the loop (we subtract 250 to account for
            // the height of the navigation bar)
            if (rect.bottom - 250 > 0) break;
            currentHash.href = anchor.href;
            currentHash.top = rect.top;
        }

        window.location.hash = currentHash?.href ?? "docs";
        setHash(currentHash?.href ?? "docs");
    }

    function addScrollListener() {
        window.addEventListener("scroll", updateHash);
    }

    function removeScrollListener() {
        window.removeEventListener("scroll", updateHash);
    }

    useEffect(() => {
        // add an event listener to the window to update the href state
        // when the user scrolls
        if (typeof window === "undefined") return;
        addScrollListener();

        // remove the event listener when the component is unmounted
        return () => {
            if (typeof window === "undefined") return;
            removeScrollListener();
        };
    }, []);

    return (
        <div className="hidden sm:flex flex-col gap-2 fixed right-12 top-[20%] z-10">
            <p className="text-xs uppercase text-black/40 dark:text-light/90 font-sans tracking-widest">
                Navigation
            </p>
            <div className="flex flex-col gap-2 min-w-32">
                {anchors.map((anchor, i) => (
                    <a
                        href={anchor.href}
                        key={i}
                        onClick={() => scrollToHash(anchor.href)}
                        className={`font-light text-center text-sm py-1 px-2 rounded-md w-full hover:bg-light/40 border-light-200 hover:border-light-100 transition-colors duration-300 ease-in-out cursor-pointer ${
                            anchor.href === hash
                                ? "text-black/60 dark:text-light/80 border-[1px]"
                                : "text-black/40 dark:text-light/60"
                        }`}
                    >
                        {anchor.text}
                    </a>
                ))}
            </div>
        </div>
    );
}
