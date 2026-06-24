/**
 * Rough reading-time estimate for a post body. Intentionally dependency-free:
 * strip fenced code and JSX/HTML tags, count words, assume ~200 wpm.
 * Good enough for a "X min read" label — not meant to be exact.
 */
export function getReadingTime(body: string): number {
	const words = body
		.replace(/```[\s\S]*?```/g, ' ') // drop fenced code blocks
		.replace(/<[^>]+>/g, ' ') // drop JSX/HTML tags
		.trim()
		.split(/\s+/)
		.filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}
