{
const Q = window.QFC;
Q.content = Q.content || {};
Q.projectContent = Q.projectContent || {};
const app = document.getElementById("app");
const P = Object.fromEntries(Q.programs.map(p => [p.id, p]));
const M = Object.fromEntries(Q.modules.map(m => [m.slug, m]));
const PR = Object.fromEntries(Q.projects.map(p => [p.slug, p]));
const live = Q.modules.filter(m => !m.soon);
const totalLessons = live.reduce((a, m) => a + m.lessons.length, 0);
const isWritten = s => (Q.written || []).includes(s);
const pad = n => String(n).padStart(2, "0");
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
let roadView = "order";

/* ---------- loading ---------- */
const loading = {};
function loadContent(slug) {
  if (Q.content[slug] || !isWritten(slug)) return Promise.resolve(Q.content[slug]);
  if (!loading[slug]) loading[slug] = new Promise(res => {
    const s = document.createElement("script");
    s.src = "content/" + slug + ".js";
    s.onload = () => res(Q.content[slug]);
    s.onerror = () => res(undefined);
    document.body.appendChild(s);
  });
  return loading[slug];
}
function loadProject(slug) {
  if (Q.projectContent[slug] || !(Q.writtenProjects || []).includes(slug)) return Promise.resolve(Q.projectContent[slug]);
  return new Promise(res => {
    const s = document.createElement("script");
    s.src = "content/project-" + slug + ".js";
    s.onload = () => res(Q.projectContent[slug]);
    s.onerror = () => res(undefined);
    document.body.appendChild(s);
  });
}
function typeset(el) {
  const mj = window.MathJax;
  if (mj && mj.startup && mj.startup.promise && mj.typesetPromise) {
    mj.startup.promise.then(() => mj.typesetPromise([el])).catch(() => {});
  } else setTimeout(() => typeset(el), 250);
}

/* ---------- small parts ---------- */
const status = m => m.soon ? "Planned" : isWritten(m.slug) ? "Ready" : "In writing";
function modCard(m, first) {
  const p = P[m.program];
  const inner = `<div class="row"><span class="pg">${p.glyph}</span><span>${pad(m.n)} · ${p.short.toUpperCase()}</span>${m.isNew ? '<span class="new">NEW</span>' : ""}</div>
    <h3>${m.title}</h3>
    <div class="meta"><span>${m.hours}h · ${m.soon ? "0" : m.lessons.length} lessons</span><span class="st">${status(m)}</span></div>`;
  return m.soon ? `<div class="mod soon">${inner}</div>` : `<a class="mod${first ? " first" : ""}" href="#m-${m.slug}">${inner}</a>`;
}
function crumbs(list) {
  return `<div class="crumbs">${list.map((c, i) => (c[1] ? `<a href="${c[1]}">${c[0]}</a>` : `<span>${c[0]}</span>`) + (i < list.length - 1 ? '<span class="sep">/</span>' : "")).join("")}</div>`;
}
function glyphArt(id) {
  const lines = [];
  if (id === "math") { let d = "M0 150"; for (let x = 0; x <= 400; x += 4) { const z = (x - 200) / 55; d += ` L${x} ${150 - 110 * Math.exp(-z * z / 2)}`; } lines.push(`<path d="${d}" fill="none" stroke="#fff" stroke-width="2"/>`, `<line x1="0" y1="150" x2="400" y2="150" stroke="#3a3a3a"/>`); }
  if (id === "code") { const rows = ["def sharpe(r):", "    mu = r.mean() * 252", "    sd = r.std() * 252 ** .5", "    return mu / sd"]; rows.forEach((r, i) => lines.push(`<text x="28" y="${48 + i * 28}" fill="${i ? "#9a9a9a" : "#fff"}" font-family="JetBrains Mono,monospace" font-size="15" xml:space="preserve">${esc(r)}</text>`)); }
  if (id === "finance") { let s = 7; const rnd = () => (s = s * 16807 % 2147483647) / 2147483647; let y = 95; for (let i = 0; i < 22; i++) { const o = y, c = y + (rnd() - .48) * 26, h = Math.min(o, c) - rnd() * 12, l = Math.max(o, c) + rnd() * 12, x = 22 + i * 17; lines.push(`<line x1="${x + 5}" y1="${h}" x2="${x + 5}" y2="${l}" stroke="#9a9a9a"/><rect x="${x}" y="${Math.min(o, c)}" width="10" height="${Math.max(2, Math.abs(c - o))}" fill="${c < o ? "#fff" : "#000"}" stroke="#fff"/>`); y = c; } }
  return `<svg viewBox="0 0 400 170" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${lines.join("")}</svg>`;
}

/* ---------- views ---------- */
function viewRoadmap() {
  const first = M.calculus;
  const stageRows = Q.stages.map((st, i) => {
    const ms = Q.order.map(s => M[s]).filter(m => m.stage === i);
    const ready = ms.filter(m => !m.soon).length;
    return `<section class="stage"><div class="sl"><b>${pad(i + 1)}</b><span>${st}</span><em>${ready} of ${ms.length} modules live</em></div>
      <div class="cards">${ms.map(m => modCard(m, m.slug === "calculus")).join("")}</div></section>`;
  }).join("");
  const byProg = `<div class="cols">${Q.programs.map(p => `<div class="col"><h3><span>${p.glyph}</span>${p.name}</h3><div class="stack">${Q.modules.filter(m => m.program === p.id).sort((a, b) => a.n - b.n).map(m => modCard(m)).join("")}</div></div>`).join("")}</div>`;
  return `<div class="wrap">
    <section class="hero frame">
      <div class="left">
        <div><h1>Quant roadmap</h1><div class="sub">TU Darmstadt</div>
        <p class="lead">Math, code and finance on one map, in the order we recommend for a quant researcher. Prerequisites come first; planned modules are shown so you can see where the path is going.</p></div>
        <div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn" href="#l-calculus--limits-and-continuity">Start lesson 1 →</a><a class="btn ghost" href="#hub">Knowledge Hub</a></div>
      </div>
      <div class="right">
        <div class="stat"><div><b>${totalLessons}</b><span>lessons</span></div><div><b>${live.length}</b><span>modules</span></div><div><b>${Q.projects.length}</b><span>projects</span></div></div>
        <div class="next"><span class="lbl">Start here</span><div class="t">Limits &amp; Continuity</div><span style="color:var(--mute);font-size:14px">Calculus · Lesson 1 of ${first.lessons.length} · ${first.lessons[0][3]} min</span>
          <div class="chips"><span style="color:var(--mute);font-size:13px;align-self:center">Then</span><a class="chip" href="#m-python-foundations">{ } Python Foundations</a><a class="chip" href="#m-instrument-map">$ The Instrument Map</a></div></div>
      </div>
    </section>
    <div class="bar"><div class="seg" role="tablist"><button data-v="order" class="${roadView === "order" ? "on" : ""}">In order</button><button data-v="program" class="${roadView === "program" ? "on" : ""}">By program</button></div>
      <div class="legend">${Q.programs.map(p => `<span><i>${p.glyph}</i>${p.short}</span>`).join("")}</div></div>
    <div id="road">${roadView === "order" ? stageRows : byProg}</div>
  </div>`;
}

function viewHub() {
  return `<div class="wrap">${crumbs([["Knowledge Hub"]])}
  <h1 style="margin-top:14px">Knowledge Hub</h1><p class="lead">Structured programs to learn the fundamentals, and project notebooks where you build real pieces of a trading desk.</p>
  <div class="hub">
    <a class="hubc" href="#programs"><div class="in"><span class="lbl">The curriculum · ${totalLessons} lessons</span><h2>Programs</h2><p class="lead" style="margin:0">Three programs with lessons, quizzes and a module exam at the end of each module.</p>
      <div class="mini"><ul>${live.filter(m => m.program === "math").slice(0, 4).map(m => `<li><span>${m.title}</span><span>${m.lessons.length} lessons</span></li>`).join("")}</ul></div></div>
      <div class="foot"><span>Enter the curriculum</span><span>→</span></div></a>
    <a class="hubc" href="#projects"><div class="in"><span class="lbl">The vault · ${Q.projects.length} projects</span><h2>Projects</h2><p class="lead" style="margin:0">Hands-on Python notebooks. Each one builds a working stage of a quant pipeline, from data to risk.</p>
      <div class="mini" style="font:400 13px/1.6 var(--mono)"><div style="color:var(--mute)"># implied volatility by bisection</div><div><span class="k">def</span> implied_vol(price, S, K, T, r):</div><div style="padding-left:2ch">lo, hi = <span class="nu">1e-4</span>, <span class="nu">5.0</span></div><div style="padding-left:2ch">...</div></div></div>
      <div class="foot"><span>Enter the vault</span><span>→</span></div></a>
  </div></div>`;
}

function viewPrograms() {
  return `<div class="wrap">${crumbs([["Knowledge Hub", "#hub"], ["Programs"]])}
  <h1 style="margin-top:14px">Programs</h1><p class="lead">Three programs that take you from first principles to the tools used on real desks. Work through them side by side, following the roadmap.</p>
  <div class="progs">${Q.programs.map(p => {
    const ms = Q.modules.filter(m => m.program === p.id && !m.soon);
    return `<a class="prog" href="#p-${p.id}"><div class="glyph">${glyphArt(p.id)}</div><div class="in"><span class="lbl">${p.weeks} weeks · ${ms.reduce((a, m) => a + m.lessons.length, 0)} lessons</span><h2>${p.name}</h2><p style="margin:0;color:var(--ink2)">${p.blurb}</p><div class="chips">${p.tags.map(t => `<span class="chip">${t}</span>`).join("")}</div><span class="go">Start learning →</span></div></a>`;
  }).join("")}</div></div>`;
}

function viewProgram(id) {
  const p = P[id]; if (!p) return notFound();
  const ms = Q.modules.filter(m => m.program === id).sort((a, b) => a.n - b.n);
  const groups = Q.stages.map((st, i) => [st, ms.filter(m => m.stage === i)]).filter(g => g[1].length);
  return `<div class="wrap">${crumbs([["Knowledge Hub", "#hub"], ["Programs", "#programs"], [p.name]])}
    <h1 style="margin-top:14px">${p.name}</h1><p class="lead">${p.blurb}</p>
    <div style="margin:28px 0 64px">${groups.map(([st, list], i) => `<section class="stage"><div class="sl"><b>${pad(Q.stages.indexOf(st) + 1)}</b><span>${st}</span><em>${list.filter(m => !m.soon).length} of ${list.length} live</em></div><div class="cards">${list.map(m => modCard(m)).join("")}</div></section>`).join("")}</div></div>`;
}

function viewModule(slug) {
  const m = M[slug]; if (!m || m.soon) return notFound();
  const p = P[m.program], w = isWritten(slug);
  const proj = m.project && PR[m.project];
  const pre = m.prereq.map(s => `<a class="chip" href="#m-${s}">${M[s].title}</a>`).join("") || '<span style="color:var(--mute)">None, start here</span>';
  const mins = m.lessons.reduce((a, l) => a + l[3], 0);
  return `<div class="wrap">${crumbs([["Knowledge Hub", "#hub"], [p.name, "#p-" + p.id], [m.title]])}
  <div class="mhead"><div><span class="lbl">${p.short} · Module ${pad(m.n)}</span><h1 style="margin-top:12px">${m.title}</h1><p class="lead">${m.desc}</p>
    <div class="chips" style="margin-top:18px"><span style="color:var(--mute);font-size:14px;align-self:center">Before this:</span>${pre}</div></div>
    <div class="facts"><div class="f"><span>Lessons</span><b>${m.lessons.length}</b></div><div class="f"><span>Reading time</span><b>${Math.round(mins / 6) / 10} h</b></div><div class="f"><span>Total workload</span><b>${m.hours} h</b></div><div class="f"><span>Level</span><b>${m.level}</b></div>
      <a class="btn" href="#l-${slug}--${m.lessons[0][0]}" style="justify-content:center">Start lesson 1 →</a></div></div>
  <section class="sec"><div class="lbl">01 · Lessons</div><div class="lessons">${m.lessons.map((l, i) => `<a class="les" href="#l-${slug}--${l[0]}"><span class="n">${pad(i + 1)}</span><span><b>${l[1]}</b><small>${l[2]}</small></span>${w ? `<span class="min">${l[3]} min</span>` : '<span class="wip">In writing</span>'}</a>`).join("")}</div></section>
  <section class="sec"><div class="lbl">02 · Module exam</div><div class="gate"><div><h3>${m.title} exam</h3><p style="margin:6px 0 0;color:var(--ink2)">A mixed set of questions across all ${m.lessons.length} lessons. Score 70% or more and the module is done. Explanations are shown after you submit.</p></div>
    ${w ? `<a class="btn ghost" href="#e-${slug}">Take the exam</a>` : '<span class="wip" style="border:1px dashed var(--line2);padding:8px 12px;color:var(--mute)">In writing</span>'}</div></section>
  ${proj ? `<section class="sec"><div class="lbl">03 · Module project</div><a class="proj" href="#x-${proj.slug}" style="display:block;text-decoration:none"><div class="path"><i></i><i></i><i></i><span style="margin-left:8px">~/vault/${proj.slug.replace(/-/g, "_")}.ipynb</span></div><div class="in"><span class="lbl">Notebook · ${proj.level} · ${proj.hours}h · Python</span><h3>${proj.title}</h3><p style="margin:0;color:var(--ink2)">${proj.desc}</p></div></a></section>` : ""}
  </div>`;
}

/* ---------- lesson rendering ---------- */
const KW = /\b(def|return|import|from|as|for|in|if|elif|else|while|and|or|not|None|True|False|lambda|class|with|try|except|print|range|len)\b/;
function hl(src) {
  const re = /(#[^\n]*)|("""[\s\S]*?"""|'[^'\n]*'|"[^"\n]*")|(\b\d+(?:\.\d+)?(?:e-?\d+)?\b)|([A-Za-z_]\w*)/g;
  let out = "", last = 0, mt;
  while ((mt = re.exec(src))) {
    out += esc(src.slice(last, mt.index));
    if (mt[1]) out += `<span class="c">${esc(mt[1])}</span>`;
    else if (mt[2]) out += `<span class="s">${esc(mt[2])}</span>`;
    else if (mt[3]) out += `<span class="nu">${mt[3]}</span>`;
    else out += KW.test(mt[4]) && mt[4].match(KW)[0] === mt[4] ? `<span class="k">${mt[4]}</span>` : esc(mt[4]);
    last = re.lastIndex;
  }
  return out + esc(src.slice(last));
}
let plotQueue = [], quizBank = {};
function quizHTML(qs, id, title, tag, exam) {
  quizBank[id] = { qs, exam };
  return `<div class="quiz" id="${id}"><div class="qh">${title}<span>${tag}</span></div>${qs.map((q, i) => `<div class="q" data-i="${i}"><p class="qq">${exam ? `<b>${i + 1}.</b> ` : ""}${q.q}</p><div class="opts">${q.o.map((o, j) => `<button class="opt" data-j="${j}"><i>${"ABCDE"[j]}</i><span>${o}</span></button>`).join("")}</div><div class="why">${q.why || ""}</div></div>`).join("")}
  ${exam ? `<div class="score"><span id="${id}-s" style="color:var(--mute)">Answer every question, then submit.</span><button class="btn" data-submit="${id}">Submit exam</button></div>` : ""}</div>`;
}
function block(b) {
  if (b.p) return `<p>${b.p}</p>`;
  if (b.h) return `<h3>${b.h}</h3>`;
  if (b.math) return `<div class="dm">$$${b.math}$$</div>`;
  if (b.list) return `<ul>${b.list.map(x => `<li>${x}</li>`).join("")}</ul>`;
  if (b.ol) return `<ol>${b.ol.map(x => `<li>${x}</li>`).join("")}</ol>`;
  if (b.note) { const n = b.note; return `<div class="note ${n.kind || ""}"><div class="nh">${n.title}<span>${n.tag || (n.kind === "key" ? "Key idea" : n.kind === "warn" ? "Watch out" : "On the desk")}</span></div><div class="nb">${n.body.map(block).join("")}</div></div>`; }
  if (b.code) return `<div class="code"><div class="ch"><span>${b.file || "python"}</span><button data-copy>Copy</button></div><pre>${hl(b.code)}</pre>${b.out ? `<div class="out">${esc(b.out)}</div>` : ""}</div>`;
  if (b.table) { const t = b.table, num = t.num || []; return `<div class="tbl"><table><thead><tr>${t.head.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${t.rows.map(r => `<tr>${r.map((c, i) => `<td class="${num.includes(i) ? "n" : ""}">${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`; }
  if (b.plot) { const id = "pl" + plotQueue.length; plotQueue.push([id, b.plot]); const pl = b.plot; return `<div class="plot" id="${id}"><div class="fig" style="height:${pl.h || 300}px"><svg></svg></div>${(pl.params || []).length ? `<div class="ctl">${pl.params.map(pr => `<label>${pr.label}<input type="range" min="${pr.min}" max="${pr.max}" step="${pr.step}" value="${pr.value}" data-p="${pr.id}" aria-label="${esc(pr.label)}"><output></output></label>`).join("")}</div>` : ""}${pl.readout ? '<div class="ro"></div>' : ""}${pl.caption ? `<div class="cap">${pl.caption}</div>` : ""}</div>`; }
  if (b.check) return quizHTML([b.check], "ck" + Math.random().toString(36).slice(2, 8), "Quick check", "Try it");
  if (b.html) return b.html;
  return "";
}
function niceTicks(a, b, n) {
  const span = b - a, step0 = span / n, mag = 10 ** Math.floor(Math.log10(step0)), r = step0 / mag;
  const step = (r < 1.5 ? 1 : r < 3 ? 2 : r < 7 ? 5 : 10) * mag, out = [];
  for (let v = Math.ceil(a / step) * step; v <= b + 1e-9; v += step) out.push(+v.toFixed(10));
  return out;
}
function fmtTick(v) { const a = Math.abs(v); return a >= 1000 ? v.toFixed(0) : a >= 10 ? +v.toFixed(1) + "" : +v.toFixed(3) + ""; }
function mountPlot(id, spec) {
  const root = document.getElementById(id); if (!root) return;
  const svg = root.querySelector("svg"), fig = root.querySelector(".fig");
  const ro = root.querySelector(".ro");
  const par = {};
  (spec.params || []).forEach(pr => par[pr.id] = +pr.value);
  const draw = () => {
    const W = fig.clientWidth, H = fig.clientHeight; if (!W) return;
    const p = spec.dyn ? Object.assign({}, par, spec.dyn(par)) : par;
    const xr = typeof spec.x === "function" ? spec.x(p) : spec.x, yr = typeof spec.y === "function" ? spec.y(p) : spec.y;
    const L = 46, R = 16, T = 14, B = 28, pw = W - L - R, ph = H - T - B;
    const sx = x => L + (x - xr[0]) / (xr[1] - xr[0]) * pw, sy = y => T + (1 - (y - yr[0]) / (yr[1] - yr[0])) * ph;
    let g = `<defs><clipPath id="${id}c"><rect x="${L}" y="${T}" width="${pw}" height="${ph}"/></clipPath></defs>`;
    const xt = niceTicks(xr[0], xr[1], W < 520 ? 4 : 8), yt = niceTicks(yr[0], yr[1], 5);
    yt.forEach(v => g += `<line x1="${L}" x2="${L + pw}" y1="${sy(v)}" y2="${sy(v)}" stroke="#1d1d1d"/><text x="${L - 8}" y="${sy(v) + 4}" text-anchor="end">${fmtTick(v)}</text>`);
    xt.forEach(v => g += `<text x="${sx(v)}" y="${H - 8}" text-anchor="middle">${fmtTick(v)}</text>`);
    if (yr[0] < 0 && yr[1] > 0) g += `<line x1="${L}" x2="${L + pw}" y1="${sy(0)}" y2="${sy(0)}" stroke="#4a4a4a"/>`;
    if (xr[0] < 0 && xr[1] > 0) g += `<line y1="${T}" y2="${T + ph}" x1="${sx(0)}" x2="${sx(0)}" stroke="#4a4a4a"/>`;
    g += `<g clip-path="url(#${id}c)">`;
    if (spec.rects) spec.rects(p).forEach(r => { const y0 = sy(0), y1 = sy(r.y); g += `<rect x="${sx(r.x0)}" width="${Math.max(0, sx(r.x1) - sx(r.x0))}" y="${Math.min(y0, y1)}" height="${Math.abs(y1 - y0)}" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.55)" stroke-width="1"/>`; });
    if (spec.area) { const a = spec.area(p), N = 120; let d = `M${sx(a.from)} ${sy(0)}`; for (let i = 0; i <= N; i++) { const x = a.from + (a.to - a.from) * i / N; d += ` L${sx(x)} ${sy(a.f(x, p))}`; } d += ` L${sx(a.to)} ${sy(0)} Z`; g += `<path d="${d}" fill="rgba(255,255,255,.16)"/>`; }
    (spec.fns || []).forEach(fn => {
      const N = Math.max(200, Math.round(pw)); let d = "", pen = false, prev = null;
      for (let i = 0; i <= N; i++) {
        const x = xr[0] + (xr[1] - xr[0]) * i / N; let y; try { y = fn.f(x, p); } catch (e) { y = NaN; }
        const ok = Number.isFinite(y) && Math.abs(y - (prev ?? y)) < (yr[1] - yr[0]) * 3;
        if (!Number.isFinite(y)) { pen = false; prev = null; continue; }
        d += (pen && ok ? " L" : " M") + sx(x).toFixed(1) + " " + sy(Math.max(yr[0] - (yr[1] - yr[0]), Math.min(yr[1] + (yr[1] - yr[0]), y))).toFixed(1);
        pen = true; prev = y;
      }
      g += `<path d="${d}" fill="none" stroke="${fn.faint ? "#7a7a7a" : "#fff"}" stroke-width="${fn.faint ? 1.5 : 2.2}" ${fn.dash ? 'stroke-dasharray="6 5"' : ""}/>`;
    });
    if (spec.segs) spec.segs(p).forEach(s => g += `<line x1="${sx(s.x1)}" y1="${sy(s.y1)}" x2="${sx(s.x2)}" y2="${sy(s.y2)}" stroke="${s.faint ? "#7a7a7a" : "#fff"}" stroke-width="${s.w || 1.5}" ${s.dash ? 'stroke-dasharray="5 4"' : ""}/>`);
    if (spec.vlines) spec.vlines(p).forEach(v => g += `<line x1="${sx(v.x)}" x2="${sx(v.x)}" y1="${T}" y2="${T + ph}" stroke="#8a8a8a" stroke-dasharray="3 4"/>`);
    g += `</g>`;
    if (spec.points) spec.points(p).forEach(pt => { if (pt.y < yr[0] || pt.y > yr[1] || pt.x < xr[0] || pt.x > xr[1]) return; g += `<circle cx="${sx(pt.x)}" cy="${sy(pt.y)}" r="5" fill="${pt.open ? "#0a0a0a" : "#fff"}" stroke="#fff" stroke-width="2"/>${pt.label ? `<text x="${sx(pt.x) + (sx(pt.x) > L + pw - 120 ? -10 : 10)}" y="${sy(pt.y) - 10}" text-anchor="${sx(pt.x) > L + pw - 120 ? "end" : "start"}" style="fill:#fff">${pt.label}</text>` : ""}`; });
    (spec.fns || []).forEach(fn => { if (!fn.label) return; const x = fn.lx ?? xr[1] - (xr[1] - xr[0]) * .02; let y; try { y = fn.f(x, p); } catch (e) { return; } if (!Number.isFinite(y) || y < yr[0] || y > yr[1]) return; g += `<text x="${sx(x)}" y="${sy(y) - 9}" text-anchor="end" style="fill:${fn.faint ? "#9a9a9a" : "#fff"}">${fn.label}</text>`; });
    if (spec.xlabel) g += `<text x="${L + pw}" y="${T + ph - 6}" text-anchor="end">${spec.xlabel}</text>`;
    if (spec.ylabel) g += `<text x="${L + 6}" y="${T + 12}">${spec.ylabel}</text>`;
    svg.innerHTML = g;
    if (ro) ro.innerHTML = spec.readout(p);
    root.querySelectorAll("input[data-p]").forEach(inp => { const pr = spec.params.find(z => z.id === inp.dataset.p); inp.nextElementSibling.textContent = pr.fmt ? pr.fmt(par[pr.id]) : par[pr.id]; });
  };
  root.querySelectorAll("input[data-p]").forEach(inp => inp.addEventListener("input", () => { par[inp.dataset.p] = +inp.value; draw(); }));
  const obs = new ResizeObserver(draw); obs.observe(fig);
}

function lessonNav(m, i) {
  const prev = i > 0 ? m.lessons[i - 1] : null, next = i < m.lessons.length - 1 ? m.lessons[i + 1] : null;
  return `<div class="pn">${prev ? `<a href="#l-${m.slug}--${prev[0]}"><small>← Previous</small><b>${prev[1]}</b></a>` : `<a href="#m-${m.slug}"><small>← Module</small><b>${m.title}</b></a>`}
    ${next ? `<a class="r" href="#l-${m.slug}--${next[0]}"><small>Next lesson →</small><b>${next[1]}</b></a>` : `<a class="r" href="${isWritten(m.slug) ? "#e-" + m.slug : "#m-" + m.slug}"><small>Finish →</small><b>${m.title} exam</b></a>`}</div>`;
}
function viewLesson(ms, ls, data) {
  const m = M[ms]; if (!m) return notFound();
  const i = m.lessons.findIndex(l => l[0] === ls); if (i < 0) return notFound();
  const l = m.lessons[i], p = P[m.program], c = data && data.lessons && data.lessons[ls];
  plotQueue = [];
  const head = `<div class="lhead"><a class="back" href="#m-${ms}">← Back to ${m.title}</a>
    <div class="lmeta"><span class="lbl">${p.short} · ${m.title}</span><span class="r">${pad(i + 1)} / ${pad(m.lessons.length)} · ${l[3]} min</span></div>
    <div class="segs" style="grid-template-columns:repeat(${m.lessons.length},minmax(0,1fr))">${m.lessons.map((_, k) => `<i class="${k <= i ? "on" : ""}"></i>`).join("")}</div>
    <h1>${l[1]}</h1><p>${l[2]}</p></div>`;
  if (!c) return `<div class="wrap"><div class="lesson"><article>${head}<div class="empty"><h3>This lesson is being written</h3><p style="margin:8px 0 0">The outline is fixed: <b>${l[2]}</b>. The full text, examples and quiz are added module by module, following the roadmap order.</p></div>${lessonNav(m, i)}</article><aside class="toc"></aside></div></div>`;
  const secs = c.sections.map((s, k) => `<h2 id="s${k + 1}">${k + 1}. ${s.t}</h2>${s.b.map(block).join("")}`).join("");
  return `<div class="wrap"><div class="lesson"><article>${head}<div class="body">${c.intro ? c.intro.map(block).join("") : ""}${secs}
    ${c.take ? `<div class="take"><div class="nh">What you can do now</div><ul>${c.take.map(t => `<li>${t}</li>`).join("")}</ul></div>` : ""}
    ${c.quiz ? quizHTML(c.quiz, "lq", "Lesson quiz", c.quiz.length + " questions") : ""}</div>${lessonNav(m, i)}</article>
    <aside class="toc"><span class="lbl">In this lesson</span><ol>${c.sections.map((s, k) => `<li><a href="#s${k + 1}" data-s="s${k + 1}">${k + 1}. ${s.t}</a></li>`).join("")}</ol></aside></div></div>`;
}
function viewExam(ms, data) {
  const m = M[ms]; if (!m || !data || !data.exam) return notFound();
  return `<div class="wrap" style="max-width:860px;padding-bottom:80px">${crumbs([["Knowledge Hub", "#hub"], [m.title, "#m-" + ms], ["Exam"]])}
    <h1 style="margin-top:14px">${m.title} exam</h1><p class="lead">${data.exam.length} questions across the whole module. Pass mark 70%. Choose one answer per question, then submit to see your score and every explanation.</p>
    ${quizHTML(data.exam, "ex", "Module exam", data.exam.length + " questions", true)}
    <div class="pn"><a href="#m-${ms}"><small>← Back</small><b>${m.title}</b></a>${(() => { const k = Q.order.indexOf(ms); const nx = Q.order.slice(k + 1).map(s => M[s]).find(x => !x.soon); return nx ? `<a class="r" href="#m-${nx.slug}"><small>Next on the roadmap →</small><b>${nx.title}</b></a>` : ""; })()}</div></div>`;
}
function viewProjects() {
  return `<div class="wrap" style="padding-bottom:40px">${crumbs([["Knowledge Hub", "#hub"], ["Projects"]])}
    <h1 style="margin-top:14px">Projects vault</h1><p class="lead">Each notebook builds one working stage of a quant pipeline: raw data in, signals, weights, orders and risk reports out.</p>
    <div class="pipe">${Q.pipeline.map((s, i) => `<div><em>${pad(i + 1)}</em><b>${s.name}</b><span>${s.note}</span></div>`).join("")}</div>
    ${Q.pipeline.map((s, i) => { const ps = Q.projects.filter(p => p.stage === i); return ps.length ? `<section class="sec"><div class="lbl">${pad(i + 1)} · ${s.name}</div><div class="pcards">${ps.map(pcard).join("")}</div></section>` : ""; }).join("")}</div>`;
}
const pcard = p => `<a class="pcard" href="#x-${p.slug}"><div class="proj" style="border:0"><div class="path"><i></i><i></i><i></i><span style="margin-left:8px">${p.slug.replace(/-/g, "_")}.ipynb</span></div></div><div class="in"><h3>${p.title}</h3><p style="margin:0;color:var(--ink2);font-size:15px">${p.desc}</p></div><div class="meta"><span>${p.level}</span><span>${p.hours}h</span><span>${M[p.module].title}</span></div></a>`;
function viewProject(slug, data) {
  const p = PR[slug]; if (!p) return notFound();
  const m = M[p.module];
  const cells = data ? data.cells.map(c => c.md ? `<div class="body" style="margin:18px 0">${c.md.map(block).join("")}</div>` : c.task ? `<div class="note key"><div class="nh">${c.title || "Your turn"}<span>Task</span></div><div class="nb">${c.task.map(block).join("")}</div></div>` : block(c)).join("") : `<div class="empty"><h3>Notebook in writing</h3><p style="margin:8px 0 0">The brief is set; the step-by-step notebook is added after the ${m.title} module is complete.</p></div>`;
  plotQueue = [];
  return `<div class="wrap" style="max-width:900px;padding-bottom:80px">${crumbs([["Knowledge Hub", "#hub"], ["Projects", "#projects"], [p.title]])}
    <span class="lbl" style="display:block;margin-top:18px">Notebook · ${p.level} · ${p.hours}h · ${Q.pipeline[p.stage].name}</span><h1 style="margin-top:12px">${p.title}</h1><p class="lead">${p.desc}</p>
    <div class="chips" style="margin-top:16px"><span style="color:var(--mute);font-size:14px;align-self:center">Builds on</span><a class="chip" href="#m-${m.slug}">${m.title}</a></div>${cells}</div>`;
}
const notFound = () => `<div class="wrap"><div class="empty" style="margin-top:40px"><h3>Page not found</h3><p><a href="#roadmap">Back to the roadmap</a></p></div></div>`;

/* ---------- router ---------- */
async function route() {
  const h = decodeURIComponent(location.hash.slice(1)) || "roadmap";
  let html, nav = "roadmap";
  if (h === "roadmap") html = viewRoadmap();
  else if (h === "hub") { html = viewHub(); nav = "hub"; }
  else if (h === "programs") { html = viewPrograms(); nav = "programs"; }
  else if (h.startsWith("p-")) { html = viewProgram(h.slice(2)); nav = "programs"; }
  else if (h === "projects") { html = viewProjects(); nav = "projects"; }
  else if (h.startsWith("x-")) { const d = await loadProject(h.slice(2)); html = viewProject(h.slice(2), d); nav = "projects"; }
  else if (h.startsWith("m-")) { html = viewModule(h.slice(2)); nav = "programs"; }
  else if (h.startsWith("e-")) { const s = h.slice(2); const d = await loadContent(s); html = viewExam(s, d); nav = "programs"; }
  else if (h.startsWith("l-")) { const [ms, ls] = h.slice(2).split("--"); const d = await loadContent(ms); html = viewLesson(ms, ls, d); nav = "programs"; }
  else if (/^s\d+$/.test(h)) { return; }
  else html = notFound();
  app.innerHTML = html;
  document.querySelectorAll("#nav a").forEach(a => a.classList.toggle("on", a.dataset.n === nav));
  window.scrollTo(0, 0);
  plotQueue.forEach(([id, spec]) => mountPlot(id, spec));
  typeset(app);
  const t = app.querySelector("h1"); document.title = (t ? t.textContent + " · " : "") + "QFC Knowledge Hub";
  tocSpy();
}
let spy;
function tocSpy() {
  if (spy) spy.disconnect();
  const links = [...app.querySelectorAll(".toc a")]; if (!links.length) return;
  spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.classList.toggle("on", a.dataset.s === e.target.id)); }), { rootMargin: "-80px 0px -70% 0px" });
  app.querySelectorAll(".body h2[id]").forEach(h => spy.observe(h));
}

