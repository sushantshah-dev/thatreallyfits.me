import { useState } from 'react';
import { motion } from 'motion/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

function Auth() {
	const isSignup = window.location.pathname.includes('/signup');
	const searchParams = new URLSearchParams(window.location.search);
	const nextPath = searchParams.get('next') || '/app';
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			if (isSignup) {
				if (password !== confirmPassword) {
					setError('Passwords do not match');
					setLoading(false);
					return;
				}
				const res = await fetch('/api/signup', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email, password, full_name: fullName }),
				});
				if (!res.ok) {
					const data = await res.json();
					setError(data.error || 'Signup failed');
					return;
				}
				window.location.replace(nextPath);
			} else {
				const res = await fetch('/api/login', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email, password }),
				});
				if (!res.ok) {
					const data = await res.json();
					setError(data.error || 'Login failed');
					return;
				}
				window.location.replace(nextPath);
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const headline = isSignup ? 'Create a new account' : 'Log in to your account';
	const supportingCopy = isSignup
		? 'Create your account to keep comparisons, recommendations, and decision context in one place.'
		: 'Continue comparing options, save tradeoffs, and come back to the same context whenever you need it.';
	const primaryAction = isSignup ? 'Create account' : 'Log in';
	const alternateAction = isSignup ? 'Log in' : 'Create account';
	const alternateHref = isSignup ? '/login' : '/signup';
	const formTitle = isSignup ? 'Set up your session' : 'Continue your session';
	return (
		<main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
			<div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
				<div className="grid w-full gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
					<motion.section
						initial={{ opacity: 0, y: 18 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.55, ease: 'easeOut' }}
						className="space-y-6"
					>
						<div className="space-y-4">
							<h1 className="max-w-[12ch] text-balance text-4xl font-semibold tracking-[-0.06em] sm:text-5xl lg:text-7xl">
								{headline}
							</h1>
							<p className="max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
								{supportingCopy}
							</p>
						</div>
						<div className="flex flex-wrap gap-3 text-sm text-white/70">
							<span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Saved comparisons</span>
							<span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Decision history</span>
							<span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Shared context</span>
						</div>
					</motion.section>

					<motion.section
						initial={{ opacity: 0, y: 18 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
						className="w-full"
					>
						<Card>
							<form onSubmit={handleSubmit}>
								<CardHeader>
									<div className="flex items-center justify-between gap-4">
										<div>
											<div className="text-xs uppercase tracking-[0.2em] text-white/50">{isSignup ? 'Create account' : 'Welcome back'}</div>
											<CardTitle className="mt-2">{formTitle}</CardTitle>
											<CardDescription>
												{isSignup
													? 'Create an account to save your comparisons and return to them later.'
													: 'Pick up where you left off and keep your decision context intact.'}
											</CardDescription>
										</div>
										<Button asChild variant="secondary" size="sm" disabled={loading}>
											<a href="/" onClick={(e) => loading && e.preventDefault()}>Back home</a>
										</Button>
									</div>
								</CardHeader>

								<CardContent className="space-y-4">
									{error && (
										<motion.div
											initial={{ opacity: 0, y: -8 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -8 }}
											transition={{ duration: 0.3 }}
											className="rounded-md bg-red-500/10 p-3 text-sm text-red-400"
										>
											{error}
										</motion.div>
									)}
									{isSignup ? (
										<label className="block space-y-2">
											<span className="text-sm font-medium text-white/75">Full name</span>
											<Input
												type="text"
												autoComplete="name"
												placeholder="Your name"
												value={fullName}
												onChange={(e) => setFullName(e.target.value)}
												required
											/>
										</label>
									) : null}
									<label className="block space-y-2">
										<span className="text-sm font-medium text-white/75">Email</span>
										<Input
											type="email"
											autoComplete="email"
											placeholder="you@example.com"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
										/>
									</label>

									<label className="block space-y-2">
										<span className="text-sm font-medium text-white/75">Password</span>
										<Input
											type="password"
											autoComplete="current-password"
											placeholder="••••••••"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
										/>
									</label>

									{isSignup ? (
										<label className="block space-y-2">
											<span className="text-sm font-medium text-white/75">Confirm password</span>
											<Input
												type="password"
												autoComplete="new-password"
												placeholder="••••••••"
												value={confirmPassword}
												onChange={(e) => setConfirmPassword(e.target.value)}
												required
											/>
										</label>
									) : null}
								</CardContent>

								<CardFooter>
									<div className="flex w-full flex-col gap-3 sm:flex-row">
										<Button type="submit" className="flex-1" disabled={loading}>
											{loading ? 'Loading...' : primaryAction}
										</Button>
										<Button asChild variant="secondary" className="flex-1" disabled={loading}>
											<a href={alternateHref} onClick={(e) => loading && e.preventDefault()}>
												{alternateAction}
											</a>
										</Button>
									</div>
								</CardFooter>
							</form>
						</Card>
					</motion.section>
				</div>
			</div>
		</main>
	);
}

export default Auth;
