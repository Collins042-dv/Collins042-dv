import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";

const envFile = ".env.local";

if (fs.existsSync(envFile)) {
  const file = fs.readFileSync(envFile, "utf8");
  file
    .split(/\r?\n/)
    .filter((line) => line && !line.trim().startsWith("#") && line.includes("="))
    .forEach((line) => {
      const separatorIndex = line.indexOf("=");
      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, "");

      if (!process.env[key]) {
        process.env[key] = value;
      }
    });
}

const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
];

const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

if (!/^(?=.*\d).{8,}$/.test(process.env.ADMIN_PASSWORD)) {
  console.error("ADMIN_PASSWORD must be at least 8 characters long and include at least 1 number.");
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);
const email = process.env.ADMIN_EMAIL.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;

const { data: existingUsers, error: lookupError } = await supabase.auth.admin.listUsers();

if (lookupError) {
  console.error(`Unable to inspect existing auth users: ${lookupError.message}`);
  process.exit(1);
}

const existingUser = existingUsers.users.find((user) => user.email?.toLowerCase() === email);

const { data: userResult, error: createError } = existingUser
  ? { data: { user: existingUser }, error: null }
  : await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name: "OMA LUXURY Admin",
        full_name: "OMA LUXURY Admin",
      },
    });

if (createError || !userResult.user) {
  console.error(`Unable to create admin user: ${createError?.message ?? "Unknown error."}`);
  process.exit(1);
}

const { error: profileError } = await supabase.from("profiles").upsert(
  {
    id: userResult.user.id,
    email,
    name:
      typeof userResult.user.user_metadata?.name === "string"
        ? userResult.user.user_metadata.name
        : "OMA LUXURY Admin",
    role: "ADMIN",
  },
  { onConflict: "id" },
);

if (profileError) {
  console.error(`Unable to seed admin profile: ${profileError.message}`);
  process.exit(1);
}

console.log(`Admin user ready for ${email}.`);
