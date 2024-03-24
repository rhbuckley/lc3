"use server";

import { headers } from "next/headers";

export async function createSubscriber(formData: FormData) {
    const url = process.env.EMAIL_POST_URL;
    if (!url) throw new Error("EMAIL_POST_URL not set");

    const email = formData.get("email");
    if (!email) return false;

    const req = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            email,
            date: new Date().toISOString(),
            ip: headers().get("x-forwarded-for"),
        }),
    });

    return req.status === 200;
}
