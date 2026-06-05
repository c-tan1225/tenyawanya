import { ImageResponse } from "next/og";

/**
 * ファビコン（動的生成）。
 *   暗い背景にネオンピンクの丸 ── ブランドの「灯り」を表すミニマルなマーク。
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#211F28",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 999,
            background: "#FF73B3",
            boxShadow: "0 0 8px #FF73B3",
          }}
        />
      </div>
    ),
    size,
  );
}
