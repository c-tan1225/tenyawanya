"use client";

/**
 * ステップの進捗バー。
 *   現在地の表示と、完了済みステップへのジャンプができます。
 */
export function ProgressBar({
  steps,
  current,
  onJump,
}: {
  steps: { title: string }[];
  current: number;
  onJump: (index: number) => void;
}) {
  return (
    <div>
      {/* ラベル（PC のみ） */}
      <ol className="mb-3 hidden justify-between md:flex">
        {steps.map((s, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={s.title} className="flex-1 text-center">
              <button
                type="button"
                onClick={() => onJump(i)}
                disabled={i > current}
                className={`font-round text-[13px] font-bold tracking-tight transition-colors ${
                  active
                    ? "text-ink"
                    : done
                      ? "text-ink/55 hover:text-ink"
                      : "text-ink/30"
                }`}
              >
                <span className="mr-1.5 font-display text-[11px] text-ink/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.title}
              </button>
            </li>
          );
        })}
      </ol>

      {/* バー本体 */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => {
          const reached = i <= current;
          return (
            <button
              key={s.title}
              type="button"
              onClick={() => onJump(i)}
              disabled={i > current}
              aria-label={`ステップ${i + 1}：${s.title}`}
              className="group flex-1"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-500 ease-smooth ${
                  reached ? "bg-ink" : "bg-ink/12"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* 現在地（スマホ表示） */}
      <p className="mt-3 text-center text-[13px] font-bold text-ink/45 md:hidden">
        Step {current + 1} / {steps.length}
        <span className="ml-1.5 text-ink/75">{steps[current].title}</span>
      </p>
    </div>
  );
}
