import { useState } from 'react';

/**
 * Tiny demo island — proves React components hydrate inside blog MDX.
 * Drop real interactive apps in `src/components/interactive/` the same way
 * and embed them with `<Component client:visible />`.
 */
export default function Counter({ label = 'clicks' }: { label?: string }) {
	const [count, setCount] = useState(0);
	return (
		<div className="not-prose my-8 flex items-center gap-4 rounded-xl border border-border bg-surface p-5">
			<button
				type="button"
				onClick={() => setCount((c) => c + 1)}
				className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
			>
				Count up
			</button>
			<span className="text-small text-muted-foreground">
				{count} {label}
			</span>
		</div>
	);
}
