import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const [repositoryOwner, repositoryName] = process.env.GITHUB_REPOSITORY?.split("/") ?? [];
const isUserOrOrganizationPage =
  repositoryOwner &&
  repositoryName &&
  repositoryName.toLowerCase() === `${repositoryOwner.toLowerCase()}.github.io`;
const base = process.env.GITHUB_ACTIONS && repositoryName && !isUserOrOrganizationPage ? `/${repositoryName}/` : "/";

export default defineConfig({
  base,
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react()],
});
