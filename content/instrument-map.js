/* Finance for Quants · Module 1 · The Instrument Map — original QFC text */
{
const R = String.raw;
const bp = (c, n, y) => { let s = 0; for (let t = 1; t <= n; t++) s += 100 * c / (1 + y) ** t; return s + 100 / (1 + y) ** n; };

QFC.content["instrument-map"] = {
lessons: {

/* ------------------------------------------------------------------ */
"what-you-own": {
  intro: [
    { p: R`When you "buy SAP" or "buy a Bund", you are not buying a thing. You are entering a contract: a set of promises about future cash flows, made by someone, under certain conditions. Every instrument in this module, from a share to a crypto perpetual, can be read the same way. Learn the reading once and new products stop being mysterious.` }
  ],
  sections: [
    { t: "Four questions for any instrument", b: [
      { p: R`Whatever lands on your screen, ask:` },
      { ol: [R`<strong>What cash flows am I owed, and when?</strong> Fixed coupons, uncertain dividends, a payoff that depends on a price, or nothing until expiry.`, R`<strong>Who owes them?</strong> A company, a government, a clearing house, or a single counterparty.`, R`<strong>What do I owe?</strong> Usually a price paid today. Sometimes margin, collateral or future payments too.`, R`<strong>What can make it worth less?</strong> The risks you carry while you hold it.`] },
      { p: R`The answers decide how the instrument is priced, how it behaves in a crisis, and how a quant would model it.` }
    ] },
    { t: "The map at a glance", b: [
      { table: { head: ["Instrument", "You are owed", "Counterparty", "Main risks"], rows: [
        ["Share", "a slice of future profits (dividends, buybacks) and a vote", "the company, last in line", "business, market, dilution"],
        ["Bond", "fixed coupons and the face value back", "issuer (state or company)", "interest rates, default, inflation"],
        ["ETF", "your share of a basket", "the fund, holding the assets", "the basket's risks, tracking error"],
        ["Future / forward", "the difference between today's agreed price and the later market price", "clearing house / one bank", "price moves, leverage, margin calls"],
        ["Option", "a payoff only if it is worth exercising", "clearing house / dealer", "price, volatility, time decay"],
        ["Swap", "one stream of payments in exchange for another", "dealer, usually cleared", "rates or FX, counterparty"],
        ["Crypto perpetual", "price difference, plus or minus funding payments", "the exchange", "price, funding, exchange failure"]] } },
      { p: R`Two big families emerge. <strong>Cash instruments</strong> (shares, bonds, ETFs) give you an asset. <strong>Derivatives</strong> (futures, options, swaps, perps) give you a contract whose value is <em>derived</em> from something else and that usually costs little or nothing to enter.` }
    ] },
    { t: "Long, short and the other side", b: [
      { p: R`Being <strong>long</strong> means you gain when the price rises. Being <strong>short</strong> means you gain when it falls. With derivatives, every long position is matched by a short one: they are zero-sum before costs. If you buy a future and make €1 000, someone who sold it lost €1 000.` },
      { p: R`That simple fact is worth keeping in mind. A derivative does not create risk out of nothing; it moves risk from one party to another. A farmer selling wheat futures passes price risk to a speculator who wants it. An airline buying oil futures passes it the other way. Whether that transfer is useful or dangerous depends on who ends up holding the risk.` },
      { note: { kind: "key", title: "Payoff diagrams", body: [{ p: R`Throughout this module we draw <strong>payoff diagrams</strong>: what a position is worth at a future date (vertical axis) as a function of the underlying price at that date (horizontal axis). Shares and futures give straight lines; options give bent ones. Being able to sketch these instantly is a basic desk skill.` }] } }
    ] },
    { t: "Seniority: who gets paid first", b: [
      { p: R`When a company fails, its assets are sold and paid out in a strict order. Roughly:` },
      { ol: ["Secured creditors, against the specific assets pledged to them", "Senior unsecured bonds and loans", "Subordinated (junior) bonds", "Preferred shares, where they exist", "Ordinary shareholders, with whatever is left, often nothing"] },
      { p: R`This ranking explains most of the difference in risk and return between a company's bonds and its shares. Bondholders accept a capped upside in exchange for being paid first. Shareholders accept being paid last in exchange for all the upside.` },
      { check: { q: "A company's bonds trade at 40% of face value while its share price has fallen 95%. What is the market telling you?", o: ["The bonds are mispriced", "Default is likely and shareholders expect almost nothing in a restructuring", "The shares are a bargain", "The company is about to pay a large dividend"], a: 1, why: "Bondholders expect to recover some value because they rank first; shareholders, last in line, expect to be wiped out." } }
    ] },
    { t: "Where a quant comes in", b: [
      { p: R`For each instrument the quant's job is the same three steps: write down the cash flows as a function of uncertain variables, put a probability model on those variables, and value the result while respecting the prices already visible in the market. The rest of the Finance program does exactly that, starting with simple instruments and ending with options and volatility.` }
    ] }
  ],
  take: ["Read any instrument through four questions: owed, by whom, what you owe, what can go wrong", "Separate cash instruments from derivatives", "Explain long, short and the zero-sum nature of derivatives", "Describe the order of payment when a company fails", "Know what a payoff diagram shows"],
  quiz: [
    { q: "Which of these is a derivative?", o: ["A share of Siemens", "A German government bond", "A DAX future", "A money-market deposit"], a: 2, why: "Its value comes from the DAX index; the others are direct claims." },
    { q: "Before costs, the total profit of all buyers and sellers of a given future is", o: ["positive", "zero", "negative", "equal to the margin"], a: 1, why: "Every gain on the long side is a loss on the short side." },
    { q: "In a bankruptcy, who is paid last?", o: ["Secured lenders", "Senior bondholders", "Junior bondholders", "Ordinary shareholders"], a: 3, why: "Shareholders own whatever remains after all creditors." },
    { q: "A payoff diagram shows", o: ["price history over time", "position value at a future date against the underlying price then", "trading volume", "volatility over time"], a: 1, why: "It maps the future underlying price to the position's value." }
  ]
},

/* ------------------------------------------------------------------ */
"stocks": {
  intro: [
    { p: R`A share is the simplest instrument to buy and the hardest to value. It promises nothing fixed: no coupon, no maturity, no guaranteed payment. You own a slice of a business and whatever that business earns after everyone else has been paid.` }
  ],
  sections: [
    { t: "What a share is", b: [
      { p: R`A share is a fractional ownership claim on a company. It usually gives three things: a claim on profits paid out to owners, a vote at the general meeting, and a claim on assets if the company is wound up (after all creditors). Multiply the share price by the number of shares outstanding and you get the company's <strong>market capitalisation</strong>, the price the market puts on the whole equity.` },
      { p: R`Shares trade on exchanges such as Xetra in Frankfurt. The company only receives money when it issues new shares (an IPO or a capital increase). Afterwards, trading is between investors; the price you pay goes to another investor, not to the company.` }
    ] },
    { t: "How owners get paid", b: [
      { p: R`Companies return cash to shareholders in two main ways.` },
      { list: [R`<strong>Dividends</strong>: a cash payment per share. German companies typically pay once a year after the general meeting. On the ex-dividend date the share price drops by roughly the dividend, because buyers from that day on no longer receive it.`, R`<strong>Buybacks</strong>: the company buys its own shares and cancels them. Each remaining share then owns a bigger slice. Economically similar to a dividend, but taxed and timed differently.`] },
      { p: R`The <strong>total return</strong> of a share is price change plus dividends received. Looking only at price changes understates the long-run return of most markets by a lot; for a broad index, dividends have historically been a substantial part of total returns.` }
    ] },
    { t: "What moves a share price", b: [
      { p: R`A share's value is the present value of all the cash it will ever return to owners. Two things drive that: expectations about future cash flows, and the rate used to discount them. A simple model that captures both is the <strong>Gordon growth model</strong>. If next year's dividend is $D_1$, dividends grow at a constant rate $g$ forever, and investors require a return $r > g$:` },
      { math: R`P_0 = \frac{D_1}{r-g}.` },
      { plot: { x: [0, 0.07], y: [0, 120], h: 280,
        fns: [{ f: (g, p) => g < p.r - 0.002 ? 2 / (p.r - g) : NaN, label: "price" }],
        params: [{ id: "r", label: "required return r", min: 0.06, max: 0.12, step: 0.0025, value: 0.08, fmt: v => (v * 100).toFixed(2) + "%" }, { id: "g", label: "expected growth g", min: 0, max: 0.05, step: 0.0025, value: 0.03, fmt: v => (v * 100).toFixed(2) + "%" }],
        points: p => p.g < p.r ? [{ x: p.g, y: 2 / (p.r - p.g), label: "P = " + (2 / (p.r - p.g)).toFixed(1) }] : [],
        readout: p => `D1 = 2.00   P = 2 / (${(p.r * 100).toFixed(2)}% − ${(p.g * 100).toFixed(2)}%) = ${(2 / (p.r - p.g)).toFixed(2)}`,
        xlabel: "growth g", ylabel: "price",
        caption: "Gordon growth model with next year's dividend of 2. The curve shows the price for every growth rate at the chosen required return." } },
      { p: R`With $D_1 = 2$, $r = 8\%$ and $g = 3\%$, the price is 40. Raise expected growth to 4% and it jumps to 50; raise the required return to 9% instead and it drops to 33.3. Small changes in the denominator cause large price moves. This is why growth stocks, whose value lies far in the future, react so strongly to interest rates.` },
      { note: { title: "Price is a forecast, not a fact", body: [{ p: R`On earnings day a share can fall even when profits rise, if they rose less than expected. Prices move on <em>changes in expectations</em>, which is why a good quarter can be bad news.` }] } }
    ] },
    { t: "Ratios you will hear", b: [
      { table: { head: ["Ratio", "Definition", "Reads as"], rows: [
        ["P/E", "price ÷ earnings per share", "years of current profit you pay for"],
        ["Dividend yield", "annual dividend ÷ price", "cash return at today's price"],
        ["P/B", "market cap ÷ book value of equity", "premium over accounting net worth"],
        ["EV/EBITDA", "(market cap + net debt) ÷ operating earnings", "price of the whole business, debt included"]] } },
      { p: R`From the Gordon model, the dividend yield equals $r - g$: a low yield means either a low required return or high expected growth. Ratios are only meaningful against peers or history, never on their own.` }
    ] },
    { t: "Corporate actions", b: [
      { p: R`Several events change the number of shares or the price without changing the value of a holding. Data that ignores them produces false returns.` },
      { list: [R`<strong>Split</strong>: a 2-for-1 split doubles the shares and halves the price. Your holding's value is unchanged.`, R`<strong>Capital increase</strong>: new shares are issued, often at a discount to existing holders via subscription rights. Existing holders who do not take part are diluted.`, R`<strong>Spin-off</strong>: a division becomes a separate listed company and shareholders receive its shares; the parent's price drops by the value spun off.`] },
      { p: R`This is why price data comes in "raw" and "adjusted" versions. The Financial Data Engineering module covers how adjustment works and where it goes wrong.` },
      { check: { q: "A share trades at 120 and does a 3-for-1 split. You held 10 shares. Afterwards you hold", o: ["10 shares at 40", "30 shares at 40", "30 shares at 120", "10 shares at 360"], a: 1, why: "Three times the shares at one third of the price: value stays 1 200." } }
    ] }
  ],
  take: ["Explain what a share entitles you to and what market capitalisation means", "Describe dividends, buybacks, ex-dividend dates and total return", "Value a share with the Gordon growth model and explain its sensitivity to r and g", "Read P/E, dividend yield, P/B and EV/EBITDA", "Recognise splits, capital increases and spin-offs in price data"],
  quiz: [
    { q: "On the ex-dividend date, all else equal, the share price", o: ["rises by the dividend", "falls by roughly the dividend", "does not change", "doubles"], a: 1, why: "New buyers no longer receive the dividend, so the share is worth that much less." },
    { q: "Gordon model: D1 = 3, r = 9%, g = 4%. The price is", o: ["33.3", "60", "75", "100"], a: 1, why: R`$3 / (0.09 - 0.04) = 60$.` },
    { q: "Why do growth stocks often fall sharply when interest rates rise?", o: ["They pay higher dividends", "Most of their value comes from distant cash flows, which are discounted more heavily", "They have more debt by definition", "Their P/E is always below 10"], a: 1, why: "A higher discount rate hits far-future cash flows hardest." },
    { q: "Your holding's value after a 2-for-1 split is", o: ["halved", "unchanged", "doubled", "reduced by the dividend"], a: 1, why: "Twice the shares at half the price." }
  ]
},

/* ------------------------------------------------------------------ */
"bonds": {
  intro: [
    { p: R`A bond is a loan cut into tradeable pieces. The issuer borrows money today and promises fixed payments later. Because the promises are fixed, the only thing that can change is how much those promises are worth today, and that is driven almost entirely by interest rates and the chance that the issuer will not pay.` }
  ],
  sections: [
    { t: "The anatomy of a bond", b: [
      { list: [R`<strong>Face value</strong> (nominal, par): the amount repaid at the end, usually quoted as 100.`, R`<strong>Coupon</strong>: the interest rate on the face value, paid annually for most euro bonds and semi-annually for US Treasuries.`, R`<strong>Maturity</strong>: the date of the final payment.`, R`<strong>Issuer</strong>: a government (Bunds, OATs, Treasuries), a supranational, a bank or a company.`] },
      { p: R`A 10-year bond with a 2.5% annual coupon pays 2.5 every year for ten years and 100 on top in the final year: eleven promises, all known in advance.` }
    ] },
    { t: "Price is the present value of the promises", b: [
      { p: R`Discount each payment at the bond's <strong>yield to maturity</strong> $y$ and add them up:` },
      { math: R`P = \sum_{t=1}^{T}\frac{c}{(1+y)^t} + \frac{100}{(1+y)^T}.` },
      { p: R`The yield is the single interest rate that makes this sum equal to the market price. It is the bond's internal rate of return if you hold it to maturity and every payment arrives.` },
      { plot: { x: [0, 0.08], y: [40, 160], h: 300,
        fns: [{ f: (y, p) => bp(0.025, p.n, y), label: "price" }],
        params: [{ id: "n", label: "maturity (years)", min: 1, max: 30, step: 1, value: 10, fmt: v => v + "y" }, { id: "y", label: "yield", min: 0, max: 0.08, step: 0.0005, value: 0.035, fmt: v => (v * 100).toFixed(2) + "%" }],
        points: p => [{ x: p.y, y: bp(0.025, p.n, p.y), label: bp(0.025, p.n, p.y).toFixed(2) }, { x: 0.025, y: 100, open: true }],
        readout: p => `2.5% coupon, ${p.n}y, yield ${(p.y * 100).toFixed(2)}% → price ${bp(0.025, p.n, p.y).toFixed(3)}   (change vs par: ${(bp(0.025, p.n, p.y) - 100).toFixed(2)})`,
        xlabel: "yield", ylabel: "price",
        caption: "Price of a 2.5% annual-coupon bond. The open circle marks par: price 100 when the yield equals the coupon." } },
      { p: R`Three rules can be read straight off the chart:` },
      { ol: [R`When the yield equals the coupon, the bond trades at par (100).`, R`When yields rise, prices fall, and vice versa. A 10-year 2.5% bond drops from 100 to 91.68 if its yield moves to 3.5%.`, R`Longer bonds move more. The same one-point rise takes a 2-year bond only to 98.10 but a 30-year bond to 81.61.`] },
      { p: R`The sensitivity in the third rule is <strong>duration</strong>, which you met as a derivative in the Calculus module. The curve also bends upward: that is <strong>convexity</strong>.` }
    ] },
    { t: "Why rates move prices", b: [
      { p: R`Suppose you bought the 2.5% bond at 100 and new bonds now pay 3.5%. Nobody will pay you 100 for a 2.5% stream when 3.5% is available, so your bond must fall until its yield is competitive. The price adjusts so that old and new bonds offer the same return. That is all the price–yield seesaw is.` },
      { note: { title: "2022 in one sentence", body: [{ p: R`When euro-area yields rose by several percentage points in 2022, long-dated government bonds, usually considered the safest assets, lost a large part of their market value. Safe from default is not safe from rates.` }] } }
    ] },
    { t: "Credit risk and spreads", b: [
      { p: R`A government that borrows in its own currency can almost always pay. A company might not. Investors demand extra yield for that risk, the <strong>credit spread</strong>:` },
      { math: R`y_{\text{corporate}} = y_{\text{government}} + \text{spread}.` },
      { p: R`Rating agencies sort issuers from AAA down. Bonds rated BBB− or higher are <strong>investment grade</strong>; below that they are <strong>high yield</strong>. Spreads widen in recessions and crises, often sharply, which is why corporate bonds and shares tend to fall together when things go wrong.` },
      { check: { q: "A Bund yields 2.4% and a BBB corporate bond of the same maturity yields 3.9%. The credit spread is", o: ["1.5% (150 bp)", "2.4%", "3.9%", "6.3%"], a: 0, why: "3.9% − 2.4% = 1.5 percentage points, i.e. 150 basis points." } }
    ] },
    { t: "Practical details", b: [
      { list: [R`<strong>Clean and dirty price</strong>: quotes exclude interest accrued since the last coupon (clean). The buyer actually pays clean price plus accrued interest (dirty).`, R`<strong>Zero-coupon bonds</strong> pay nothing until maturity and trade below 100; their whole return is the pull to par.`, R`<strong>Inflation-linked bonds</strong> scale coupons and principal with a price index, protecting real value.`, R`<strong>Floating-rate notes</strong> pay a coupon that resets with a reference rate such as EURIBOR, so their price barely moves with rates.`] }
    ] }
  ],
  take: ["Name a bond's face value, coupon, maturity and issuer", "Price a bond as the present value of its cash flows and define yield to maturity", "Explain why prices fall when yields rise and why long bonds move more", "Define credit spread, investment grade and high yield", "Distinguish clean and dirty prices, zeros, linkers and floaters"],
  quiz: [
    { q: "A bond's coupon is 3% and its yield is 4%. It trades", o: ["above par", "at par", "below par", "at zero"], a: 2, why: "Its coupon is less attractive than the market rate, so the price must be below 100." },
    { q: "Which bond loses the most if all yields rise by 1 percentage point?", o: ["2-year, 5% coupon", "10-year, 5% coupon", "30-year, 2% coupon", "a floating-rate note"], a: 2, why: "Long maturity and low coupon push duration up; floaters barely react." },
    { q: "Credit spreads typically", o: ["narrow in recessions", "widen in recessions", "are always zero for companies", "are fixed at issue"], a: 1, why: "Default risk and risk aversion both rise in bad times." },
    { q: "The price a bond buyer actually pays is", o: ["the clean price", "the clean price plus accrued interest", "the face value", "the yield times 100"], a: 1, why: "That is the dirty (full) price." }
  ]
},

/* ------------------------------------------------------------------ */
"indices-and-etfs": {
  intro: [
    { p: R`"The market was up 1% today" always refers to some index: a rule for combining many prices into one number. How the rule weights its members decides what the number means. ETFs then turn an index into something you can buy in one trade.` }
  ],
  sections: [
    { t: "Three ways to weight a basket", b: [
      { p: R`Take three companies:` },
      { table: { head: ["Stock", "Price", "Shares (m)", "Market cap (bn)"], rows: [["A", "50", "100", "5.0"], ["B", "200", "10", "2.0"], ["C", "10", "1 000", "10.0"]], num: [1, 2, 3] } },
      { table: { head: ["Method", "Weight A", "Weight B", "Weight C", "Examples"], rows: [
        ["Price-weighted", "19.2%", "76.9%", "3.8%", "Dow Jones Industrial Average, Nikkei 225"],
        ["Cap-weighted", "29.4%", "11.8%", "58.8%", "DAX, S&P 500, MSCI World (all free-float adjusted)"],
        ["Equal-weighted", "33.3%", "33.3%", "33.3%", "equal-weight variants of major indices"]], num: [1, 2, 3] } },
      { p: R`Now stock B rises 10% and the others are unchanged. The price-weighted index rises 7.7%, the cap-weighted index 1.2%, the equal-weighted 3.3%. Same day, same stocks, three different "market returns".` },
      { p: R`Price weighting is a historical accident: a high share price says nothing about a company's size. Cap weighting reflects how much money is actually invested in each company, which is why almost all benchmarks use it. It also means the largest companies dominate: a handful of tech stocks make up a large share of US indices.` },
      { note: { title: "Free float", body: [{ p: R`Major indices count only <strong>free-float</strong> shares, those available for trading. Shares held by founders, governments or strategic owners are excluded, so a company with a large locked-up stake gets a smaller weight than its full market cap would suggest.` }] } }
    ] },
    { t: "Price index or performance index", b: [
      { p: R`A <strong>price index</strong> ignores dividends; its value drops on ex-dividend dates. A <strong>performance</strong> or total-return index assumes dividends are reinvested. The DAX is a performance index, unlike most foreign headline indices such as the S&P 500 or the EURO STOXX 50, which are quoted as price indices. Comparing a performance index with a price index over 20 years flatters the first by the full dividend yield each year.` }
    ] },
    { t: "Keeping an index continuous", b: [
      { p: R`When members change, are split or issue shares, the index must not jump. Providers divide by an <strong>index divisor</strong> and adjust it at every such event so that the index value just before and just after is identical. Membership itself is reviewed on a published schedule, and additions and deletions are announced in advance. Index funds must then trade at the effective date, a predictable flow that some traders try to anticipate.` }
    ] },
    { t: "How an ETF tracks its index", b: [
      { p: R`An exchange-traded fund holds a portfolio designed to match an index, and its shares trade on an exchange like a stock. Two price-keeping mechanisms make it work.` },
      { ol: [R`<strong>Creation and redemption.</strong> Large dealers called authorised participants can deliver the underlying basket to the fund in exchange for new ETF shares, or hand ETF shares back for the basket.`, R`<strong>Arbitrage.</strong> If the ETF trades above the value of its holdings, a dealer buys the basket, creates ETF shares and sells them, pocketing the gap. If it trades below, they do the reverse. This keeps the market price close to the net asset value (NAV).`] },
      { p: R`<strong>Physical</strong> ETFs hold the actual stocks (in full or a representative sample). <strong>Synthetic</strong> ETFs hold other assets plus a swap with a bank that pays the index return, which adds counterparty risk but can track hard-to-hold markets more cheaply.` }
    ] },
    { t: "What tracking costs", b: [
      { list: [R`<strong>TER</strong>, the total expense ratio, is taken from fund assets every year. Broad index ETFs are cheap; specialised ones charge more.`, R`<strong>Tracking difference</strong> is the fund's actual return minus the index return over a period. It includes the TER but also trading costs, cash drag, securities lending income and taxes on dividends.`, R`<strong>Spread</strong>: you buy at the ask and sell at the bid. For large ETFs during market hours it is tiny; in illiquid products, or when the underlying market is closed, it can be large.`] },
      { check: { q: "An ETF trades at 101.20 while the value of its holdings is 100.00. What brings the price back?", o: ["The fund lowers its TER", "Authorised participants create shares and sell them", "The index provider changes the divisor", "Nothing; the gap is permanent"], a: 1, why: "Selling newly created shares at 101.20 against a basket worth 100 is profitable until the gap closes." } }
    ] }
  ],
  take: ["Compute price-, cap- and equal-weighted index returns and explain the difference", "Explain free float and the index divisor", "Distinguish a price index from a performance index", "Describe ETF creation, redemption and arbitrage", "Separate TER, tracking difference and spread"],
  quiz: [
    { q: "In a price-weighted index, which stock has the most influence?", o: ["The one with the largest market cap", "The one with the highest share price", "The one with the most shares", "All the same"], a: 1, why: "Weights are proportional to share prices." },
    { q: "The DAX is", o: ["a price index", "a performance (total-return) index", "price-weighted", "equal-weighted"], a: 1, why: "Dividends are assumed reinvested." },
    { q: "Synthetic ETFs carry an additional risk compared with physical ones:", o: ["dividend risk", "counterparty risk on the swap", "no exposure to the index", "unlimited losses"], a: 1, why: "The index return comes from a swap with a bank." },
    { q: "Tracking difference over a year includes", o: ["only the TER", "the TER plus trading costs, cash drag and other effects", "only the bid-ask spread", "the index divisor change"], a: 1, why: "It is the full gap between fund and index returns." }
  ]
},

/* ------------------------------------------------------------------ */
"futures-and-forwards": {
  intro: [
    { p: R`A forward is the oldest derivative: two parties agree today on a price for a trade that happens later. Futures are the exchange-traded, standardised version. Both let you take a position in an asset without paying for it upfront, which makes them the main tool for hedging and the main source of leverage.` }
  ],
  sections: [
    { t: "Agreeing on a price today", b: [
      { p: R`A brewery knows it will need 1 000 tonnes of barley in six months. It agrees with a farmer to buy at €250 a tonne on that date. No money changes hands now. In six months the barley is delivered and paid at €250, whatever the market price is then.` },
      { p: R`At delivery, the buyer's gain is the market price minus the agreed price $F$; the seller's gain is the opposite:` },
      { math: R`\text{long payoff} = S_T - F, \qquad \text{short payoff} = F - S_T.` },
      { plot: { x: [180, 320], y: [-80, 80], h: 260,
        fns: [{ f: (S, p) => S - p.F, label: "long" }, { f: (S, p) => p.F - S, faint: true, dash: true, label: "short", lx: 200 }],
        params: [{ id: "F", label: "agreed price F", min: 200, max: 300, step: 1, value: 250, fmt: v => "€" + v }],
        points: p => [{ x: p.F, y: 0, label: "break-even at F" }],
        xlabel: "price at delivery", ylabel: "gain per tonne",
        caption: "Forward payoffs are straight lines through zero at the agreed price. Long and short mirror each other." } },
      { p: R`The brewery no longer cares about the barley price: if it rises to 300, it loses on the market but gains 50 on the forward. That is a <strong>hedge</strong>. The farmer is hedged too. Both have swapped uncertainty for certainty.` }
    ] },
    { t: "Forward versus future", b: [
      { table: { head: ["", "Forward", "Future"], rows: [
        ["Where", "private (OTC) between two parties", "on an exchange, e.g. Eurex"],
        ["Terms", "anything the parties agree", "standardised size, dates, underlying"],
        ["Counterparty", "the other party", "the central clearing house"],
        ["Cash flows", "at maturity only", "daily, through margin"],
        ["Exit", "negotiate with the other party", "close with an opposite trade at any time"]] } },
      { p: R`The clearing house stands between buyer and seller, so neither has to trust the other. To protect itself, it collects <strong>margin</strong>.` }
    ] },
    { t: "Margin and daily settlement", b: [
      { p: R`When you open a futures position you post <strong>initial margin</strong>, a deposit sized to cover a bad day or two. Every evening the exchange sets a settlement price and moves the day's gain or loss in cash between the long and short sides. This is <strong>variation margin</strong>, or marking to market.` },
      { p: R`Example: the DAX future (FDAX) is worth €25 per index point. You buy one contract at 19 000.` },
      { table: { head: ["Day", "Settlement", "Change (points)", "Cash flow", "Cumulative"], rows: [["Open", "19 000", "", "", ""], ["1", "19 120", "+120", "+€3 000", "+€3 000"], ["2", "18 950", "−170", "−€4 250", "−€1 250"], ["3", "19 050", "+100", "+€2 500", "+€1 250"]], num: [1, 2, 3, 4] } },
      { p: R`The total, €1 250, is exactly $(19\,050 - 19\,000) \times 25$, as with a forward. The difference is timing: losses must be paid every day. If your account falls below the maintenance level you get a <strong>margin call</strong>. If you cannot pay, the position is closed. Plenty of correct long-term views have been closed out by short-term margin calls.` },
      { note: { kind: "warn", title: "Leverage", body: [{ p: R`One FDAX contract controls about €475 000 of index exposure for a margin of a fraction of that. A 4% index move changes the position by about €19 000. Futures are cheap to enter, not cheap to hold.` }] } },
      { check: { q: "You are short one FDAX at 19 000. It settles at 18 800. Your variation margin that day is", o: ["−€5 000", "+€5 000", "+€200", "−€200"], a: 1, why: R`Short gains when the price falls: $200 \times 25 = 5\,000$.` } }
    ] },
    { t: "Settlement and the roll", b: [
      { p: R`At expiry a future is settled either <strong>physically</strong> (the asset is delivered, as with Bund futures) or in <strong>cash</strong> (the difference is paid, as with index futures). Most traders never reach expiry: they close or <strong>roll</strong> into the next contract month a few days before.` },
      { p: R`The gap between the futures price and the spot price is the <strong>basis</strong>. It shrinks to zero at expiry, because on the last day a future to buy now is the same as buying now. What determines the basis before that, and why it is not a forecast, is the topic of the Pricing by No-Arbitrage module.` }
    ] }
  ],
  take: ["Write and draw the payoff of a long and short forward", "Explain how a forward hedges price risk for both sides", "Compare forwards and futures: venue, counterparty, cash flows", "Compute daily variation margin and explain margin calls and leverage", "Describe physical versus cash settlement, rolling and the basis"],
  quiz: [
    { q: "You are long a forward at F = 80. At maturity the price is 72. Your payoff is", o: ["+8", "−8", "0", "−72"], a: 1, why: R`$S_T - F = 72 - 80 = -8$.` },
    { q: "Who is the counterparty to every futures trade?", o: ["The exchange's market makers", "The central clearing house", "The person you traded with", "The issuer of the underlying"], a: 1, why: "The clearing house becomes buyer to every seller and seller to every buyer." },
    { q: "Why can a futures trader be forced out of a position that later turns out to be right?", o: ["Futures expire every day", "Daily losses must be paid in cash; failing to meet a margin call closes the position", "The exchange forbids long-term positions", "The basis is always negative"], a: 1, why: "Marking to market creates cash needs before the final outcome is known." },
    { q: "At expiry, the basis (futures minus spot)", o: ["equals the interest rate", "converges to zero", "doubles", "is undefined"], a: 1, why: "On the last day the future and spot are the same trade." }
  ]
},

/* ------------------------------------------------------------------ */
"options": {
  intro: [
    { p: R`A future obliges you to trade. An option gives you the right to trade, but no obligation. You only use it when it helps you. That asymmetry has a price, the premium, and it creates the bent payoffs that make options both useful for protection and dangerous to sell carelessly.` }
  ],
  sections: [
    { t: "Calls and puts", b: [
      { list: [R`A <strong>call</strong> gives the right to <em>buy</em> the underlying at the <strong>strike</strong> $K$ on or before expiry.`, R`A <strong>put</strong> gives the right to <em>sell</em> it at $K$.`] },
      { p: R`You exercise only if it pays, so at expiry the payoffs are` },
      { math: R`\text{call} = \max(S_T - K,\,0), \qquad \text{put} = \max(K - S_T,\,0).` },
      { p: R`The buyer (long) pays the premium upfront. The seller (short, or writer) receives it and takes on the obligation. <strong>European</strong> options can be exercised only at expiry; <strong>American</strong> options at any time before. Most single-stock options on Eurex are American; index options such as DAX options are European.` }
    ] },
    { t: "Payoff and profit", b: [
      { p: R`Profit at expiry is payoff minus the premium paid. Change the type, the side and the strike below.` },
      { plot: { x: [60, 140], y: [-30, 40], h: 300,
        fns: [{ f: (S, p) => { const pay = p.t ? Math.max(p.K - S, 0) : Math.max(S - p.K, 0); return (p.s ? -1 : 1) * (pay - p.c); }, label: "profit" },
              { f: (S, p) => { const pay = p.t ? Math.max(p.K - S, 0) : Math.max(S - p.K, 0); return (p.s ? -1 : 1) * pay; }, faint: true, dash: true, label: "payoff", lx: 70 }],
        params: [{ id: "t", label: "type", min: 0, max: 1, step: 1, value: 0, fmt: v => v ? "put" : "call" }, { id: "s", label: "side", min: 0, max: 1, step: 1, value: 0, fmt: v => v ? "short" : "long" }, { id: "K", label: "strike K", min: 80, max: 120, step: 1, value: 100, fmt: v => v.toFixed(0) }, { id: "c", label: "premium", min: 1, max: 12, step: 0.5, value: 5, fmt: v => v.toFixed(1) }],
        points: p => { const be = p.t ? p.K - p.c : p.K + p.c; return [{ x: be, y: 0, label: "break-even " + be.toFixed(1) }]; },
        readout: p => { const L = p.s ? "short" : "long", T = p.t ? "put" : "call"; const maxG = p.s ? p.c : (p.t ? p.K - p.c : Infinity), maxL = p.s ? (p.t ? p.K - p.c : Infinity) : p.c; return `${L} ${T}: max gain ${maxG === Infinity ? "unlimited" : maxG.toFixed(1)}   max loss ${maxL === Infinity ? "unlimited" : maxL.toFixed(1)}`; },
        xlabel: "price at expiry", ylabel: "per share",
        caption: "Solid: profit after premium. Dashed: payoff before premium." } },
      { table: { head: ["Position", "View", "Max gain", "Max loss"], rows: [["Long call", "up", "unlimited", "premium"], ["Long put", "down", "strike − premium", "premium"], ["Short call", "not up", "premium", "unlimited"], ["Short put", "not down", "premium", "strike − premium"]] } },
      { p: R`The buyer's loss is capped at the premium. The seller's gain is capped at the premium and the loss can be large. That is why selling options requires margin and why strategies that "collect premium" look excellent until the one month they do not.` }
    ] },
    { t: "Intrinsic value and time value", b: [
      { p: R`Before expiry, an option's price splits into two parts. <strong>Intrinsic value</strong> is what it would pay if exercised now: $\max(S-K,0)$ for a call. <strong>Time value</strong> is everything above that, the value of the chance that things get better before expiry.` },
      { p: R`Options are described by <strong>moneyness</strong>: a call with $S > K$ is in the money, $S \approx K$ at the money, $S < K$ out of the money. At-the-money options have the most time value. Time value shrinks as expiry approaches and is zero on the last day. This decay is called <strong>theta</strong>.` },
      { p: R`Time value is larger when the underlying is more volatile, because a bigger spread of outcomes raises the chance of a large payoff while the loss is capped. That link between option prices and volatility is the core of options trading and the subject of the Pricing by No-Arbitrage module.` },
      { check: { q: "A call with strike 100 trades at 7 while the stock is at 104. Its time value is", o: ["3", "4", "7", "11"], a: 0, why: "Intrinsic value is 4, so time value is 7 − 4 = 3." } }
    ] },
    { t: "Why people use options", b: [
      { list: [R`<strong>Protection</strong>: holding a share and buying a put (a protective put) sets a floor under the loss, like insurance.`, R`<strong>Income</strong>: selling a call against a share you own (a covered call) earns the premium but gives up gains above the strike.`, R`<strong>Leverage</strong>: a call costs a fraction of the share and can multiply percentage returns in both directions.`, R`<strong>Volatility views</strong>: combinations such as straddles pay off on large moves in either direction.`] },
      { p: R`Option contracts usually cover 100 shares (for many Eurex equity options) or a multiple of the index. Always check the contract size before reading a price.` }
    ] }
  ],
  take: ["Define calls and puts, strike, premium, expiry, European and American", "Draw payoff and profit diagrams for long and short calls and puts", "State the maximum gain and loss of each basic position", "Split an option price into intrinsic and time value and explain theta", "Describe protective puts, covered calls and the leverage of options"],
  quiz: [
    { q: "A long put with strike 50 bought for 3. At expiry the stock is at 44. Profit per share:", o: ["−3", "3", "6", "9"], a: 1, why: R`Payoff $50 - 44 = 6$, minus premium 3, gives 3.` },
    { q: "Which position has unlimited potential loss?", o: ["Long call", "Long put", "Short call", "Short put"], a: 2, why: "If the stock rises without limit, the call seller must deliver at the strike." },
    { q: "Break-even at expiry for a long call with strike 120 and premium 6 is", o: ["114", "120", "126", "132"], a: 2, why: "The stock must rise above strike plus premium." },
    { q: "All else equal, higher volatility makes a call option", o: ["cheaper", "more expensive", "unchanged", "worthless"], a: 1, why: "More chance of a large payoff while the downside stays capped." }
  ]
},

/* ------------------------------------------------------------------ */
"swaps-fx-perps": {
  intro: [
    { p: R`The last group of instruments trades streams of cash flows rather than single payoffs. Interest rate swaps are the largest derivatives market in the world by notional. FX is the largest market of any kind by daily volume. Crypto perpetuals are a recent invention that borrowed ideas from both.` }
  ],
  sections: [
    { t: "Interest rate swaps", b: [
      { p: R`In a plain-vanilla interest rate swap, one party pays a <strong>fixed</strong> rate and the other pays a <strong>floating</strong> rate (in euros, typically 6-month EURIBOR or the overnight rate €STR), both on the same <strong>notional</strong>. The notional itself is never exchanged; only the net difference of the interest payments is.` },
      { p: R`Example: a company has a €10 million loan paying EURIBOR plus a margin and fears rising rates. It enters a 5-year swap paying 2.6% fixed and receiving EURIBOR.` },
      { table: { head: ["EURIBOR fixing", "Company pays fixed", "Company receives floating", "Net swap flow (per year)"], rows: [["2.0%", "€260 000", "€200 000", "−€60 000"], ["2.6%", "€260 000", "€260 000", "€0"], ["3.5%", "€260 000", "€350 000", "+€90 000"]], num: [1, 2, 3] } },
      { p: R`Whatever EURIBOR does, the loan's floating interest and the swap's floating leg cancel, leaving the company with a fixed cost of 2.6% plus its margin. The swap rate quoted in the market is the fixed rate that makes the swap worth zero today.` },
      { p: R`Swaps move in value like bonds: paying fixed gains when rates rise, receiving fixed gains when they fall. Banks, insurers and pension funds use them to manage the rate sensitivity of their whole balance sheet.` }
    ] },
    { t: "Foreign exchange", b: [
      { p: R`An FX quote such as EUR/USD 1.0800 means one euro costs 1.08 US dollars. The first currency is the <strong>base</strong>, the second the <strong>quote</strong> currency. If EUR/USD rises, the euro has strengthened.` },
      { list: [R`<strong>Spot</strong> trades settle two business days later.`, R`<strong>Forwards</strong> fix an exchange rate for a later date. They are used by exporters to lock in the value of foreign revenue.`, R`<strong>FX swaps</strong> combine a spot and an opposite forward trade and are the main way banks fund themselves in other currencies.`] },
      { p: R`The forward rate is not a forecast. It is set by the interest rates of the two currencies, because you could instead borrow one currency, convert it and deposit the other. With continuous compounding,` },
      { math: R`F = S\,e^{(r_{\text{quote}} - r_{\text{base}})T}.` },
      { p: R`If EUR/USD spot is 1.0800 with, for example, a 4% dollar rate and a 2% euro rate, the one-year forward is $1.08\,e^{0.02} \approx 1.1018$. The currency with the higher interest rate trades at a discount in the forward market, exactly offsetting its higher interest. This is <strong>covered interest parity</strong>, and you will derive it properly in the Pricing by No-Arbitrage module.` },
      { check: { q: "EUR/USD moves from 1.0800 to 1.1000. A German exporter with dollar revenue", o: ["benefits", "is hurt", "is unaffected", "pays less tax"], a: 1, why: "Each dollar now buys fewer euros." } }
    ] },
    { t: "Crypto perpetual futures", b: [
      { p: R`A normal future has an expiry, and its price converges to spot on that date. A <strong>perpetual future</strong> ("perp") never expires. Something else must keep its price near the spot price, and that something is the <strong>funding rate</strong>.` },
      { p: R`At regular intervals, commonly every eight hours, longs and shorts pay each other:` },
      { list: [R`If the perp trades <em>above</em> spot, longs pay shorts. Holding a long becomes expensive, which encourages selling and pushes the perp down.`, R`If it trades <em>below</em> spot, shorts pay longs.`] },
      { p: R`Funding is the perp's version of the basis. When markets are euphoric, funding can run at very high annualised rates, and a popular trade is to buy spot and short the perp to collect it. The main risks are not in the formula: exchange failure, auto-deleveraging during crashes, and very high leverage that leads to cascades of forced liquidations.` }
    ] },
    { t: "The map, completed", b: [
      { table: { head: ["Instrument", "Payoff shape", "Upfront cost", "Key driver"], rows: [["Share", "linear", "full price", "company cash flows"], ["Bond", "fixed, then default risk", "full price", "rates, credit"], ["ETF", "linear in the basket", "full price", "the index"], ["Future / forward", "linear", "margin only", "underlying price"], ["Option", "kinked", "premium", "price and volatility"], ["Swap", "linear in rates or FX", "nothing (zero value at start)", "rate or FX moves"], ["Perp", "linear plus funding", "margin only", "price and funding"]] } },
      { p: R`You now know what each instrument pays and who stands on the other side. The next modules show how they actually trade (Market Microstructure) and how their prices are tied together by arbitrage (Pricing by No-Arbitrage).` }
    ] }
  ],
  take: ["Explain the legs, notional and net payments of a fixed-for-floating swap", "Use a swap to turn a floating-rate loan into a fixed cost", "Read FX quotes and explain spot, forwards and FX swaps", "Compute an FX forward from spot and two interest rates", "Explain how funding keeps a perpetual future near spot, and the main risks of perps"],
  quiz: [
    { q: "In a vanilla interest rate swap, the notional is", o: ["exchanged at the start", "exchanged at maturity", "never exchanged", "paid as margin"], a: 2, why: "It only serves to compute the interest payments." },
    { q: "A party paying fixed in a swap gains when", o: ["rates fall", "rates rise", "the notional rises", "the swap matures"], a: 1, why: "It receives the floating leg, which rises with rates." },
    { q: "EUR/USD = 1.10 means", o: ["1 USD costs 1.10 EUR", "1 EUR costs 1.10 USD", "the euro rate is 1.10%", "the forward is 1.10"], a: 1, why: "Base currency first: one euro in dollars." },
    { q: "When a perpetual future trades above spot, funding is paid by", o: ["shorts to longs", "longs to shorts", "the exchange", "nobody"], a: 1, why: "Making longs pay pushes the perp back toward spot." }
  ]
}
},

/* ------------------------------------------------------------------ */
exam: [
  { q: "Which instrument usually costs nothing to enter at inception?", o: ["A share", "A bond", "An interest rate swap", "An ETF"], a: 2, why: "A swap is struck at a rate that gives it zero value at the start." },
  { q: "Shareholders rank, in a liquidation,", o: ["first", "after secured creditors but before bondholders", "after all creditors", "equal with bondholders"], a: 2, why: "Equity is the residual claim." },
  { q: "Gordon model: a share pays D1 = 1.5, r = 7%, g = 2%. Price:", o: ["21.4", "30", "50", "75"], a: 1, why: R`$1.5/0.05 = 30$.` },
  { q: "A bond trading above par must have", o: ["a yield above its coupon", "a yield below its coupon", "no coupon", "a negative coupon"], a: 1, why: "Paying more than 100 lowers your return below the coupon rate." },
  { q: "Which bond is most sensitive to a parallel rise in yields?", o: ["1-year zero", "5-year 4% coupon", "30-year zero", "floating-rate note"], a: 2, why: "Longest duration: all its value sits 30 years out." },
  { q: "On a day stock B (the highest-priced member) rises, which index weighting shows the largest gain if B is a small company?", o: ["Price-weighted", "Cap-weighted", "Free-float cap-weighted", "They all show the same"], a: 0, why: "Price weighting gives the high-priced stock the most weight regardless of size." },
  { q: "What keeps an ETF's market price close to its NAV?", o: ["The TER", "Creation and redemption by authorised participants", "The index divisor", "Central bank intervention"], a: 1, why: "Arbitrage via creation and redemption closes gaps." },
  { q: "You buy 2 FDAX contracts (€25/point) at 19 200; settlement is 19 080. Variation margin:", o: ["−€3 000", "−€6 000", "+€6 000", "−€240"], a: 1, why: R`$-120 \times 25 \times 2 = -6\,000$.` },
  { q: "A futures price minus the spot price is called the", o: ["spread", "basis", "margin", "premium"], a: 1, why: "It converges to zero at expiry." },
  { q: "A short put with strike 80 sold for 4. Maximum loss per share:", o: ["4", "76", "80", "unlimited"], a: 1, why: "If the stock goes to 0: pay 80, keep 4." },
  { q: "An option's time value is zero", o: ["when it is at the money", "at expiry", "when volatility is high", "for American options"], a: 1, why: "At expiry only intrinsic value remains." },
  { q: "With higher dollar than euro interest rates, the EUR/USD forward is", o: ["below spot", "above spot", "equal to spot", "undefined"], a: 1, why: R`$F = S e^{(r_{USD} - r_{EUR})T} > S$ when the dollar rate is higher.` },
  { q: "The funding rate of a perpetual future exists to", o: ["pay the exchange's fees", "keep the perp price close to spot", "replace margin", "set the expiry date"], a: 1, why: "It rewards the side that pushes the perp back toward spot." }
]
};
}