/* ---------- events ---------- */
app.addEventListener("click", e => {
  const seg = e.target.closest(".seg button");
  if (seg) { roadView = seg.dataset.v; app.innerHTML = viewRoadmap(); return; }
  const toc = e.target.closest(".toc a");
  if (toc) { e.preventDefault(); const t = document.getElementById(toc.dataset.s); if (t) t.scrollIntoView({ behavior: "smooth" }); return; }
  const cp = e.target.closest("[data-copy]");
  if (cp) { const txt = cp.closest(".code").querySelector("pre").textContent; try { navigator.clipboard.writeText(txt).then(() => { cp.textContent = "Copied"; setTimeout(() => cp.textContent = "Copy", 1400); }, () => { cp.textContent = "Select & copy"; }); } catch (err) { cp.textContent = "Select & copy"; } return; }
  const opt = e.target.closest(".opt");
  if (opt) {
    const qd = opt.closest(".q"), qz = opt.closest(".quiz"), bank = quizBank[qz.id]; if (!bank || qd.classList.contains("done")) return;
    const q = bank.qs[+qd.dataset.i], j = +opt.dataset.j;
    if (bank.exam) { qd.querySelectorAll(".opt").forEach(o => o.style.borderColor = ""); opt.style.borderColor = "#fff"; qd.dataset.pick = j; return; }
    qd.classList.add("done");
    qd.querySelectorAll(".opt").forEach((o, k) => { if (k === q.a) o.classList.add("right"); else if (k === j) o.classList.add("wrong"); });
    return;
  }
  const sub = e.target.closest("[data-submit]");
  if (sub) {
    const qz = document.getElementById(sub.dataset.submit), bank = quizBank[qz.id], qds = [...qz.querySelectorAll(".q")];
    const miss = qds.filter(d => d.dataset.pick === undefined).length;
    const s = document.getElementById(qz.id + "-s");
    if (miss) { s.textContent = `${miss} question${miss > 1 ? "s" : ""} still open.`; return; }
    let ok = 0;
    qds.forEach(d => { const q = bank.qs[+d.dataset.i], j = +d.dataset.pick; if (j === q.a) ok++; d.classList.add("done"); d.querySelectorAll(".opt").forEach((o, k) => { o.style.borderColor = ""; if (k === q.a) o.classList.add("right"); else if (k === j) o.classList.add("wrong"); }); });
    const pct = Math.round(ok / qds.length * 100);
    s.innerHTML = `<b>${pct}%</b> <span style="margin-left:10px">${ok} of ${qds.length} correct · ${pct >= 70 ? "Passed. Module complete." : "Not yet. Review the explanations and try again."}</span>`;
    sub.textContent = "Retake"; sub.removeAttribute("data-submit"); sub.onclick = () => route();
  }
});
window.addEventListener("hashchange", route);
route();
}
