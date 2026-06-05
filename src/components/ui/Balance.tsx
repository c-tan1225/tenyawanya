/**
 * 日本語コピーの「文節折り返し」ヘルパー。
 * ──────────────────────────────────────
 *  読点・句点（、。！？・）の直後で文節に分け、各文節を inline-block にすることで、
 *  「ネオンサイ／ンを」のような語中での不格好な改行を防ぎます。
 *  改行は文節と文節の“あいだ”で起こり、文節は基本まとまって折り返します。
 */
export function Balance({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  // 区切り文字（、。！？・）の直後で分割し、区切り文字は前の文節に残す
  const parts = text.split(/(?<=[、。！？・])/).filter(Boolean);

  return (
    <span className={className}>
      {parts.map((p, i) => (
        <span key={i} className="inline-block">
          {p}
        </span>
      ))}
    </span>
  );
}
