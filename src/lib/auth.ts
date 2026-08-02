//next.js server side API for reading/writing cookies.
//only works in Server Components, Server Actions and Route Handlers.


import  {cookies} from "next/headers";

import {
  signSessionToken,
  verifySessionToken,
  SESSION_COOKIE,
  type Session,
} from "./session";


//called right after successfull login 
export async function createSession(userId:number): Promise<void> {

    //step 1: build token 
    const token = await signSessionToken(userId);

    const cookieStore = await cookies();

    cookieStore.set(SESSION_COOKIE, token, {
        httpOnly: true, //blocks JS in thye browser from reading this cookie

        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/", //cookie is valid across the entire site,
        maxAge: 60*60 *2 // brwoser autodeletes cookie after 2h
     })


}

export async function getSession(): Promise <Session| null> {
   
    const cookieStore = await cookies();
    
    // opt chaining in case no cookie exists > undefined
    const token = cookieStore.get(SESSION_COOKIE)?.value;

    if(!token) {
        return null;
    }

    try {
        //actual verification on session.ts
        return await verifySessionToken(token);
    } catch {
        return null;
    }
}

export async function destroySession(): Promise<void> {

    const cookieStore = await cookies();

    cookieStore.delete(SESSION_COOKIE)
}