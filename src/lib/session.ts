import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SESSION_ISSUER = "marketplace";
const SESSION_ALGORITHM = "HS256";
const SESSION_DURATION = "2h";
export const SESSION_COOKIE = "marketplace-session";

export type Session = {
  userId: number;
};

//fetch  secret key and convert into byte format joses crypto function
//requires

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET as string;

  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must contain at least 32 characters");
  }

  return new TextEncoder().encode(secret); //converts plain text into raw bytes
}

export async function signSessionToken(userId: number): Promise<string> {
  return (
    new SignJWT({}) // empty custom payload instead of ex. userId

      //declares which algorithm was used to sign it
      //becomes part of tokens public header
      .setProtectedHeader({ alg: SESSION_ALGORITHM })

      //"subject is a standard JWT claim
      .setSubject(String(userId))

      //embeds issuer as the "iss" claim, checked again on verification
      .setIssuer(SESSION_ISSUER)

      //embeds current timestamp as the "iat" claim
      .setIssuedAt()

      .setExpirationTime(SESSION_DURATION)

      //final step takes our configuration and computes siggnature and returns
      //complete "header.payload.signature" (token)
      .sign(getSecret())
  );
}

export async function verifySessionToken(token: string): Promise<Session> {
  const { payload } = await jwtVerify(token, getSecret(), {
    //4 checks - 1.Signature matches 2.token hasn´t expired
    // 3. algorithm matches, 4."iss" matches

    algorithms: [SESSION_ALGORITHM],
    issuer: SESSION_ISSUER,
  });

  const userId = Number(payload.sub);

  //check if payload is coherent
  if (!Number.isSafeInteger(userId) || userId <= 0) {
    throw new Error("Session subject is invalid");
  }

  return { userId };
}
