import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

// Next.js evaluates this module while collecting route configuration during
// `next build`. A missing URI must not crash the build — the real value is
// injected at runtime, so use an inert local fallback only when it is absent.
const mongoUri =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sobarhaat";
const client = new MongoClient(mongoUri);
const db = client.db("sobarhaat");

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

export const auth = betterAuth({
  // Google uses this to build the redirect URI. It must match the app origin:
  // https://sobarhaat-client.vercel.app in production, localhost:3000 locally.
  baseURL: process.env.BETTER_AUTH_URL,

  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: true,
  },

  plugins: [jwt()],

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60,
    },
  },

  // Only register Google when both credentials are present, so a build without
  // OAuth secrets still succeeds. Add the two env vars to enable the button.
  ...(googleClientId && googleClientSecret
    ? {
        socialProviders: {
          google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          },
        },
      }
    : {}),
});
