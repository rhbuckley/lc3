import Link from "next/link";
import { Pages } from "~/config/pages";

export default function Header() {
    return (
        <header className="fixed w-max top-0 left-0 p-8 z-20">
            <div className="relative bg-light-50 dark:bg-light/80 border-light-200 dark:hover:bg-light-50/80 border-2 inset-1 w-max hover:bg-light-50/50 filter backdrop-blur-sm flex flex-col transition-all duration-300 ease-in-out rounded-xl p-4 group hover:scale-[90%] hover:h-[110%] origin-top-left">
                <Link href="/">
                    <h1 className="text-black text-4xl font-bold font-mono group-hover:opacity-90">
                        <span className="font-monsterrat font-bold pr-0">
                            LC3{" "}
                        </span>
                        <span className="font-bold font-mono">Tools</span>
                    </h1>
                </Link>

                <div className="z-10 absolute h-min min-h-[50%] top-[105%] w-[150%] pt-4 left-0 opacity-0 group-hover:opacity-100 transition-all delay-75 duration-300 ease-in-out scale-100 group-hover:scale-105 origin-left pointer-events-none group-hover:pointer-events-auto">
                    <div className="flex flex-col px-3 py-4 gap-5 bg-light-50 dark:bg-light-200 rounded-xl border-light-200 border-2 inset-1">
                        <h2 className="text-black/80 text-sm italic w-max rounded-md">
                            created by @rhbuckley
                        </h2>
                        <div>
                            <p className="font-bold py-2 dark:text-black/90">
                                Helpful Links
                            </p>
                            <div className="flex flex-col gap-2">
                                {Pages.map((page, i) => (
                                    <Link
                                        href={page.href}
                                        key={i}
                                        className="p-4 hover hover:bg-black/10 rounded-xl cursor-pointer"
                                    >
                                        <span className="dark:text-black/80">
                                            {page.name}
                                        </span>
                                        <p className="text-black/50 text-xs">
                                            {page.description}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
