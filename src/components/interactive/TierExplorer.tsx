import { useState } from 'react';

/**
 * Interactive explainer for the AIOS access-tier model. Click a tier to see
 * what lives there, whether it syncs, and who can see it. Reinforces the
 * "you decide what leaves your machine" model from inside a post.
 */

type TierKey = 'private' | 'team' | 'external';

const TIERS: Record<
	TierKey,
	{ label: string; canonical: string; syncs: string; visible: string; blurb: string }
> = {
	private: {
		label: 'Private',
		canonical: 'admin',
		syncs: 'Never leaves your machine',
		visible: 'You only',
		blurb:
			'Raw inputs, personal scratch, your decision log. The brain rejects this tier at the boundary, so it physically cannot sync.',
	},
	team: {
		label: 'Team',
		canonical: 'team',
		syncs: 'Syncs to the team brain',
		visible: 'Everyone on the team',
		blurb:
			'Charters, deliverables, working docs. This is the shared layer: tasks, decisions, and memory the whole team can query in plain English.',
	},
	external: {
		label: 'External',
		canonical: 'external',
		syncs: 'Syncs outward',
		visible: 'External stakeholders',
		blurb:
			'Client- or company-facing work. Shared deliberately with people outside the team, never by accident.',
	},
};

const ORDER: TierKey[] = ['private', 'team', 'external'];

export default function TierExplorer() {
	const [active, setActive] = useState<TierKey>('team');
	const tier = TIERS[active];

	return (
		<div className="not-prose my-10 rounded-xl border border-border bg-surface p-5">
			<div className="flex flex-wrap gap-2" role="group" aria-label="Access tiers">
				{ORDER.map((key) => {
					const selected = key === active;
					return (
						<button
							key={key}
							type="button"
							aria-pressed={selected}
							onClick={() => setActive(key)}
							className={
								'rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ' +
								(selected
									? 'bg-primary text-primary-foreground'
									: 'border border-border text-muted-foreground hover:text-foreground')
							}
						>
							{TIERS[key].label}
						</button>
					);
				})}
			</div>

			<div className="mt-5">
				<p className="text-sm text-muted-foreground">
					<code className="font-mono">{tier.canonical}</code> tier
				</p>
				<p className="mt-2 text-foreground">{tier.blurb}</p>
				<dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
					<div className="rounded-lg border border-border p-3">
						<dt className="text-xs uppercase tracking-wide text-muted-foreground">
							Syncs?
						</dt>
						<dd className="mt-1 text-sm text-foreground">{tier.syncs}</dd>
					</div>
					<div className="rounded-lg border border-border p-3">
						<dt className="text-xs uppercase tracking-wide text-muted-foreground">
							Visible to
						</dt>
						<dd className="mt-1 text-sm text-foreground">{tier.visible}</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}
