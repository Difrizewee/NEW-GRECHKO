const isGithubPages = process.env.GITHUB_PAGES === "true";

const repo =
  process.env.NEXT_PUBLIC_REPO_NAME ||
  (process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split("/")[1] : "");

const basePath = isGithubPages && repo ? `/${repo}` : "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },

  // ✅ важно: чтобы asset() знал basePath в рантайме
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
