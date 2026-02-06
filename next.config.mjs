const repo = "NEW-GRECHKO";

// На GitHub Pages сайт живёт не в корне домена, а в /REPO
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? `/${repo}` : "";

const nextConfig = {
  output: "export",              // статический экспорт (out/)
  trailingSlash: true,           // чтобы /NEW-GRECHKO/ работал как папка
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true }, // next/image не работает на Pages без оптимизатора
};

export default nextConfig;
