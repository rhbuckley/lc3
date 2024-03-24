import Link from "next/link";
import { Pages } from "~/config/pages";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col gap-16 items-center justify-between max-sm:pt-40 sm:p-24 ">
            <div className="sm:flex hidden"></div>
            <div className="flex flex-col gap-1">
                <h1 className="font-monsterrat font-bold text-8xl text-black dark:text-white">
                    LC-3
                </h1>
                <div className="flex justify-between px-2 -mt-2 opacity-90 text-xs">
                    {Array.from("LANGUAGE").map((l, i) => (
                        <span key={i}>{l}</span>
                    ))}
                </div>
            </div>

            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                {Pages.map((option) => (
                    <Link
                        href={option.href}
                        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                        key={option.href}
                    >
                        <h2 className={`mb-3 text-2xl font-semibold`}>
                            {option.name}{" "}
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                -&gt;
                            </span>
                        </h2>
                        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                            {option.description}
                        </p>
                    </Link>
                ))}
            </div>
        </main>
    );
}
