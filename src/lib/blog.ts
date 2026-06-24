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

const DEFAULT_AVATAR = '/blog/authors/john-ellison.svg';

/** Slug for author assets under `public/blog/authors/{slug}.svg`. */
export const authorSlug = (author: string) =>
	author
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

/** Avatar path derived from author name; falls back to the default monogram. */
export const authorAvatarSrc = (author: string) =>
	`/blog/authors/${authorSlug(author)}.svg`;

export { DEFAULT_AVATAR };
