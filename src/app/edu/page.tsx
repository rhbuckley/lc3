"use client";

import { Code } from "~/components/DocComponents";
import { createSubscriber } from "./action";
import { useState } from "react";

export default function Page() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen gap-16">
            <div className="p-5">
                <h1 className="font-monsterrat text-5xl sm:text-6xl">
                    Education
                </h1>
                <p className="italic font-sans opacity-80 text-xs">
                    Enroll in a course, or create a class for your students.
                </p>
            </div>

            <div className="grid sm:grid-cols-5 place-items-center max-sm:gap-16 lg:px-[10%]">
                <div className="p-5 sm:col-span-3">
                    <p className="leading-8">
                        This is a project that I have completed in conjunction
                        with an application to a research opportunity. I have
                        other projects that I am still working on, and will
                        circle back to this one when I am caught up with the
                        others. This feature should be completed by
                        <Code>July 2024</Code>.
                    </p>
                </div>

                <div className="sm:col-span-2 relative">
                    <div className="absolute bg-black/80 dark:bg-white/80 -left-[30%] h-full w-1"></div>
                    <h2 className="font-mono text-4xl">Remind Me</h2>
                    <p className="text-opacity-80 font-sans">
                        Get added to our email list.
                    </p>

                    <form
                        className="flex flex-col gap-4 mt-8"
                        action={async (e) => {
                            await createSubscriber(e);
                            setSubmitted(true);
                        }}
                    >
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            className="rounded-lg p-2 bg-gray-400/20 dark:bg-gray-100/40 dark:text-light text-xs"
                            disabled={submitted}
                        />
                        {submitted && (
                            <p className="text-sm text-green-500 italic">
                                Thank you for your interest.
                            </p>
                        )}
                        <button
                            className="rounded-lg p-2 bg-green-400/20 dark:bg-green-800/40"
                            disabled={submitted}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
