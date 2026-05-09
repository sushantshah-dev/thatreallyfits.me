import { motion } from 'motion/react';

function App() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
			<motion.section
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.45, ease: 'easeOut' }}
				className="w-full max-w-md rounded-[28px] border border-white/10 bg-white/5 p-8 text-center shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl"
			>
				<div className="text-xs uppercase tracking-[0.22em] text-white/55">App shell</div>
				<h1 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">
					Your workspace is ready
				</h1>
				<p className="mt-3 text-sm leading-6 text-white/70">
					This is the protected application entry point. Build the rest of the experience here.
				</p>
				<a
					href="/"
					className="mt-6 inline-flex items-center justify-center rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
				>
					Go home
				</a>
			</motion.section>
		</main>
	);
}

export default App;
