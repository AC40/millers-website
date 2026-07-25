import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

export default defineConfig({
	site: "https://mindenmillers.de",
	image: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "wordpress.mindenmillers.de",
			},
		],
	},
	integrations: [mdx(), sitemap(), icon()],
});
