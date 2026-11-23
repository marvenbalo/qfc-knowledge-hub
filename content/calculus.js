/* Math for Quants · Module 1 · Calculus — original QFC text */
{
const R = String.raw;
const f1 = x => (x * x - 1) / (x - 1);
const bondP = (y, T) => 100 * Math.exp(-y * T);
const kelly = (f, p, b) => p * Math.log(1 + f * b) + (1 - p) * Math.log(1 - f);
const phi = x => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);

QFC.content["calculus"] = {
lessons: {

/* ------------------------------------------------------------------ */
"limits-and-continuity": {
  intro: [
    { p: R`Take the function` },
    { math: R`g(x) = \frac{x^2 - 1}{x - 1}` },
    { p: R`At $x = 2$ it gives $3/1 = 3$. At $x = 0.5$ it gives $-0.75/-0.5 = 1.5$. At $x = 1$ it gives $0/0$, which is not a number at all. The formula is silent at exactly the point we might care about.` },
    { p: R`Yet nobody who looks at the graph is in doubt about what is going on near $x = 1$. Move $x$ towards 1 below and watch the value.` },
    { plot: { x: [-1, 3], y: [-0.5, 4.5], h: 280,
      fns: [{ f: f1 }],
      params: [{ id: "x", label: "x", min: 0, max: 2, step: 0.001, value: 0.6, fmt: v => v.toFixed(3) }],
      points: p => [{ x: 1, y: 2, open: true, label: "hole at x = 1" }, ...(Math.abs(p.x - 1) > 1e-9 ? [{ x: p.x, y: f1(p.x) }] : [])],
      readout: p => Math.abs(p.x - 1) < 1e-9 ? "x = 1.000   g(x) = 0/0  (undefined)" : `x = ${p.x.toFixed(3)}   g(x) = ${f1(p.x).toFixed(6)}   distance from 2: ${Math.abs(f1(p.x) - 2).toFixed(6)}`,
      caption: "The graph is the line y = x + 1 with a single point removed. The open circle marks where the formula has no value." } },
    { p: R`However close you get, from either side, the output gets as close as you like to 2. That is the entire idea of a <strong>limit</strong>: not the value at a point, but the value the function is heading towards as you approach it.` },
    { note: { kind: "key", title: "Why start here", body: [{ p: R`Derivatives, integrals, continuous compounding and Brownian motion are all defined as limits. Every one of them hides a question of the form "what happens as something gets very small or very large?" This lesson gives you the vocabulary for that question.` }] } }
  ],
  sections: [
    { t: "The notation", b: [
      { p: R`We write` },
      { math: R`\lim_{x \to a} g(x) = L` },
      { p: R`and read it as "the limit of $g(x)$ as $x$ approaches $a$ is $L$". It means: you can make $g(x)$ as close to $L$ as you want by taking $x$ close enough to $a$, <em>without ever setting $x = a$</em>. The value at $a$ itself, if it exists, plays no role.` },
      { p: R`For our example, $\lim_{x\to 1} \frac{x^2-1}{x-1} = 2$ even though $g(1)$ is undefined.` },
      { note: { title: "The precise version, once", tag: "For reference", body: [
        { p: R`For every tolerance $\varepsilon > 0$ there is a distance $\delta > 0$ such that $0 < |x - a| < \delta$ implies $|g(x) - L| < \varepsilon$. In words: name any accuracy, and I can tell you how close to $a$ you need to be to achieve it. You will rarely use this directly, but it is what the readout in the chart above is checking.` }] } }
    ] },
    { t: "When you can just plug in", b: [
      { p: R`Most functions you meet are well-behaved wherever they are defined. Polynomials, $e^x$, $\ln x$ for $x>0$, $\sqrt{x}$ for $x \ge 0$, and sums, products and compositions of these all share one property: the limit at a point equals the value at that point. For them,` },
      { math: R`\lim_{x \to a} f(x) = f(a).` },
      { p: R`So $\lim_{x\to 2}(3x^2 - x) = 12 - 2 = 10$, and $\lim_{r\to 0.05} e^{-5r} = e^{-0.25} \approx 0.7788$. No cleverness required.` },
      { p: R`The only places you need to think are where direct substitution breaks: a zero in a denominator, a negative number under a square root, the log of zero, or a function defined piece by piece.` },
      { check: { q: R`What is $\lim_{x\to 3} \dfrac{x^2 + 1}{x - 1}$?`, o: ["5", "10/3", "It does not exist", "0/0, so we must factor"], a: 0, why: R`The denominator at $x=3$ is 2, not 0, so plug in: $(9+1)/2 = 5$.` } }
    ] },
    { t: "When the formula fights back", b: [
      { p: R`If substitution gives $0/0$, the limit might still exist. $0/0$ is a signal that the top and bottom share a factor that vanishes at the point. Remove it and try again.` },
      { math: R`\frac{x^2 - 1}{x - 1} = \frac{(x-1)(x+1)}{x - 1} = x + 1 \quad (x \neq 1)` },
      { p: R`The two functions agree everywhere except at $x = 1$, and the limit never looks at $x = 1$. So the limit is $1 + 1 = 2$.` },
      { p: R`A second trick handles square roots: multiply by the conjugate.` },
      { math: R`\lim_{h\to 0}\frac{\sqrt{1+h}-1}{h} = \lim_{h\to 0}\frac{(1+h)-1}{h\,(\sqrt{1+h}+1)} = \lim_{h\to 0}\frac{1}{\sqrt{1+h}+1} = \frac12.` },
      { p: R`This shape, a small change on top divided by the same small change below, is exactly what a derivative is. You will see it again in the next lesson.` },
      { note: { kind: "warn", title: "0/0 is not 1, and not 0", body: [{ p: R`It is an indeterminate form: the answer depends on how fast top and bottom shrink. $\frac{2h}{h}\to 2$, $\frac{h^2}{h}\to 0$, $\frac{h}{h^2}$ blows up. Always simplify before concluding anything.` }] } }
    ] },
    { t: "Two directions", b: [
      { p: R`Some functions approach different values from the left and from the right. A clean financial example is a <strong>digital (binary) call</strong> with strike 100: it pays €1 if the underlying finishes above 100 and nothing otherwise.` },
      { plot: { x: [90, 110], y: [-0.2, 1.3], h: 240,
        fns: [{ f: S => S < 100 ? 0 : (S > 100 ? 1 : NaN) }],
        points: () => [{ x: 100, y: 0, open: true }, { x: 100, y: 1, label: "pays 1 at and above the strike" }],
        xlabel: "final price S", ylabel: "payoff",
        caption: "A digital call. Coming from the left the payoff is 0; from the right it is 1." } },
      { p: R`We write one-sided limits with a small sign:` },
      { math: R`\lim_{S\to 100^-} D(S) = 0, \qquad \lim_{S\to 100^+} D(S) = 1.` },
      { p: R`The two-sided limit $\lim_{S \to 100} D(S)$ exists only when both one-sided limits exist and agree. Here they disagree, so it does not exist.` },
      { note: { title: "Why desks dislike jumps", body: [{ p: R`Near the strike, a tiny move in the stock flips the payoff by the full amount. Hedging a digital close to expiry means trading huge quantities for small price moves. Traders often price and hedge digitals as tight call spreads precisely to replace the jump with a steep but continuous ramp.` }] } }
    ] },
    { t: "Continuous: no holes, no jumps", b: [
      { p: R`A function $f$ is <strong>continuous at $a$</strong> when three things hold:` },
      { ol: [R`$f(a)$ is defined,`, R`$\lim_{x\to a} f(x)$ exists,`, R`the two are equal.`] },
      { p: R`Our $g$ fails the first condition at $x=1$ (a hole). The digital payoff fails the second at the strike (a jump). A function that is continuous at every point of an interval can be drawn there without lifting the pen.` },
      { h: "Gap risk: a stop-loss assumes continuity" },
      { p: R`Suppose you hold a stock at 100 with a stop-loss at 95. The plan is that if the price falls, you sell at 95 and lose 5. That plan quietly assumes the price path is continuous: to get from 100 to anything below 95, it must pass through 95, and your order fills there.` },
      { p: R`Real prices are not continuous. Overnight news can open the stock at 88. The price never trades at 95, your stop turns into a market order, and you sell at 88. The loss is more than twice what you planned. Desks call this <strong>gap risk</strong>, and it is why stop-losses reduce risk but never cap it.` },
      { table: { head: ["Path", "Passes through 95?", "Exit", "Loss"], rows: [["100 → 97 → 95.2 → 94.8", "Yes, in small steps", "≈ 95", "≈ 5"], ["100 → 97 (close) → 88 (open)", "No, it jumps", "≈ 88", "≈ 12"]], num: [] } },
      { check: { q: R`Which of these is continuous at $x = 0$?`, o: [R`$f(x)=1/x$`, R`$f(x)=|x|$`, R`$f(x) = 0$ for $x<0$, $1$ for $x\ge0$`, R`$f(x)=\ln x$`], a: 1, why: R`$|x|$ is defined at 0, both one-sided limits are 0, and $|0|=0$. It has a corner, but no hole and no jump. $1/x$ and $\ln x$ are undefined at 0; the step function jumps.` } }
    ] },
    { t: "Limits at infinity, and where e comes from", b: [
      { p: R`Limits also describe what happens as an input grows without bound. Put €1 in an account paying 100% a year. Compounded once, you get €2. Compounded twice, each half-year pays 50%: $(1.5)^2 = 2.25$. Compounded $n$ times:` },
      { math: R`\left(1 + \frac{1}{n}\right)^n` },
      { table: { head: ["n (payments per year)", "Value after one year"], rows: [["1", "2.000000"], ["2", "2.250000"], ["12 (monthly)", "2.613035"], ["365 (daily)", "2.714567"], ["8 760 (hourly)", "2.718127"], ["∞ (continuous)", "2.718282…"]], num: [1] } },
      { p: R`More frequent compounding helps less and less. The values settle on a constant,` },
      { math: R`e = \lim_{n\to\infty}\left(1+\frac1n\right)^n \approx 2.718282.` },
      { p: R`This is where continuous compounding, $e^{rT}$, comes from. Lesson 4 builds on it directly.` }
    ] }
  ],
  take: [R`Explain a limit as "the value a function approaches", independent of the value at the point`, R`Evaluate limits by substitution when the function is well-behaved`, R`Resolve $0/0$ by factoring or using the conjugate`, R`Distinguish left and right limits and spot jumps such as digital payoffs`, R`Check continuity with the three-part test and explain gap risk`, R`Recognise $e$ as a limit and connect it to compounding`],
  quiz: [
    { q: R`$\lim_{x\to 2}\dfrac{x^2-4}{x-2}$ equals`, o: ["0", "2", "4", "It does not exist"], a: 2, why: R`Factor: $\frac{(x-2)(x+2)}{x-2} = x+2 \to 4$.` },
    { q: "A function has left limit 3 and right limit 3 at a point, but the function value there is 5. It is", o: ["continuous", "discontinuous with a removable gap", "discontinuous with a jump", "undefined"], a: 1, why: "The limit exists (3) but differs from the value (5). Redefining one point would fix it, so it is called removable." },
    { q: "Why can a stop-loss order lose more than the planned amount?", o: ["Brokers add fees", "Prices can jump past the stop level without trading there", "The limit of the price does not exist", "Stop-loss orders are filled at the previous close"], a: 1, why: "The plan assumes a continuous path. A gap skips the stop price, and the order fills at the next available price." },
    { q: R`$\left(1+\frac{1}{n}\right)^n$ as $n\to\infty$ tends to`, o: ["1", "2", "e ≈ 2.718", "infinity"], a: 2, why: "This is the definition of e: the growth of 1 unit at 100% a year with continuous compounding." }
  ]
},

/* ------------------------------------------------------------------ */
"the-derivative": {
  intro: [
    { p: R`Almost every number on a risk screen is a derivative. Delta is how an option's value changes with the stock. Duration is how a bond's price changes with yield. Beta is how a stock moves with the market. Before any of those, we need the basic object: the rate at which one quantity changes when another moves a little.` }
  ],
  sections: [
    { t: "Average rate of change", b: [
      { p: R`Suppose a position's value is $V(S)$ as a function of the underlying price $S$. If the price moves from $S$ to $S + h$, the average rate of change over that move is` },
      { math: R`\frac{V(S+h) - V(S)}{h}.` },
      { p: R`Geometrically this is the slope of the <strong>secant line</strong> through the two points on the graph. If you hold 50 shares, $V(S)=50S$ and the ratio is exactly 50 for every $h$. For anything curved, the answer depends on $h$, and that is the problem the derivative solves.` }
    ] },
    { t: "From secant to tangent", b: [
      { p: R`Shrink $h$ towards zero. The secant line pivots and settles on the <strong>tangent line</strong>. Its slope is the derivative:` },
      { math: R`f'(x) = \lim_{h\to 0}\frac{f(x+h)-f(x)}{h}.` },
      { p: R`Below, $f(x)=x^3 - 3x$ and the point is $x=1.5$. Pull $h$ down and watch the secant slope converge to $f'(1.5)=3(1.5)^2-3=3.75$.` },
      { plot: { x: [-2.5, 3], y: [-4, 8], h: 300,
        fns: [{ f: x => x ** 3 - 3 * x }],
        params: [{ id: "h", label: "h", min: 0.01, max: 1.4, step: 0.01, value: 1.2, fmt: v => v.toFixed(2) }],
        segs: p => { const a = 1.5, fa = a ** 3 - 3 * a, fb = (a + p.h) ** 3 - 3 * (a + p.h), m = (fb - fa) / p.h, t = 3.75; return [{ x1: -2.5, y1: fa + m * (-2.5 - a), x2: 3, y2: fa + m * (3 - a) }, { x1: -2.5, y1: fa + t * (-2.5 - a), x2: 3, y2: fa + t * (3 - a), dash: true, faint: true }]; },
        points: p => [{ x: 1.5, y: 1.5 ** 3 - 4.5 }, { x: 1.5 + p.h, y: (1.5 + p.h) ** 3 - 3 * (1.5 + p.h) }],
        readout: p => { const a = 1.5, m = ((a + p.h) ** 3 - 3 * (a + p.h) - (a ** 3 - 3 * a)) / p.h; return `secant slope = ${m.toFixed(4)}   tangent slope = 3.7500   gap = ${(m - 3.75).toFixed(4)}`; },
        caption: "Solid line: secant through x and x + h. Dashed: the tangent at x = 1.5." } },
      { p: R`Other notations you will meet: $\frac{df}{dx}$, $\frac{d}{dx}f(x)$ and, in physics and stochastic calculus, $\dot f$ for time derivatives. They all mean the same thing.` },
      { p: R`A function has a derivative at $x$ only if that limit exists. $|x|$ at 0 does not: the slope is $-1$ from the left and $+1$ from the right. Option payoffs at the strike have the same kink, which is why the delta of an option at expiry jumps from 0 to 1.` }
    ] },
    { t: "The rules you actually use", b: [
      { p: R`Nobody computes derivatives from the limit in practice. A small set of rules covers almost everything.` },
      { table: { head: ["Function", "Derivative", "Example"], rows: [
        [R`$c$ (constant)`, R`$0$`, R`$\frac{d}{dx}7 = 0$`],
        [R`$x^n$`, R`$n x^{n-1}$`, R`$\frac{d}{dx}x^4 = 4x^3$`],
        [R`$e^{x}$`, R`$e^{x}$`, R`$\frac{d}{dx}e^{x} = e^{x}$`],
        [R`$e^{kx}$`, R`$k e^{kx}$`, R`$\frac{d}{dt}e^{-0.03t} = -0.03e^{-0.03t}$`],
        [R`$\ln x$`, R`$1/x$`, R`$\frac{d}{dS}\ln S = 1/S$`],
        [R`$a f + b g$`, R`$a f' + b g'$`, R`$\frac{d}{dx}(3x^2+2x) = 6x+2$`],
        [R`$f g$`, R`$f'g + f g'$`, R`$\frac{d}{dx}x e^x = e^x + x e^x$`],
        [R`$f/g$`, R`$\frac{f'g - f g'}{g^2}$`, R`$\frac{d}{dx}\frac{1}{1+x} = -\frac{1}{(1+x)^2}$`],
        [R`$f(g(x))$`, R`$f'(g(x))\,g'(x)$`, R`$\frac{d}{dx}e^{x^2} = 2x e^{x^2}$`]] } },
      { p: R`The <strong>chain rule</strong> in the last row is the one quants use most. Whenever a quantity depends on something that depends on something else, sensitivities multiply. If a portfolio depends on a stock, and the stock depends on the market with beta $\beta$, then the portfolio's sensitivity to the market is (sensitivity to stock) × $\beta$.` },
      { check: { q: R`What is $\frac{d}{dx}\ln(1+2x)$?`, o: [R`$\frac{1}{1+2x}$`, R`$\frac{2}{1+2x}$`, R`$2\ln(1+2x)$`, R`$\frac{2x}{1+2x}$`], a: 1, why: R`Chain rule: outer derivative $\frac{1}{1+2x}$ times inner derivative $2$.` } }
    ] },
    { t: "Derivatives as sensitivities", b: [
      { p: R`Take a zero-coupon bond that pays €100 in $T$ years. With a continuously compounded yield $y$, its price is` },
      { math: R`P(y) = 100\,e^{-yT}.` },
      { p: R`Differentiate with respect to $y$:` },
      { math: R`\frac{dP}{dy} = -T \cdot 100\,e^{-yT} = -T\,P(y).` },
      { p: R`Two things fall out immediately. The sign is negative: prices fall when yields rise. And the size is proportional to $T$: a 10-year zero is ten times as sensitive as a 1-year zero. Dividing by price gives the relative sensitivity,` },
      { math: R`-\frac{1}{P}\frac{dP}{dy} = T,` },
      { p: R`which is the <strong>duration</strong> of the bond. For a zero-coupon bond, duration is just its maturity. For a coupon bond it is a weighted average of the payment times, which you will derive in the Finance program.` },
      { note: { title: "Reading a sensitivity", body: [{ p: R`A 10-year zero priced at €74.08 (yield 3%) has $dP/dy = -740.8$. A yield move of one basis point, $0.0001$, changes the price by roughly $-740.8 \times 0.0001 = -0.074$ euro. Desks quote exactly this number as the <strong>DV01</strong>: the value of a basis point.` }] } }
    ] },
    { t: "Linear approximation and curvature", b: [
      { p: R`Near a point, a differentiable function looks like its tangent line:` },
      { math: R`f(x+\Delta x) \approx f(x) + f'(x)\,\Delta x.` },
      { p: R`This is how risk is estimated on the fly: change in value ≈ sensitivity × change in input. It is accurate for small moves and drifts off for large ones, because real price curves bend. The <strong>second derivative</strong> $f''(x)$ measures that bend. Adding it gives a much better approximation:` },
      { math: R`f(x+\Delta x) \approx f(x) + f'(x)\,\Delta x + \tfrac12 f''(x)\,(\Delta x)^2.` },
      { p: R`For the bond, $P''(y) = T^2 P(y) > 0$: the price curve is convex. Move the yield shock below and compare the true price with the linear and quadratic estimates.` },
      { plot: { x: [0, 0.1], y: [55, 105], h: 300,
        fns: [{ f: y => bondP(y, 10), label: "true price" }],
        params: [{ id: "d", label: "yield shock Δy", min: -0.03, max: 0.05, step: 0.0005, value: 0.03, fmt: v => (v * 1e4).toFixed(0) + " bp" }],
        segs: p => { const y0 = 0.03, P0 = bondP(y0, 10); return [{ x1: 0, y1: P0 + (-10 * P0) * (0 - y0), x2: 0.1, y2: P0 + (-10 * P0) * (0.1 - y0), dash: true }]; },
        points: p => { const y0 = 0.03, y1 = y0 + p.d, P0 = bondP(y0, 10); return [{ x: y0, y: P0, label: "today: y = 3%" }, { x: y1, y: bondP(y1, 10) }, { x: y1, y: P0 - 10 * P0 * p.d, open: true }]; },
        readout: p => { const y0 = 0.03, P0 = bondP(y0, 10), tr = bondP(y0 + p.d, 10), li = P0 - 10 * P0 * p.d, qu = li + 0.5 * 100 * P0 * p.d * p.d; return `true ${tr.toFixed(3)}   linear ${li.toFixed(3)} (err ${(li - tr).toFixed(3)})   with convexity ${qu.toFixed(3)} (err ${(qu - tr).toFixed(3)})`; },
        xlabel: "yield y", ylabel: "price",
        caption: "10-year zero-coupon bond. Dashed: tangent at 3%. The open circle is the linear estimate after the shock." } },
      { p: R`The linear estimate always understates the price of a convex bond, whichever way yields move. That gap is the <strong>convexity</strong> effect. In options the same second-derivative term is called <strong>gamma</strong>.` }
    ] },
    { t: "Finding the best value", b: [
      { p: R`At a smooth maximum or minimum the tangent is flat, so $f'(x)=0$. The second derivative tells you which: $f''<0$ means the curve bends down, so a maximum; $f''>0$ means a minimum.` },
      { p: R`A classic quant example is sizing a repeated bet. You win $b$ times your stake with probability $p$ and lose your stake otherwise. If you bet a fraction $f$ of your capital each time, the long-run growth rate per bet is` },
      { math: R`G(f) = p\ln(1+fb) + (1-p)\ln(1-f).` },
      { p: R`Set $G'(f) = \frac{pb}{1+fb} - \frac{1-p}{1-f} = 0$ and solve:` },
      { math: R`f^* = p - \frac{1-p}{b}.` },
      { p: R`This is the <strong>Kelly fraction</strong>. Move the sliders: with a 55% win rate at even odds, $f^* = 0.10$. Betting twice that much gives roughly zero growth, and more than that makes you shrink, even though every bet has a positive expected value.` },
      { plot: { x: [0, 0.6], y: [-0.06, 0.06], h: 300,
        dyn: p => ({}),
        fns: [{ f: (f, p) => kelly(f, p.p, p.b) }],
        params: [{ id: "p", label: "win probability p", min: 0.5, max: 0.7, step: 0.005, value: 0.55, fmt: v => (v * 100).toFixed(1) + "%" }, { id: "b", label: "payout b", min: 0.5, max: 3, step: 0.05, value: 1, fmt: v => v.toFixed(2) + "×" }],
        points: p => { const fs = p.p - (1 - p.p) / p.b; return fs > 0 && fs < 0.6 ? [{ x: fs, y: kelly(fs, p.p, p.b), label: "f* = " + fs.toFixed(3) }] : []; },
        readout: p => { const fs = p.p - (1 - p.p) / p.b; return fs <= 0 ? "No edge: the best fraction is zero." : `f* = ${fs.toFixed(3)}   growth at f* = ${(kelly(fs, p.p, p.b) * 100).toFixed(3)}% per bet   growth at 2f* = ${(2 * fs < 1 ? kelly(2 * fs, p.p, p.b) * 100 : -Infinity).toFixed(3)}%`; },
        xlabel: "fraction bet f", ylabel: "growth per bet",
        caption: "Expected log growth per bet. The peak is where the derivative is zero." } },
      { check: { q: R`For $f(x) = -2x^2 + 8x + 1$, where is the maximum?`, o: ["x = 1", "x = 2", "x = 4", "x = 8"], a: 1, why: R`$f'(x) = -4x + 8 = 0$ gives $x = 2$, and $f'' = -4 < 0$ confirms a maximum.` } }
    ] },
    { t: "Derivatives in code", b: [
      { p: R`When a function is a black box, such as a pricing library, you estimate derivatives by <strong>finite differences</strong>. The central difference is far more accurate than the one-sided version for the same step:` },
      { math: R`f'(x)\approx\frac{f(x+h)-f(x-h)}{2h}, \qquad f''(x)\approx\frac{f(x+h)-2f(x)+f(x-h)}{h^2}.` },
      { code: R`import numpy as np

def price(y, T=10):
    return 100 * np.exp(-y * T)

y0 = 0.03
for h in [1e-2, 1e-4, 1e-6, 1e-12]:
    fwd = (price(y0 + h) - price(y0)) / h
    ctr = (price(y0 + h) - price(y0 - h)) / (2 * h)
    print(f"h={h:.0e}  forward={fwd:10.4f}  central={ctr:10.4f}")

print("exact:", -10 * price(y0))`, out: `h=1e-02  forward= -704.9817  central= -742.0535
h=1e-04  forward= -740.4479  central= -740.8183
h=1e-06  forward= -740.8145  central= -740.8182
h=1e-12  forward= -740.8261  central= -740.8190
exact: -740.8182206817179` },
      { p: R`Shrinking $h$ helps until floating-point rounding takes over: at $h=10^{-12}$ the subtraction of two nearly equal numbers loses digits and the estimate gets worse again. A step of about $10^{-5}$ to $10^{-6}$ times the size of $x$ is a sensible default for central differences.` }
    ] }
  ],
  take: [R`Define the derivative as the limit of secant slopes`, R`Differentiate polynomials, exponentials, logs, products, quotients and compositions`, R`Read a derivative as a sensitivity and compute duration and DV01 for a zero-coupon bond`, R`Use first- and second-order approximations and explain convexity`, R`Find and classify maxima and minima, including the Kelly fraction`, R`Estimate derivatives numerically and pick a sensible step size`],
  quiz: [
    { q: R`$\frac{d}{dx}\left(5x^3 - 2e^{x}\right)$ is`, o: [R`$15x^2 - 2e^x$`, R`$15x^2 - 2xe^{x-1}$`, R`$5x^2-2e^x$`, R`$15x^3-2e^x$`], a: 0, why: R`Power rule on $5x^3$ gives $15x^2$; $e^x$ is its own derivative.` },
    { q: "A 5-year zero-coupon bond trades at €86.07 with continuous yield 3%. Approximately how much does it lose if yields rise 1 basis point?", o: ["€0.0043", "€0.043", "€0.43", "€4.30"], a: 1, why: R`$dP/dy = -T P = -5 \times 86.07 = -430.35$. Times $0.0001$ gives about €0.043.` },
    { q: "Why does the linear (duration) estimate understate the new price of a bond after any yield move?", o: ["Because the bond pays coupons", "Because the price curve is convex", "Because yields cannot go negative", "Because duration is measured in years"], a: 1, why: "A convex curve lies above its tangent lines, so the tangent estimate is too low on both sides." },
    { q: "With p = 0.6 and even odds (b = 1), the Kelly fraction is", o: ["0.1", "0.2", "0.4", "0.6"], a: 1, why: R`$f^* = 0.6 - 0.4/1 = 0.2$.` },
    { q: "Making the finite-difference step h extremely small (like 1e-12) usually", o: ["gives the exact derivative", "makes the estimate worse because of rounding error", "has no effect", "only matters for second derivatives"], a: 1, why: "Subtracting two almost equal floating-point numbers loses precision, so tiny steps amplify rounding errors." }
  ]
},

/* ------------------------------------------------------------------ */
"the-integral": {
  intro: [
    { p: R`The derivative breaks a quantity into its rate of change. The integral runs the other way: given a rate, it adds up the total. A fund that receives a continuous stream of fees, an option whose value is an average over all possible prices, the probability that a return lands in a range: each is an integral.` }
  ],
  sections: [
    { t: "Accumulation", b: [
      { p: R`Suppose cash flows in at a rate $c(t)$ euros per year. Over a short interval $\Delta t$ you receive about $c(t)\,\Delta t$. Over a long period you add up many such slices. In the limit of infinitely thin slices, the total is the area under the curve of $c$:` },
      { math: R`\text{total received from } a \text{ to } b = \int_a^b c(t)\,dt.` },
      { p: R`The integral sign is a stretched S for "sum", and $dt$ reminds you of the slice width. If the rate is constant, the area is a rectangle: 2 000 €/year for 3 years gives €6 000. The integral generalises that to rates that change.` }
    ] },
    { t: "Riemann sums", b: [
      { p: R`To compute an area under a curve, cover it with $n$ rectangles of width $\Delta x = (b-a)/n$ and add them up. Using the midpoint of each slice for the height gives` },
      { math: R`M_n = \sum_{i=1}^{n} f\!\left(x_i^{\text{mid}}\right)\Delta x.` },
      { p: R`Below, $f(x)=\varphi(x)$ is the standard normal density and we integrate from $-1$ to $2$. The exact answer is the probability that a standard normal falls in that range, about 0.818595.` },
      { plot: { x: [-3, 3], y: [0, 0.45], h: 280,
        fns: [{ f: phi }],
        params: [{ id: "n", label: "rectangles n", min: 1, max: 40, step: 1, value: 4, fmt: v => v.toFixed(0) }],
        rects: p => { const a = -1, b = 2, n = p.n, dx = (b - a) / n, r = []; for (let i = 0; i < n; i++) { const x0 = a + i * dx; r.push({ x0, x1: x0 + dx, y: phi(x0 + dx / 2) }); } return r; },
        readout: p => { const a = -1, b = 2, n = p.n, dx = (b - a) / n; let s = 0; for (let i = 0; i < n; i++) s += phi(a + (i + .5) * dx) * dx; return `midpoint sum = ${s.toFixed(6)}   exact = 0.818595   error = ${(s - 0.818595).toExponential(2)}`; },
        caption: "Midpoint rectangles under the standard normal density between -1 and 2." } },
      { p: R`The definite integral is the limit of these sums as $n\to\infty$. For any continuous function on a closed interval, left, right and midpoint sums all converge to the same number.` },
      { note: { kind: "key", title: "Signed area", body: [{ p: R`Where $f$ is negative, its rectangles count negatively. If $f$ is a P&L rate that dips below zero, the integral is the net P&L, losses already subtracted.` }] } }
    ] },
    { t: "The fundamental theorem", b: [
      { p: R`Adding up rectangles is slow. The fundamental theorem of calculus says you can skip it whenever you can find an <strong>antiderivative</strong>: a function $F$ with $F' = f$. Then` },
      { math: R`\int_a^b f(x)\,dx = F(b) - F(a).` },
      { p: R`Intuitively, $f$ is the rate of change of $F$, and adding up all the changes from $a$ to $b$ gives the net change $F(b)-F(a)$.` },
      { table: { head: ["f(x)", "Antiderivative F(x)"], rows: [[R`$x^n,\ n\neq-1$`, R`$\frac{x^{n+1}}{n+1}$`], [R`$1/x$`, R`$\ln|x|$`], [R`$e^{kx}$`, R`$\frac1k e^{kx}$`], [R`$a f + b g$`, R`$a F + b G$`]] } },
      { p: R`Example: the value of a continuous payment stream of €1 per year for $T$ years, discounted at a continuous rate $r$, is` },
      { math: R`\int_0^T e^{-rt}\,dt = \left[-\tfrac1r e^{-rt}\right]_0^T = \frac{1-e^{-rT}}{r}.` },
      { p: R`With $r=4\%$ and $T=10$ that is $8.24$: ten euros paid over ten years are worth €8.24 today. This is the continuous version of an annuity factor.` },
      { check: { q: R`$\int_0^2 3x^2\,dx$ equals`, o: ["4", "6", "8", "12"], a: 2, why: R`An antiderivative is $x^3$, so the answer is $2^3 - 0^3 = 8$.` } }
    ] },
    { t: "Two techniques worth knowing", b: [
      { h: "Substitution" },
      { p: R`The chain rule run backwards. If the integrand has the form $f(g(x))\,g'(x)$, set $u = g(x)$, $du = g'(x)\,dx$:` },
      { math: R`\int_0^1 2x\,e^{x^2}dx = \int_0^1 e^{u}\,du = e - 1.` },
      { h: "Integration by parts" },
      { p: R`The product rule run backwards: $\int u\,dv = uv - \int v\,du$. It handles integrals like $\int x e^{-x}dx$, which show up when computing expected values of exponential distributions:` },
      { math: R`\int_0^\infty x e^{-x}dx = \big[-xe^{-x}\big]_0^\infty + \int_0^\infty e^{-x}dx = 0 + 1 = 1.` },
      { p: R`Many integrals in finance have no closed-form antiderivative at all. The normal density is the famous example. That is where numerical methods take over.` }
    ] },
    { t: "Numerical integration", b: [
      { p: R`The two standard rules improve on rectangles by fitting better shapes to each slice.` },
      { list: [R`<strong>Trapezoid rule</strong>: join neighbouring points with straight lines. Error shrinks like $1/n^2$.`, R`<strong>Simpson's rule</strong>: fit a parabola through each pair of slices. Error shrinks like $1/n^4$, so doubling $n$ cuts the error by about 16.`] },
      { code: R`import numpy as np
from math import erf, sqrt

phi = lambda x: np.exp(-x**2 / 2) / np.sqrt(2 * np.pi)
exact = 0.5 * (erf(2 / sqrt(2)) - erf(-1 / sqrt(2)))

def trapezoid(f, a, b, n):
    x = np.linspace(a, b, n + 1)
    y = f(x)
    return (b - a) / n * (y[0] / 2 + y[1:-1].sum() + y[-1] / 2)

def simpson(f, a, b, n):          # n must be even
    x = np.linspace(a, b, n + 1)
    y = f(x)
    return (b - a) / (3 * n) * (y[0] + 4 * y[1:-1:2].sum() + 2 * y[2:-1:2].sum() + y[-1])

for n in [4, 8, 16, 32]:
    print(n, f"{trapezoid(phi, -1, 2, n) - exact:+.2e}", f"{simpson(phi, -1, 2, n) - exact:+.2e}")`, out: `4 -1.66e-02 +7.46e-04
8 -4.11e-03 +4.22e-05
16 -1.03e-03 +2.60e-06
32 -2.56e-04 +1.62e-07` },
      { p: R`In practice you call <code>scipy.integrate.quad</code>, which picks the slices adaptively. Knowing what it does lets you recognise when it will struggle: kinks such as an option payoff at the strike, and infinite ranges where the integrand decays slowly.` }
    ] },
    { t: "Expected value as an integral", b: [
      { p: R`If a random quantity $X$ has density $f(x)$, the probability it lands in $[a,b]$ is an area, and its average value is a weighted sum of all outcomes:` },
      { math: R`\mathbb P(a\le X\le b)=\int_a^b f(x)\,dx, \qquad \mathbb E[X]=\int_{-\infty}^{\infty} x\,f(x)\,dx.` },
      { p: R`The expected payoff of any contract is the same idea with the payoff in place of $x$. Suppose a stock will be uniformly distributed between 80 and 120 at expiry, so $f(S) = 1/40$ on that range. A call with strike 100 pays $\max(S-100,0)$, which is zero below 100:` },
      { math: R`\mathbb E[\text{payoff}] = \int_{100}^{120}(S-100)\frac{1}{40}\,dS = \frac{1}{40}\cdot\frac{20^2}{2} = 5.` },
      { plot: { x: [75, 125], y: [0, 26], h: 240,
        fns: [{ f: S => Math.max(S - 100, 0), label: "payoff" }],
        params: [{ id: "K", label: "strike K", min: 85, max: 118, step: 0.5, value: 100, fmt: v => v.toFixed(1) }],
        dyn: () => ({}),
        area: p => ({ from: p.K, to: 120, f: S => Math.max(S - p.K, 0) }),
        vlines: () => [{ x: 80 }, { x: 120 }],
        readout: p => `E[payoff] = (120 - K)² / 80 = ${((120 - p.K) ** 2 / 80).toFixed(3)}  (shaded area / 40)`,
        caption: "Call payoff against the final price. Dotted lines mark the range 80 to 120 where the price can land." } },
      { p: R`Move the strike and the expected payoff changes with the shaded area. Real option pricing replaces the uniform density with a lognormal one and discounts the result, but the integral is the same shape.` }
    ] }
  ],
  take: [R`Interpret an integral as accumulated change or signed area`, R`Approximate integrals with Riemann sums and see them converge`, R`Evaluate definite integrals with antiderivatives, substitution and integration by parts`, R`Price a continuous payment stream with a discounting integral`, R`Implement trapezoid and Simpson rules and compare their errors`, R`Write probabilities and expected payoffs as integrals of a density`],
  quiz: [
    { q: R`$\int_1^e \frac{1}{x}\,dx$ equals`, o: ["0", "1", "e", "e - 1"], a: 1, why: R`$\ln e - \ln 1 = 1 - 0 = 1$.` },
    { q: "Doubling the number of slices in Simpson's rule reduces the error by roughly a factor of", o: ["2", "4", "8", "16"], a: 3, why: R`Simpson's error scales like $1/n^4$, and $2^4 = 16$.` },
    { q: "A cash flow arrives at a constant rate of €500 per year for 2 years, discounted continuously at 5%. Its present value is closest to", o: ["€1 000", "€952", "€906", "€500"], a: 1, why: R`$500 \cdot \frac{1-e^{-0.1}}{0.05} = 500 \times 1.9033 \approx 951.6$.` },
    { q: "If the final price is uniform between 80 and 120, the expected payoff of a call struck at 110 is", o: ["1.25", "2.5", "5", "10"], a: 0, why: R`$(120-110)^2/80 = 100/80 = 1.25$.` }
  ]
},

/* ------------------------------------------------------------------ */
"applications-in-finance": {
  intro: [
    { p: R`This lesson puts the module to work on the most basic object in finance: how money grows. Compounding produces $e$, discounting produces exponentials, and log returns turn multiplication into addition. Nearly every model later in the curriculum is written in these terms.` }
  ],
  sections: [
    { t: "Compounding, from yearly to continuous", b: [
      { p: R`Invest $A_0$ at an annual rate $r$, paid $m$ times a year. Each period you earn $r/m$, and after $T$ years there have been $mT$ periods:` },
      { math: R`A(T) = A_0\left(1+\frac{r}{m}\right)^{mT}.` },
      { p: R`Let $m\to\infty$. Using the limit from lesson 1 (with $n = m/r$),` },
      { math: R`\lim_{m\to\infty}\left(1+\frac rm\right)^{mT} = e^{rT}, \qquad A(T) = A_0\,e^{rT}.` },
      { plot: { x: [0, 30], y: [0, 9], h: 280,
        fns: [{ f: t => Math.exp(0.07 * t), label: "continuous" }, { f: (t, p) => Math.pow(1 + 0.07 / p.m, p.m * t), faint: true, dash: true, label: "m per year", lx: 22 }, { f: t => 1 + 0.07 * t, faint: true, label: "simple interest" }],
        params: [{ id: "m", label: "compounding periods per year m", min: 1, max: 52, step: 1, value: 1, fmt: v => v.toFixed(0) }],
        readout: p => `€1 at 7% for 30 years:  simple ${(1 + 0.07 * 30).toFixed(3)}   m=${p.m}: ${Math.pow(1 + 0.07 / p.m, p.m * 30).toFixed(3)}   continuous ${Math.exp(2.1).toFixed(3)}`,
        xlabel: "years", ylabel: "value of €1",
        caption: "Growth of €1 at 7% a year. The dashed curve uses m compounding periods per year." } },
      { p: R`Over 30 years the frequency matters a little (7.61 annually against 8.17 continuously). The difference between simple and compound interest matters enormously. That is the arithmetic behind long-horizon saving.` }
    ] },
    { t: "Discounting and converting rates", b: [
      { p: R`Run compounding backwards and you get the present value of a future payment. With continuous compounding,` },
      { math: R`PV = X\,e^{-rT}.` },
      { p: R`Rates quoted with different conventions describe the same growth if they produce the same value after one year. A continuous rate $r_c$ and an annual rate $r_a$ match when $e^{r_c} = 1 + r_a$, so` },
      { math: R`r_c = \ln(1+r_a), \qquad r_a = e^{r_c}-1.` },
      { table: { head: ["Annual rate", "Continuous equivalent"], rows: [["1.00%", "0.995%"], ["5.00%", "4.879%"], ["10.00%", "9.531%"], ["50.00%", "40.547%"]], num: [0, 1] } },
      { p: R`At low rates the two are nearly identical. At high rates (crypto funding, emerging-market debt, credit cards) the convention changes the number a lot, so always check which one a quote uses.` },
      { check: { q: "What is €1 000 due in 4 years worth today at a continuous rate of 3%?", o: ["€880", "€887", "€970", "€1 127"], a: 1, why: R`$1000\,e^{-0.12} \approx 886.92$.` } }
    ] },
    { t: "Log returns", b: [
      { p: R`The simple return from price $P_0$ to $P_1$ is $R = P_1/P_0 - 1$. The <strong>log return</strong> is` },
      { math: R`r = \ln\frac{P_1}{P_0} = \ln P_1 - \ln P_0.` },
      { p: R`Log returns are the continuously compounded rate that would turn $P_0$ into $P_1$. Their big advantage is that they <strong>add over time</strong>. Simple returns compound by multiplication:` },
      { math: R`1+R_{0\to2} = (1+R_1)(1+R_2), \qquad r_{0\to 2} = r_1 + r_2.` },
      { table: { head: ["Day", "Price", "Simple return", "Log return"], rows: [["0", "100.00", "", ""], ["1", "104.00", "+4.000%", "+3.922%"], ["2", "98.80", "-5.000%", "-5.129%"], ["3", "101.27", "+2.500%", "+2.469%"], ["Total", "", "+1.270% (by multiplying)", "+1.262% (by adding)"]], num: [1, 2, 3] } },
      { p: R`Adding log returns gives $+1.262\%$, and $e^{0.01262}-1 = 1.270\%$ recovers the simple total. Sums are much easier to work with than products: averages, variances and the central limit theorem all apply to sums. That is why most statistical models of prices are written for log returns.` },
      { note: { kind: "warn", title: "Where log returns do not add", body: [{ p: R`They add across <em>time</em>, not across <em>assets</em>. A portfolio's simple return is the weighted average of its assets' simple returns; the same is not true for log returns. Use simple returns to aggregate a portfolio on one day, and log returns to aggregate one series over many days.` }] } }
    ] },
    { t: "Average return versus growth", b: [
      { p: R`A fund gains 50% one year and loses 50% the next. The average annual return is $0\%$. The money tells a different story: $100 \to 150 \to 75$, a 25% loss.` },
      { p: R`The log returns are $\ln 1.5 = +0.405$ and $\ln 0.5 = -0.693$, which sum to $-0.288$, and $e^{-0.288} = 0.75$. Log returns get the answer right automatically.` },
      { p: R`For small, random returns with mean $\mu$ and volatility $\sigma$, a second-order Taylor expansion of $\ln(1+R)$ gives` },
      { math: R`\mathbb E[\ln(1+R)] \approx \mu - \tfrac12\sigma^2.` },
      { p: R`The $-\frac12\sigma^2$ term is called <strong>volatility drag</strong>. It is the reason two funds with the same average return can end with very different wealth, and why the drift of a log price in the Black-Scholes model is $\mu - \frac12\sigma^2$ rather than $\mu$.` },
      { plot: { x: [0, 0.6], y: [-0.1, 0.12], h: 260,
        fns: [{ f: s => 0.08 - 0.5 * s * s, label: "growth rate μ − σ²/2" }, { f: () => 0.08, faint: true, dash: true, label: "average return μ = 8%" }],
        params: [{ id: "s", label: "volatility σ", min: 0, max: 0.6, step: 0.01, value: 0.3, fmt: v => (v * 100).toFixed(0) + "%" }],
        points: p => [{ x: p.s, y: 0.08 - 0.5 * p.s * p.s }],
        readout: p => `σ = ${(p.s * 100).toFixed(0)}%   drag = ${(50 * p.s * p.s).toFixed(2)}%   long-run growth ≈ ${((0.08 - 0.5 * p.s * p.s) * 100).toFixed(2)}% per year`,
        xlabel: "volatility", ylabel: "per year",
        caption: "With an 8% average return, volatility above 40% makes long-run growth negative." } }
    ] },
    { t: "Growth with a changing rate", b: [
      { p: R`If the rate of growth itself varies over time, $r(t)$, the value obeys $A'(t) = r(t)A(t)$. Divide by $A$ and notice that the left side is the derivative of $\ln A$:` },
      { math: R`\frac{d}{dt}\ln A(t) = r(t) \quad\Longrightarrow\quad A(T)=A_0\exp\!\left(\int_0^T r(t)\,dt\right).` },
      { p: R`The derivative and integral from this module combine into one formula: total log growth is the integral of the instantaneous rate. In fixed income, $r(t)$ is the instantaneous forward rate and the discount factor for maturity $T$ is $\exp\left(-\int_0^T f(t)\,dt\right)$. You will meet this again in the Rates & Credit module.` },
      { p: R`Example: if $r(t) = 0.02 + 0.01t$ for the next three years, then $\int_0^3 r\,dt = 0.06 + 0.045 = 0.105$, and €1 grows to $e^{0.105} \approx €1.111$.` }
    ] },
    { t: "Putting it in code", b: [
      { code: R`import numpy as np

prices = np.array([100.00, 104.00, 98.80, 101.27, 103.10, 102.40])

simple = prices[1:] / prices[:-1] - 1
logret = np.diff(np.log(prices))

print("total from simple :", np.prod(1 + simple) - 1)
print("total from logs   :", np.exp(logret.sum()) - 1)

# annualise daily log returns (252 trading days)
mu_d, sd_d = logret.mean(), logret.std(ddof=1)
print(f"annual log drift  : {mu_d * 252:.2%}")
print(f"annual volatility : {sd_d * np.sqrt(252):.2%}")

# converting rate conventions
r_annual = 0.05
r_cont = np.log1p(r_annual)
print(f"5% annual = {r_cont:.4%} continuous")`, out: `total from simple : 0.02400000000000002
total from logs   : 0.023999999999999355
annual log drift  : 119.53%
annual volatility : 56.31%
5% annual = 4.8790% continuous` },
      { p: R`Volatility scales with the square root of time because variances of independent log returns add. Five days of data give silly annualised numbers, which is a good reminder that annualising a short sample amplifies noise. The Statistical Computing module covers how much data you need before trusting such estimates.` }
    ] }
  ],
  take: [R`Derive $e^{rT}$ as the limit of discrete compounding`, R`Discount continuously and convert between annual and continuous rates`, R`Compute log returns and explain why they add over time but not across assets`, R`Explain volatility drag and the $\mu - \frac12\sigma^2$ growth rate`, R`Grow a value under a time-varying rate with $\exp\int r\,dt$`, R`Compute, compound and annualise returns in NumPy`],
  quiz: [
    { q: "A price goes from 50 to 55 and back to 50. The two log returns", o: ["sum to exactly zero", "sum to a small positive number", "sum to a small negative number", "cannot be added"], a: 0, why: R`$\ln(55/50) + \ln(50/55) = 0$. Log returns telescope: only the first and last price matter.` },
    { q: "The continuous rate equivalent to 10% annual compounding is", o: ["10.52%", "10.00%", "9.53%", "9.09%"], a: 2, why: R`$\ln(1.10) = 0.0953$.` },
    { q: "Two funds both average +10% a year. Fund A has 10% volatility, Fund B has 35%. Over 20 years you expect", o: ["the same final wealth", "A to end with more", "B to end with more", "it depends only on the order of returns"], a: 1, why: R`Growth ≈ $\mu - \sigma^2/2$: A grows at about 9.5% a year, B at about 3.9%.` },
    { q: "To compute today's return on a portfolio of three stocks, you should", o: ["average the three log returns with portfolio weights", "average the three simple returns with portfolio weights", "add the three log returns", "multiply the three simple returns"], a: 1, why: "Portfolio simple return is the weighted average of asset simple returns. Log returns do not aggregate across assets." }
  ]
}
},

/* ------------------------------------------------------------------ */
exam: [
  { q: R`$\lim_{x\to 0}\dfrac{x^2+3x}{x}$ equals`, o: ["0", "3", "It does not exist", "Infinity"], a: 1, why: R`Cancel $x$: $x + 3 \to 3$.`},
  { q: "A function is continuous at a point if", o: ["it is defined there", "its left and right limits exist", "its limit exists and equals its value there", "it has a derivative there"], a: 2, why: "All three conditions are needed: defined, limit exists, and they agree. (Differentiable implies continuous, not the other way round.)" },
  { q: "Which payoff has a jump at the strike?", o: ["A long call", "A long put", "A digital call", "A forward"], a: 2, why: "A digital pays a fixed amount above the strike and nothing below, so it jumps. Calls and puts have a kink, which is continuous." },
  { q: R`$\frac{d}{dx}\, x^2 e^{3x}$ is`, o: [R`$2x e^{3x}$`, R`$6x e^{3x}$`, R`$(2x + 3x^2)e^{3x}$`, R`$3x^2 e^{3x}$`], a: 2, why: R`Product rule: $2x\,e^{3x} + x^2\cdot 3e^{3x}$.` },
  { q: "The derivative of a zero-coupon bond price P = 100e^{-yT} with respect to y is", o: ["-T·P", "-y·P", "T·P", "-P/T"], a: 0, why: R`Chain rule on $e^{-yT}$ gives the factor $-T$.` },
  { q: "Bond convexity means that", o: ["prices rise when yields rise", "the duration estimate is exact", "the price curve lies above its tangent line", "the bond pays coupons"], a: 2, why: "Positive second derivative: the curve bends upward, so the tangent (duration) estimate understates the price." },
  { q: R`$f(x) = x^3 - 12x$ has a local minimum at`, o: ["x = -2", "x = 0", "x = 2", "x = 12"], a: 2, why: R`$f' = 3x^2 - 12 = 0$ at $x=\pm2$; $f''=6x$ is positive at $x=2$.` },
  { q: "The central difference estimate of f'(x) has error proportional to", o: ["h", "h²", "1/h", "h⁴"], a: 1, why: "The first-order error terms cancel in a central difference, leaving an error of order h²." },
  { q: R`$\int_0^{\ln 2} e^{x}\,dx$ equals`, o: ["1", "2", "ln 2", "e"], a: 0, why: R`$e^{\ln 2} - e^0 = 2 - 1 = 1$.` },
  { q: "Using more rectangles in a Riemann sum for a continuous function", o: ["always overestimates the area", "converges to the definite integral", "only works for positive functions", "changes the exact value"], a: 1, why: "That limit is the definition of the definite integral." },
  { q: "E[X] for a random variable with density f is", o: ["∫ f(x) dx", "∫ x f(x) dx", "∫ x² f(x) dx", "f(mean)"], a: 1, why: "Weight each outcome by its density and add up." },
  { q: "€1 compounded continuously at 6% for 10 years grows to about", o: ["€1.60", "€1.79", "€1.82", "€2.00"], a: 2, why: R`$e^{0.6} \approx 1.822$.` },
  { q: "Log returns are convenient for time series because they", o: ["are always positive", "add over time", "add across assets in a portfolio", "equal simple returns"], a: 1, why: R`$\ln(P_T/P_0)$ is the sum of the single-period log returns.` },
  { q: "A strategy with 12% average return and 40% volatility has long-run growth of roughly", o: ["12%", "8%", "4%", "-4%"], a: 2, why: R`$0.12 - \frac12(0.4)^2 = 0.12 - 0.08 = 0.04$, so about 4% a year.` }
]
};
}
