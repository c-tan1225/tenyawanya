/**
 * 画像（ロゴ・イラスト）から「ネオン画数」をおおよそ見積もる（概算）。
 * ──────────────────────────────────────────────────────────────
 *  流れ：縮小描画 → グレースケール → 二値化（線画化）→ Zhang–Suen 細線化
 *        → 交差点（分岐）と端点を数え、交差点で分割した線分の本数を概算。
 *
 *  ※クリーンな線画（白地に黒線のロゴ等）で精度が出ます。
 *    写真・グラデーション・複雑なイラスト・極太の線では精度が落ちるため、
 *    結果はあくまで「概算」とし、UI で手動調整できるようにします。
 *
 *  ブラウザ専用（canvas 利用）。
 */

const MAX_SIDE = 360; // 解析時の最大辺（速度と精度のバランス）

/** File を読み込んで HTMLImageElement を返す */
export function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("画像の読み込みに失敗しました"));
    };
    img.src = url;
  });
}

/** 読み込み済みの画像から画数を概算する */
export function estimateStrokesFromImage(img: HTMLImageElement): number {
  const scale = Math.min(1, MAX_SIDE / Math.max(img.width, img.height));
  const W = Math.max(1, Math.round(img.width * scale));
  const H = Math.max(1, Math.round(img.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return 0;
  ctx.drawImage(img, 0, 0, W, H);
  const { data } = ctx.getImageData(0, 0, W, H);

  // グレースケール（0–255）
  const gray = new Uint8ClampedArray(W * H);
  for (let i = 0; i < W * H; i++) {
    const r = data[i * 4],
      g = data[i * 4 + 1],
      b = data[i * 4 + 2],
      a = data[i * 4 + 3];
    // 透過部分は背景(白)扱い
    const lum = a < 32 ? 255 : 0.299 * r + 0.587 * g + 0.114 * b;
    gray[i] = lum;
  }

  const thr = otsuThreshold(gray);
  // 背景の明暗を縁の平均から判定（線＝背景の反対側）
  const borderBright = borderIsBright(gray, W, H);

  // 二値化：1 = インク（線）
  const grid = new Uint8Array(W * H);
  let ink = 0;
  for (let i = 0; i < W * H; i++) {
    const isInk = borderBright ? gray[i] < thr : gray[i] >= thr;
    grid[i] = isInk ? 1 : 0;
    if (isInk) ink++;
  }
  if (ink < 12) return 0; // ほぼ空

  thinZhangSuen(grid, W, H);

  return countStrokes(grid, W, H);
}

/* ───────── 内部ヘルパー ───────── */

/** 大津の二値化しきい値 */
function otsuThreshold(gray: Uint8ClampedArray): number {
  const hist = new Array(256).fill(0);
  for (let i = 0; i < gray.length; i++) hist[gray[i]]++;
  const total = gray.length;
  let sum = 0;
  for (let t = 0; t < 256; t++) sum += t * hist[t];
  let sumB = 0,
    wB = 0,
    maxVar = -1,
    threshold = 127;
  for (let t = 0; t < 256; t++) {
    wB += hist[t];
    if (wB === 0) continue;
    const wF = total - wB;
    if (wF === 0) break;
    sumB += t * hist[t];
    const mB = sumB / wB;
    const mF = (sum - sumB) / wF;
    const between = wB * wF * (mB - mF) * (mB - mF);
    if (between > maxVar) {
      maxVar = between;
      threshold = t;
    }
  }
  return threshold;
}

/** 画像の縁の平均輝度が明るいか（＝背景が明るいか） */
function borderIsBright(gray: Uint8ClampedArray, W: number, H: number): boolean {
  let sum = 0,
    n = 0;
  for (let x = 0; x < W; x++) {
    sum += gray[x] + gray[(H - 1) * W + x];
    n += 2;
  }
  for (let y = 0; y < H; y++) {
    sum += gray[y * W] + gray[y * W + (W - 1)];
    n += 2;
  }
  return sum / n >= 128;
}

/** Zhang–Suen 細線化（1px のスケルトンにする） */
function thinZhangSuen(grid: Uint8Array, W: number, H: number): void {
  const at = (x: number, y: number) =>
    x < 0 || y < 0 || x >= W || y >= H ? 0 : grid[y * W + x];
  let changed = true;
  let guard = 0;
  while (changed && guard++ < 100) {
    changed = false;
    for (const step of [0, 1]) {
      const remove: number[] = [];
      for (let y = 1; y < H - 1; y++) {
        for (let x = 1; x < W - 1; x++) {
          if (grid[y * W + x] !== 1) continue;
          const p2 = at(x, y - 1),
            p3 = at(x + 1, y - 1),
            p4 = at(x + 1, y),
            p5 = at(x + 1, y + 1),
            p6 = at(x, y + 1),
            p7 = at(x - 1, y + 1),
            p8 = at(x - 1, y),
            p9 = at(x - 1, y - 1);
          const B = p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
          if (B < 2 || B > 6) continue;
          const seq = [p2, p3, p4, p5, p6, p7, p8, p9, p2];
          let A = 0;
          for (let i = 0; i < 8; i++) if (seq[i] === 0 && seq[i + 1] === 1) A++;
          if (A !== 1) continue;
          if (step === 0) {
            if (p2 * p4 * p6 !== 0) continue;
            if (p4 * p6 * p8 !== 0) continue;
          } else {
            if (p2 * p4 * p8 !== 0) continue;
            if (p2 * p6 * p8 !== 0) continue;
          }
          remove.push(y * W + x);
        }
      }
      if (remove.length) {
        changed = true;
        for (const i of remove) grid[i] = 0;
      }
    }
  }
}

/** スケルトンの 8近傍の前景数 */
function neighborCount(grid: Uint8Array, W: number, H: number, x: number, y: number): number {
  let n = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx,
        ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      if (grid[ny * W + nx] === 1) n++;
    }
  }
  return n;
}

