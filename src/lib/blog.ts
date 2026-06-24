import { getCollection, type CollectionEntry } from 'astro:content';

/** Drafts are visible in `astro dev`, hidden from production builds. */
export const isVisible = ({ data }: CollectionEntry<'blog'>) =>
	import.meta.env.PROD ? data.draft !== true : true;

/** Published blog posts, newest first. Single source of truth for list/post/RSS. */
export async function getSortedPosts() {
	const posts = await getCollection('blog', isVisible);
	return posts.sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
}

/** Consistent post-date formatting across the blog. */
export const formatDate = (d: Date) =>
	d.toLocaleDateString('en-GB', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
