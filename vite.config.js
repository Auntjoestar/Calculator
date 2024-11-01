import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Replace 'your-github-username' and 'your-repo-name' with your actual GitHub username and repository name
const base = process.env.GITHUB_ACTIONS ? '/Calculator/' : '/';

export default defineConfig({
  base,
  plugins: [vue()],
})
