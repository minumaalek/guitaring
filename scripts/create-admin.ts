import bcrypt from "bcryptjs";
import readline from "readline";
import { db } from "../src/db";

function ask(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  console.log("\n=== Create Admin ===\n");

  const username = await ask("Username: ");
  const password = await ask("Password: ");

  if (!username || !password) {
    console.error("Username and password are required.");
    process.exit(1);
  }

  const existingAdmin = await db.admin.findUnique({
    where: { username },
  });

  if (existingAdmin) {
    console.error("An admin with this username already exists.");
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await db.admin.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  console.log(`\nAdmin "${admin.username}" created successfully.\n`);
}

main()
  .catch((error) => {
    console.error("Failed to create admin:", error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
