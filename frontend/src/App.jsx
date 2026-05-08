import { useState } from 'react';
import { motion } from 'motion/react';

const quickPrompts = [
  'Best bike for 15KM daily commute. I save around 6k per month after expenses.',
  'Camera for travel and low light. I am looking to start vlogging my hikes.',
  'Laptop that lasts all day. I travel frequently and need something to edit docs.',
];

const highlights = [
  {
    title: 'Ask naturally',
    copy: 'Describe the situation, budget, and tradeoffs in one message.',
  },
  {
    title: 'See the fit',
    copy: 'Get contextual recommendations instead of generic product lists.',
  },
  {
    title: 'Keep moving',
    copy: 'Save comparisons and continue the decision when you are ready.',
  },
];

function App() {
  const [prompt, setPrompt] = useState('');
  const [promptPulse, setPromptPulse] = useState(0);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(103,232,249,0.16),transparent_24%),linear-gradient(180deg,#020617_0%,#07111f_48%,#020617_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <motion.div
        className="pointer-events-none absolute left-[-8%] top-20 h-72 w-72 rounded-full bg-cyan-300/12 blur-3xl"
        animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[-8%] right-[-6%] h-[28rem] w-[28rem] rounded-full bg-emerald-400/10 blur-3xl"
        animate={{ y: [0, 18, 0], x: [0, -12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <section className="relative flex min-h-screen w-full flex-col">
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <a className="text-xs font-medium uppercase tracking-[0.18em] text-white/80 sm:text-sm" href="#hero">
            ThatReallyFits.me
          </a>
          <button
            type="button"
            className="rounded-full border border-white/12 bg-white/5 px-3 py-2 text-xs font-medium text-white/85 backdrop-blur-xl transition hover:bg-white/10 sm:px-4 sm:text-sm"
          >
            Open app
          </button>
        </header>

        <div
          id="hero"
          className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pb-10 pt-6 sm:px-6 lg:px-8"
        >
          <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="order-2 space-y-6 sm:space-y-8 lg:order-1"
            >
              <div className="inline-flex rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white/75 backdrop-blur-xl sm:text-xs">
                Shopping decisions, made clearer
              </div>
              <div className="space-y-5">
                <h1 className="max-w-[12ch] text-balance text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl lg:text-7xl">
                  Compare what fits, save what matters.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                  Describe what you need, compare the options side by side, and keep the full context for
                  later. ThatReallyFits.me helps you narrow choices, weigh tradeoffs, and return to the
                  decision when you are ready.
                </p>
              </div>

              <div className="grid gap-3 sm:flex sm:flex-wrap">
                {['Compare options', 'Save decisions', 'Pick the right fit'].map((item) => (
                  <span
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur-xl sm:w-auto"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
              className="order-1 w-full lg:order-2"
            >
              <form className="w-full overflow-hidden rounded-[28px] border border-white/12 bg-white/6 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:rounded-[32px] sm:p-6">
                <div className="flex flex-col gap-2 sm:gap-4">
                  <div className="flex flex-col gap-1 text-[10px] uppercase tracking-[0.18em] text-white/55 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:text-xs">
                    <span>Search</span>
                    <span className="hidden sm:flex" >Press enter to compare</span>
                  </div>

                  <motion.label
                    key={promptPulse}
                    className="block"
                    initial={{ opacity: 0.55, y: 6, scale: 0.995 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  >
                    <span className="sr-only">Ask a question</span>
                    <textarea
                      rows={3}
                      aria-label="Ask a question"
                      value={prompt}
                      onChange={(event) => setPrompt(event.target.value)}
                      placeholder="Best bike under ₹3L for daily commuting and weekend rides"
                      className="w-full resize-none border-0 bg-transparent text-sm leading-6 text-white outline-none placeholder:text-white/35 sm:text-[17px] sm:text-lg"
                    />
                  </motion.label>

                  <div className="flex min-w-0 flex-col gap-2 border-t border-white/10 pt-3 sm:gap-3 sm:pt-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="grid min-w-0 gap-2 sm:flex sm:flex-wrap">
                      {quickPrompts.map((chipPrompt) => (
                        <button
                          type="button"
                          key={chipPrompt}
                          onClick={() => {
                            setPrompt(chipPrompt);
                            setPromptPulse((value) => value + 1);
                          }}
                          className="max-w-full min-w-0 overflow-hidden text-ellipsis whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left text-xs text-white/75 transition hover:bg-white/10 sm:text-center sm:text-sm"
                        >
                          {chipPrompt}
                        </button>
                      ))}
                    </div>

                    <button
                      type="submit"
                      className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 sm:px-6 lg:self-auto"
                    >
                      Find fit
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>

        <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.06 }}
                className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/55 sm:text-xs">
                  0{index + 1}
                </div>
                <h2 className="mt-3 text-lg font-semibold tracking-[-0.03em] text-white sm:text-xl">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/70 sm:text-[15px]">{item.copy}</p>
              </motion.article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;
