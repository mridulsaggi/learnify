import { config } from "dotenv";
config(); // Load the .env file
import { defineConfig } from "drizzle-kit";
export default defineConfig({
    schema: "./util/db/schema.js",
    dialect: "postgresql",
    dbCredentials: {
        url: 'postgresql://Aimocker_owner:3ypNsiRvAeY4@ep-misty-voice-a5t4ptvt.us-east-2.aws.neon.tech/Aimocker?sslmode=require',
    }
});