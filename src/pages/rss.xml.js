import rss from '@astrojs/rss';
import { getSortedPosts } from '../lib/blog';

export async function GET(context) {
	const posts = await getSortedPosts();

	return rss({
		title: 'AIOS Blog',
		description: 'Releases and field notes from the AIOS team.',
		// `context.site` comes from `site` in astro.config.mjs — no hardcoded URLs,
		// so this auto-corrects when the custom domain is booked.
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			author: post.data.author,
			categories: post.data.tags,
			link: `/blog/${post.id}/`,
		})),
	});
}