/**
 * 交差点で分割した線分（チューブ本数）を概算。
 *   本数 ≈ 有効な連結成分の数 + Σ_交差点クラスタ max(0, 枝数 - 2)
 *   （単純な線＝1本、交差点があるほど分割が増える）
 */
function countStrokes(grid: Uint8Array, W: number, H: number): number {
  const idx = (x: number, y: number) => y * W + x;
  const seen = new Uint8Array(W * H);

  // 連結成分（8近傍）。小さすぎる成分はノイズとして除外
  let components = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (grid[idx(x, y)] !== 1 || seen[idx(x, y)]) continue;
      // BFS
      let size = 0;
      const stack = [[x, y]];
      seen[idx(x, y)] = 1;
      while (stack.length) {
        const [cx, cy] = stack.pop()!;
        size++;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = cx + dx,
              ny = cy + dy;
            if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
            if (grid[idx(nx, ny)] === 1 && !seen[idx(nx, ny)]) {
              seen[idx(nx, ny)] = 1;
              stack.push([nx, ny]);
            }
          }
        }
      }
      if (size >= 6) components++; // ノイズ除去
    }
  }

  // 交差点画素（近傍3以上）をクラスタ化し、枝数（外周の前景隣接）を数える
  const isJunction = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (grid[idx(x, y)] === 1 && neighborCount(grid, W, H, x, y) >= 3) {
        isJunction[idx(x, y)] = 1;
      }
    }
  }

  const jseen = new Uint8Array(W * H);
  let extra = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (!isJunction[idx(x, y)] || jseen[idx(x, y)]) continue;
      // クラスタ収集
      const cluster: [number, number][] = [];
      const stack = [[x, y]];
      jseen[idx(x, y)] = 1;
      while (stack.length) {
        const [cx, cy] = stack.pop()!;
        cluster.push([cx, cy]);
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = cx + dx,
              ny = cy + dy;
            if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
            if (isJunction[idx(nx, ny)] && !jseen[idx(nx, ny)]) {
              jseen[idx(nx, ny)] = 1;
              stack.push([nx, ny]);
            }
          }
        }
      }
      // 枝数 = クラスタ外周にある前景（非交差）画素の数
      const inCluster = new Set(cluster.map(([cx, cy]) => idx(cx, cy)));
      const armSet = new Set<number>();
      for (const [cx, cy] of cluster) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = cx + dx,
              ny = cy + dy;
            if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
            const ni = idx(nx, ny);
            if (grid[ni] === 1 && !inCluster.has(ni) && !isJunction[ni]) {
              armSet.add(ni);
            }
          }
        }
      }
      extra += Math.max(0, armSet.size - 2);
    }
  }

  const strokes = components + extra;
  return Math.max(1, Math.min(300, Math.round(strokes)));
}
