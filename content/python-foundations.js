/* Code for Quants · Module 1 · Python Foundations — original QFC text */
{
const R = String.raw;
QFC.content["python-foundations"] = {
lessons: {

/* ------------------------------------------------------------------ */
"variables-and-data-types": {
  intro: [
    { p: R`Every quant program, however large, is built from a few simple things: values, names for those values, and rules for what you can do with them. This short lesson covers those basics so the rest of the program can move fast.` }
  ],
  sections: [
    { t: "Names and values", b: [
      { p: R`A <strong>variable</strong> is a name attached to a value. You create one with <code>=</code>:` },
      { code: R`price = 101.25
shares = 40
ticker = "SAP"

position_value = price * shares
print(position_value)`, out: R`4050.0` },
      { p: R`Read <code>=</code> as "now refers to", not "is equal to". Writing <code>shares = shares + 10</code> is perfectly fine: take the current value, add 10, and point the name at the result. Names are case-sensitive, cannot start with a digit, and by convention use <code>lower_snake_case</code>.` },
      { note: { kind: "key", title: "Pick names a colleague can read", body: [{ p: R`<code>pv</code>, <code>x2</code> and <code>tmp</code> save three seconds today and cost an hour during a code review. <code>present_value</code> and <code>daily_returns</code> explain themselves.` }] } }
    ] },
    { t: "The four basic types", b: [
      { p: R`Every value has a <strong>type</strong>, which decides what operations make sense. You can always ask for it with <code>type()</code>.` },
      { table: { head: ["Type", "Example", "Used for"], rows: [
        ["<code>int</code>", "<code>40</code>, <code>-3</code>, <code>1_000_000</code>", "counts: shares, days, contracts"],
        ["<code>float</code>", "<code>101.25</code>, <code>0.035</code>, <code>1e-4</code>", "prices, rates, returns"],
        ["<code>str</code>", "<code>\"SAP\"</code>, <code>'EUR'</code>", "tickers, currencies, labels"],
        ["<code>bool</code>", "<code>True</code>, <code>False</code>", "conditions: is the market open? is the limit breached?"]] } },
      { code: R`print(type(40), type(101.25), type("SAP"), type(True))
print(7 / 2, 7 // 2, 7 % 2, 2 ** 10)`, out: R`<class 'int'> <class 'float'> <class 'str'> <class 'bool'>
3.5 3 1 1024` },
      { p: R`Note that <code>/</code> always returns a float, <code>//</code> is integer division, <code>%</code> is the remainder and <code>**</code> is a power. Underscores in numbers like <code>1_000_000</code> are ignored by Python and only help humans read them.` }
    ] },
    { t: "Why the type matters", b: [
      { p: R`The same symbol does different things for different types. <code>+</code> adds numbers but glues strings together. Mixing them is an error, not a guess:` },
      { code: R`print(2 + 3)
print("2" + "3")
print(int("2") + int("3"))
print(float("0.035") * 100)`, out: R`5
23
5
3.5000000000000004` },
      { p: R`Data read from a file or a web API usually arrives as text. Converting it with <code>int()</code>, <code>float()</code> or <code>str()</code> is the first step of almost every data job.` },
      { h: "Floats are approximations" },
      { p: R`Computers store floats in binary, and most decimal fractions cannot be represented exactly:` },
      { code: R`print(0.1 + 0.2)
print(0.1 + 0.2 == 0.3)
print(abs((0.1 + 0.2) - 0.3) < 1e-12)
print(round(0.1 + 0.2, 10))`, out: R`0.30000000000000004
False
True
0.3` },
      { p: R`For research code this is harmless as long as you never test floats for exact equality; compare with a tolerance instead. For accounting, where cents must add up exactly, use integers of cents or Python's <code>decimal</code> module.` },
      { check: { q: R`What does <code>10 // 4 + 10 % 4</code> evaluate to?`, o: ["2.5", "4", "5", "6"], a: 1, why: R`<code>10 // 4</code> is 2 and <code>10 % 4</code> is 2, so the sum is 4.` } }
    ] },
    { t: "Printing results clearly", b: [
      { p: R`<strong>f-strings</strong> put values inside text and control their format. Put an <code>f</code> before the quotes and expressions in braces:` },
      { code: R`ticker = "SAP"
price = 101.2534
ret = 0.012345

print(f"{ticker} last {price:.2f}, return {ret:.2%}")
print(f"{1234567.891:,.2f}")
print(f"{'Ticker':<8}|{'Price':>10}")
print(f"{ticker:<8}|{price:>10.2f}")`, out: R`SAP last 101.25, return 1.23%
1,234,567.89
Ticker  |     Price
SAP     |    101.25` },
      { p: R`<code>.2f</code> means two decimals, <code>.2%</code> multiplies by 100 and adds a percent sign, <code>,</code> adds thousands separators, and <code>&lt;</code> / <code>&gt;</code> align text in a fixed width. That is enough to print a tidy table in a terminal.` }
    ] }
  ],
  take: ["Create and update variables with clear names", "Recognise int, float, str and bool and check a type with type()", "Convert text to numbers and back", "Explain why 0.1 + 0.2 is not exactly 0.3 and compare floats safely", "Format numbers, percentages and aligned columns with f-strings"],
  quiz: [
    { q: R`What is the type of <code>7 / 7</code>?`, o: ["int", "float", "bool", "str"], a: 1, why: R`True division always returns a float: <code>1.0</code>.` },
    { q: R`<code>"5" * 3</code> evaluates to`, o: ["15", "'555'", "an error", "'5 5 5'"], a: 1, why: "Multiplying a string by an integer repeats it." },
    { q: "Which is the safest way to check whether two computed floats a and b are equal?", o: ["a == b", "abs(a - b) < 1e-9", "int(a) == int(b)", "str(a) == str(b)"], a: 1, why: "Compare within a small tolerance, because tiny rounding differences are normal." },
    { q: R`What does <code>f"{0.0456:.1%}"</code> print?`, o: ["0.0%", "4.6%", "0.05%", "45.6%"], a: 1, why: R`The % format multiplies by 100: 4.56, rounded to one decimal gives 4.6%.` }
  ]
},

/* ------------------------------------------------------------------ */
"control-flow": {
  intro: [
    { p: R`Programs become useful when they make decisions and repeat work. A risk check that blocks an order, a loop over a thousand stocks, a simulation that runs until a target is hit: these are all control flow.` }
  ],
  sections: [
    { t: "Comparisons and booleans", b: [
      { p: R`Comparisons produce <code>True</code> or <code>False</code>: <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&lt;=</code>, <code>&gt;</code>, <code>&gt;=</code>. Combine them with <code>and</code>, <code>or</code> and <code>not</code>.` },
      { code: R`price = 98.4
stop = 95.0
limit = 105.0

print(price > stop and price < limit)
print(stop < price < limit)        # chained comparison, same thing
print(not price > limit)`, out: R`True
True
True` },
      { p: R`Python evaluates <code>and</code> / <code>or</code> lazily: in <code>a and b</code>, if <code>a</code> is false, <code>b</code> is never evaluated. That lets you write <code>n &gt; 0 and total / n &gt; 1</code> without risking a division by zero.` }
    ] },
    { t: "if, elif, else", b: [
      { p: R`An <code>if</code> statement runs a block only when its condition is true. Indentation, four spaces by convention, marks which lines belong to the block.` },
      { code: R`order_value = 260_000
limit_per_order = 250_000
trader_level = "senior"

if order_value <= limit_per_order:
    decision = "send"
elif trader_level == "senior" and order_value <= 2 * limit_per_order:
    decision = "send, flag for review"
else:
    decision = "block"

print(decision)`, out: R`send, flag for review` },
      { p: R`Python checks the conditions from top to bottom and runs the first block whose condition is true, then skips the rest. Order matters: put the most specific case first.` },
      { check: { q: R`With <code>x = 7</code>, what does this set <code>y</code> to?<br><code>if x &gt; 5: y = "a"</code> · <code>elif x &gt; 3: y = "b"</code> · <code>else: y = "c"</code>`, o: ["'a'", "'b'", "'a' and then 'b'", "'c'"], a: 0, why: "The first true condition wins; the elif is never checked." } }
    ] },
    { t: "for loops", b: [
      { p: R`A <code>for</code> loop runs its block once for every item in a sequence. Here we compute daily returns from a list of closing prices:` },
      { code: R`closes = [100.0, 101.5, 100.8, 102.3, 103.0]

for i in range(1, len(closes)):
    r = closes[i] / closes[i - 1] - 1
    print(f"day {i}: {r:+.2%}")`, out: R`day 1: +1.50%
day 2: -0.69%
day 3: +1.49%
day 4: +0.68%` },
      { p: R`<code>range(1, n)</code> produces 1, 2, …, n−1. Two helpers make loops cleaner. <code>enumerate</code> gives you the index and the item together, and <code>zip</code> walks two sequences side by side:` },
      { code: R`tickers = ["SAP", "SIE", "ALV"]
weights = [0.5, 0.3, 0.2]

for i, (t, w) in enumerate(zip(tickers, weights), start=1):
    print(i, t, f"{w:.0%}")`, out: R`1 SAP 50%
2 SIE 30%
3 ALV 20%` }
    ] },
    { t: "while loops, break and continue", b: [
      { p: R`A <code>while</code> loop repeats as long as its condition holds. It fits problems where you do not know the number of steps in advance. How many years does it take to double money at 7%?` },
      { code: R`balance = 1.0
years = 0
while balance < 2.0:
    balance *= 1.07
    years += 1
print(years, round(balance, 4))`, out: R`11 2.1049` },
      { p: R`The answer, 11 years, matches the "rule of 72": 72 / 7 ≈ 10.3. Always make sure the condition eventually becomes false, or the loop runs forever.` },
      { p: R`<code>break</code> leaves a loop immediately; <code>continue</code> skips to the next iteration. A typical use is scanning a price path for the first stop-loss hit while skipping missing data:` },
      { code: R`path = [100, 99, None, 97, 94, 96]
stop = 95

for day, p in enumerate(path):
    if p is None:
        continue          # missing quote: skip the day
    if p <= stop:
        print(f"stopped out on day {day} at {p}")
        break
else:
    print("never stopped out")`, out: R`stopped out on day 4 at 94` },
      { p: R`The <code>else</code> after a <code>for</code> loop is unusual but handy: it runs only if the loop finished without hitting <code>break</code>.` }
    ] }
  ],
  take: ["Write conditions with comparison and logical operators", "Branch with if / elif / else and order the cases correctly", "Loop over sequences with for, range, enumerate and zip", "Use while for open-ended repetition and avoid infinite loops", "Control loops with break, continue and for-else"],
  quiz: [
    { q: R`How many times does <code>for i in range(2, 10, 3): ...</code> run?`, o: ["2", "3", "4", "8"], a: 1, why: R`It produces 2, 5, 8.` },
    { q: R`What does <code>3 &lt; 5 &lt; 4</code> evaluate to?`, o: ["True", "False", "an error", "4"], a: 1, why: R`Chained: <code>3 &lt; 5 and 5 &lt; 4</code>, and the second part is false.` },
    { q: "Which loop is the natural choice to simulate until a portfolio first falls 20% below its peak?", o: ["for over range(252)", "while with the drawdown condition", "a list comprehension", "an if statement"], a: 1, why: "You don't know in advance how many steps it takes, so loop while the condition is not yet met (with a safety cap)." },
    { q: R`Inside a loop, <code>continue</code>`, o: ["ends the loop", "skips the rest of this iteration", "restarts the loop from the beginning", "pauses the program"], a: 1, why: "It jumps straight to the next item." }
  ]
},

/* ------------------------------------------------------------------ */
"functions": {
  intro: [
    { p: R`Once you have written the same three lines twice, it is time for a function. Functions give a name to a piece of logic, take inputs, return an output, and can be tested on their own. Most quant libraries are just well-organised collections of functions.` }
  ],
  sections: [
    { t: "Defining and calling", b: [
      { code: R`def simple_return(p0, p1):
    """Return from price p0 to price p1 as a decimal."""
    return p1 / p0 - 1

r = simple_return(100, 104)
print(r)
print(round(simple_return(104, 98.8), 4))`, out: R`0.040000000000000036
-0.05` },
      { p: R`The trailing <code>…036</code> in the first result is the float rounding from lesson 1, which is why the second call wraps the result in <code>round</code> before printing.` },
      { p: R`<code>def</code> starts the definition, the names in brackets are <strong>parameters</strong>, and <code>return</code> sends a value back to the caller. The triple-quoted string right below the first line is a <strong>docstring</strong>: it documents the function and shows up in <code>help(simple_return)</code>.` },
      { p: R`A function without a <code>return</code> statement returns <code>None</code>. Printing inside a function is not the same as returning: printed values are gone, returned values can be used in further calculations.` }
    ] },
    { t: "Parameters: positional, keyword, default", b: [
      { p: R`Parameters can have default values, and callers can pass arguments by name. Both make calls easier to read.` },
      { code: R`def future_value(pv, rate, years, periods_per_year=1):
    m = periods_per_year
    return pv * (1 + rate / m) ** (m * years)

print(round(future_value(1000, 0.05, 10), 2))
print(round(future_value(1000, 0.05, 10, periods_per_year=12), 2))
print(round(future_value(pv=1000, years=10, rate=0.05), 2))`, out: R`1628.89
1647.01
1628.89` },
      { note: { kind: "warn", title: "Never use a mutable default", body: [
        { p: R`<code>def add(x, items=[])</code> creates the list once, when the function is defined, and reuses it on every call. Items pile up between calls. Use <code>items=None</code> and create the list inside the function.` }] } }
    ] },
    { t: "Returning several values", b: [
      { p: R`A function can return several values at once as a tuple, and the caller can unpack them:` },
      { code: R`def mean_and_vol(returns):
    n = len(returns)
    mean = sum(returns) / n
    var = sum((r - mean) ** 2 for r in returns) / (n - 1)
    return mean, var ** 0.5

daily = [0.004, -0.012, 0.007, 0.010, -0.003]
mu, sigma = mean_and_vol(daily)
print(f"mean {mu:.4%}  vol {sigma:.4%}")
print(f"annualised vol {sigma * 252 ** 0.5:.2%}")`, out: R`mean 0.1200%  vol 0.8815%
annualised vol 13.99%` },
      { p: R`Note the <code>n - 1</code> in the variance. Dividing by $n-1$ instead of $n$ gives the unbiased sample variance, the convention in statistics libraries. You will see why in the Statistical Computing module.` }
    ] },
    { t: "Scope", b: [
      { p: R`Variables created inside a function are <strong>local</strong>: they exist only while the function runs and are invisible outside it. A function can read variables from the surrounding module, but it should get what it needs through its parameters.` },
      { code: R`fee_rate = 0.001          # module-level

def net_proceeds(qty, price):
    gross = qty * price    # local
    return gross * (1 - fee_rate)

print(net_proceeds(100, 50.0))
# print(gross)  -> NameError: gross only exists inside the function`, out: R`4995.0` },
      { p: R`Functions that depend only on their inputs and change nothing outside themselves are called <strong>pure</strong>. They are easy to test and easy to trust, which matters when the output is a trading decision. Prefer them whenever you can.` }
    ] },
    { t: "Small functions, composed", b: [
      { p: R`Good code is built from small functions that each do one thing. Here three small ones combine into a break-even calculator for a trading strategy:` },
      { code: R`def expected_pnl(hit_rate, avg_win, avg_loss):
    return hit_rate * avg_win - (1 - hit_rate) * avg_loss

def break_even_hit_rate(avg_win, avg_loss):
    return avg_loss / (avg_win + avg_loss)

def describe(hit_rate, avg_win, avg_loss, cost=0.0):
    edge = expected_pnl(hit_rate, avg_win, avg_loss) - cost
    need = break_even_hit_rate(avg_win - cost, avg_loss + cost)
    verdict = "trade" if edge > 0 else "do not trade"
    return f"edge {edge:+.3f} per trade, need {need:.1%} hits -> {verdict}"

print(describe(0.52, 1.0, 1.0))
print(describe(0.52, 1.0, 1.0, cost=0.05))
print(describe(0.40, 2.0, 1.0, cost=0.05))`, out: R`edge +0.040 per trade, need 50.0% hits -> trade
edge -0.010 per trade, need 52.5% hits -> do not trade
edge +0.150 per trade, need 35.0% hits -> trade` },
      { p: R`The line <code>"trade" if edge &gt; 0 else "do not trade"</code> is a <strong>conditional expression</strong>, a compact one-line if/else that produces a value.` },
      { p: R`For very short throwaway functions, Python has <code>lambda</code>: <code>sq = lambda x: x * x</code>. Use it for small arguments to other functions, such as sort keys, and use <code>def</code> for anything with a name worth remembering.` }
    ] }
  ],
  take: ["Define functions with parameters, docstrings and return values", "Use default and keyword arguments, and avoid mutable defaults", "Return and unpack several values", "Explain local scope and why pure functions are easier to trust", "Compose small functions into a larger calculation"],
  quiz: [
    { q: R`What does a function return if it has no <code>return</code> statement?`, o: ["0", "None", "an empty string", "the last computed value"], a: 1, why: R`Python returns <code>None</code> by default.` },
    { q: R`Given <code>def f(a, b=2): return a * b</code>, what is <code>f(3)</code>?`, o: ["3", "5", "6", "an error"], a: 2, why: R`b takes its default value 2, so 3 × 2 = 6.` },
    { q: "Why is a mutable default argument like items=[] dangerous?", o: ["It is a syntax error", "The same list is shared between calls", "Lists cannot be parameters", "It slows the function down"], a: 1, why: "The default is created once at definition time, so changes persist between calls." },
    { q: "A pure function", o: ["never takes arguments", "only uses integers", "depends only on its inputs and has no side effects", "cannot call other functions"], a: 2, why: "Same inputs, same output, nothing else changed: easy to test and reason about." }
  ]
},

/* ------------------------------------------------------------------ */
"data-structures": {
  intro: [
    { p: R`Real data comes in collections: a price history, a portfolio of holdings, a set of tickers to exclude. Python's four built-in containers cover almost every case until you reach NumPy and pandas, and those are built on the same ideas.` }
  ],
  sections: [
    { t: "Lists: ordered and changeable", b: [
      { code: R`closes = [100.0, 101.5, 100.8, 102.3, 103.0]

print(closes[0], closes[-1])   # first, last
print(closes[1:4])             # slice: positions 1, 2, 3
print(closes[-3:])             # last three
closes.append(104.1)
print(len(closes), max(closes), min(closes))`, out: R`100.0 103.0
[101.5, 100.8, 102.3]
[100.8, 102.3, 103.0]
6 104.1 100.0` },
      { p: R`Indexing starts at 0, and negative indexes count from the end. A slice <code>a[i:j]</code> includes position <code>i</code> but stops before <code>j</code>, so <code>a[:k]</code> and <code>a[k:]</code> split a list cleanly in two.` },
      { note: { kind: "warn", title: "Names point to the same list", body: [
        { p: R`<code>b = a</code> does not copy a list; both names now refer to one object, so <code>b.append(1)</code> changes <code>a</code> too. Use <code>b = a.copy()</code> or <code>b = a[:]</code> when you need an independent copy. This bug has broken many backtests.` }] } }
    ] },
    { t: "Tuples: fixed records", b: [
      { p: R`A tuple is like a list that cannot be changed after creation. Use tuples for small fixed records, such as a trade, and lists for collections that grow.` },
      { code: R`trade = ("SAP", "BUY", 40, 101.25)
ticker, side, qty, price = trade
print(f"{side} {qty} {ticker} @ {price}")`, out: R`BUY 40 SAP @ 101.25` },
      { p: R`Because they cannot change, tuples can be used as dictionary keys, for example <code>(ticker, date)</code>.` }
    ] },
    { t: "Dictionaries: look things up by key", b: [
      { p: R`A dictionary maps keys to values. It is the natural structure for a portfolio: ticker to number of shares.` },
      { code: R`holdings = {"SAP": 40, "SIE": 25, "ALV": 10}
prices = {"SAP": 101.25, "SIE": 172.40, "ALV": 236.10}

holdings["BAS"] = 60              # add a position
holdings["SAP"] += 10             # change one

value = {t: q * prices.get(t, 0.0) for t, q in holdings.items()}
total = sum(value.values())

for t, v in sorted(value.items(), key=lambda kv: -kv[1]):
    print(f"{t:<4} {v:>10,.2f}  {v / total:6.1%}")
print("missing prices:", [t for t in holdings if t not in prices])`, out: R`SAP    5,062.50   43.1%
SIE    4,310.00   36.7%
ALV    2,361.00   20.1%
BAS        0.00    0.0%
missing prices: ['BAS']` },
      { p: R`Three idioms to remember: <code>d.get(key, default)</code> avoids an error for missing keys; <code>d.items()</code> loops over key–value pairs; and <code>key in d</code> checks membership. Lookups in a dictionary are fast no matter how large it is.` },
      { p: R`The output also reveals a data problem: BAS has no price, so it silently counts as zero. Catching that kind of silent gap is the subject of the Financial Data Engineering module.` }
    ] },
    { t: "Sets: unique members", b: [
      { p: R`A set holds each item at most once and supports set algebra. It is ideal for questions about membership.` },
      { code: R`index = {"SAP", "SIE", "ALV", "BAS", "DTE", "MBG"}
held = {"SAP", "SIE", "ALV", "BAS", "TSLA"}
banned = {"MBG"}

print(sorted(held - index))          # held but not in the index
print(sorted(index - held - banned)) # candidates to add
print(len(index & held))             # overlap`, out: R`['TSLA']
['DTE']
4` }
    ] },
    { t: "Comprehensions", b: [
      { p: R`A <strong>comprehension</strong> builds a new collection from an old one in a single readable line. It replaces the pattern "make an empty list, loop, append".` },
      { code: R`closes = [100.0, 101.5, 100.8, 102.3, 103.0, 101.9]

rets = [closes[i] / closes[i - 1] - 1 for i in range(1, len(closes))]
up_days = [r for r in rets if r > 0]
squared = {i: round(r * r, 6) for i, r in enumerate(rets)}

print([f"{r:+.2%}" for r in rets])
print(f"{len(up_days)} of {len(rets)} days up")
print(squared)`, out: R`['+1.50%', '-0.69%', '+1.49%', '+0.68%', '-1.07%']
3 of 5 days up
{0: 0.000225, 1: 4.8e-05, 2: 0.000221, 3: 4.7e-05, 4: 0.000114}` },
      { p: R`Comprehensions exist for lists <code>[...]</code>, sets <code>{...}</code> and dictionaries <code>{k: v ...}</code>. If one grows past a line or needs nested conditions, a plain loop is clearer.` },
      { check: { q: R`What is <code>[x * 2 for x in range(5) if x % 2 == 1]</code>?`, o: ["[0, 2, 4, 6, 8]", "[2, 6]", "[1, 3]", "[2, 6, 10]"], a: 1, why: R`The odd numbers below 5 are 1 and 3; doubled they give [2, 6].` } }
    ] },
    { t: "Choosing the right container", b: [
      { table: { head: ["Need", "Use", "Example"], rows: [
        ["Ordered sequence that changes", "list", "a price history you append to"],
        ["Small fixed record", "tuple", "(ticker, side, qty, price)"],
        ["Lookup by a key", "dict", "ticker → shares"],
        ["Unique members, fast 'is x in it?'", "set", "the tickers in an index"]] } },
      { p: R`Containers nest freely: a dictionary of lists (ticker → price history) or a list of dictionaries (one record per trade) are both common. When the nesting gets deep and every row has the same fields, it is time for a pandas DataFrame, which is where the Quant Stack module starts.` }
    ] }
  ],
  take: ["Index, slice and modify lists, and copy them safely", "Use tuples for fixed records and unpack them", "Build and query dictionaries with get, items and in", "Use set operations for membership questions", "Write list, set and dict comprehensions", "Pick the right container for a task"],
  quiz: [
    { q: R`For <code>a = [10, 20, 30, 40, 50]</code>, what is <code>a[1:-1]</code>?`, o: ["[10, 20, 30, 40]", "[20, 30, 40]", "[20, 30, 40, 50]", "[20]"], a: 1, why: "Start at position 1, stop before the last element." },
    { q: R`After <code>b = a</code> and <code>b.append(5)</code>, the list <code>a</code>`, o: ["is unchanged", "also ends with 5", "raises an error", "becomes a tuple"], a: 1, why: "Both names refer to the same list object." },
    { q: "Which structure gives the fastest answer to 'is this ticker in the index?' for 5 000 tickers?", o: ["list", "tuple", "set", "string"], a: 2, why: "Set membership is a hash lookup and does not scan every element." },
    { q: R`<code>d.get("XYZ", 0)</code> on a dict without the key "XYZ"`, o: ["raises KeyError", "returns 0", "returns None", "adds XYZ to the dict"], a: 1, why: "get returns the default when the key is missing and does not modify the dict." }
  ]
},

/* ------------------------------------------------------------------ */
"python-for-quant-problems": {
  intro: [
    { p: R`Time to combine everything from this module. Each section below solves a small but real quant question in plain Python, without any libraries beyond the standard one. Later modules will do the same things faster with NumPy and pandas, but writing them by hand once is the best way to understand what those libraries do.` }
  ],
  sections: [
    { t: "Cumulative returns and drawdowns", b: [
      { p: R`The <strong>drawdown</strong> on a given day is how far the portfolio is below its highest value so far. The <strong>maximum drawdown</strong> is the worst of those, and it is one of the first numbers anyone asks about a strategy.` },
      { code: R`def equity_curve(returns, start=100.0):
    curve = [start]
    for r in returns:
        curve.append(curve[-1] * (1 + r))
    return curve

def max_drawdown(curve):
    peak, worst = curve[0], 0.0
    for v in curve:
        peak = max(peak, v)
        worst = min(worst, v / peak - 1)
    return worst

rets = [0.02, 0.01, -0.03, -0.04, 0.015, -0.02, 0.05, 0.03, -0.01]
curve = equity_curve(rets)
print([round(v, 2) for v in curve])
print(f"total return {curve[-1] / curve[0] - 1:+.2%}")
print(f"max drawdown {max_drawdown(curve):.2%}")`, out: R`[100.0, 102.0, 103.02, 99.93, 95.93, 97.37, 95.42, 100.19, 103.2, 102.17]
total return +2.17%
max drawdown -7.37%` },
      { plot: { x: [0, 9], y: [-0.1, 0.12], h: 240,
        fns: [{ f: x => { const r = [0.02, 0.01, -0.03, -0.04, 0.015, -0.02, 0.05, 0.03, -0.01]; let v = 1, pk = 1, k = Math.floor(x); for (let i = 0; i < k; i++) { v *= 1 + r[i]; pk = Math.max(pk, v); } const nv = k < 9 ? v * (1 + r[k] * (x - k)) : v; return nv - 1; }, label: "cumulative return" },
              { f: x => { const r = [0.02, 0.01, -0.03, -0.04, 0.015, -0.02, 0.05, 0.03, -0.01]; let v = 1, pk = 1; const k = Math.round(x); for (let i = 0; i < k; i++) { v *= 1 + r[i]; pk = Math.max(pk, v); } return v / pk - 1; }, faint: true, label: "drawdown" }],
        xlabel: "day", caption: "Cumulative return (white) and drawdown from the running peak (grey) for the example above." } }
    ] },
    { t: "A moving-average signal", b: [
      { p: R`A simple trend rule: be long when the short moving average is above the long one, flat otherwise. Writing it by hand shows exactly which prices each signal is allowed to use.` },
      { code: R`def moving_average(xs, n):
    return [None if i + 1 < n else sum(xs[i + 1 - n:i + 1]) / n for i in range(len(xs))]

prices = [100, 101, 103, 102, 104, 107, 106, 108, 105, 103, 101, 102]
fast, slow = moving_average(prices, 3), moving_average(prices, 5)

position = []
for f, s in zip(fast, slow):
    position.append(None if s is None else (1 if f > s else 0))

pnl = 0.0
for t in range(1, len(prices)):
    held = position[t - 1]          # decided yesterday, earns today's move
    if held:
        pnl += prices[t] - prices[t - 1]
print(position)
print("P&L in price points:", pnl)`, out: R`[None, None, None, None, 1, 1, 1, 1, 1, 0, 0, 0]
P&L in price points: -1.0` },
      { note: { title: "The one-day lag is the point", body: [{ p: R`The position used for day $t$ is the one decided at the close of day $t-1$. Using today's signal to earn today's return is <strong>look-ahead bias</strong>: the backtest trades on information it could not have had. It is the most common way backtests lie, and it is easiest to see in a hand-written loop like this one.` }] } }
    ] },
    { t: "Simulating outcomes", b: [
      { p: R`The <code>random</code> module lets you simulate a strategy many times to see the spread of outcomes, not just the average. Here a strategy wins 1 unit 53% of the time and loses 1 unit otherwise, and we run 250 trades a thousand times.` },
      { code: R`import random

def simulate(n_trades, p_win, rng):
    pnl = 0
    for _ in range(n_trades):
        pnl += 1 if rng.random() < p_win else -1
    return pnl

rng = random.Random(42)          # seeded: same results every run
results = sorted(simulate(250, 0.53, rng) for _ in range(1000))

mean = sum(results) / len(results)
losing = sum(r < 0 for r in results) / len(results)
print(f"mean P&L {mean:.1f}   expected {250 * (0.53 - 0.47):.1f}")
print(f"5th / 50th / 95th percentile: {results[49]}, {results[499]}, {results[949]}")
print(f"share of losing years: {losing:.1%}")`, out: R`mean P&L 14.5   expected 15.0
5th / 50th / 95th percentile: -14, 14, 40
share of losing years: 16.0%` },
      { p: R`A genuine 6% edge per trade still loses money in a noticeable share of years. Seeding the generator with <code>random.Random(42)</code> makes the experiment reproducible, which you should always do in research code.` }
    ] },
    { t: "Bond pricing from cash flows", b: [
      { p: R`A bond is a list of cash flows. Its price is the sum of their discounted values, and its yield is the rate that makes that sum equal the market price. We find the yield by bisection: keep halving an interval that brackets the answer.` },
      { code: R`def bond_price(face, coupon_rate, years, y):
    c = face * coupon_rate
    flows = [c] * (years - 1) + [c + face]
    return sum(cf / (1 + y) ** t for t, cf in enumerate(flows, start=1))

def bond_yield(price, face, coupon_rate, years, lo=-0.05, hi=0.5, tol=1e-10):
    while hi - lo > tol:
        mid = (lo + hi) / 2
        if bond_price(face, coupon_rate, years, mid) > price:
            lo = mid          # price too high -> yield must be higher
        else:
            hi = mid
    return (lo + hi) / 2

print(round(bond_price(100, 0.04, 5, 0.04), 4))
print(round(bond_price(100, 0.04, 5, 0.05), 4))
print(f"{bond_yield(96.0, 100, 0.04, 5):.4%}")`, out: R`100.0
95.6705
4.9219%` },
      { p: R`At a yield equal to the coupon the bond prices at par, 100. When yields rise, the price falls. Bisection is slow but cannot fail as long as the starting interval contains the answer, which makes it a good first root-finder. The Optimization module covers faster ones.` }
    ] },
    { t: "Reading data from a file", b: [
      { p: R`Most data starts as a CSV file. The standard library's <code>csv</code> module reads it row by row. Note that every field arrives as a string, so you convert as you read:` },
      { code: R`import csv, io

raw = """date,ticker,close
2026-11-16,SAP,212.40
2026-11-17,SAP,214.05
2026-11-18,SAP,
2026-11-19,SAP,211.80
"""

rows = []
for rec in csv.DictReader(io.StringIO(raw)):     # use open("file.csv") for a real file
    if not rec["close"]:
        print("missing close on", rec["date"])
        continue
    rows.append((rec["date"], float(rec["close"])))

print(rows)`, out: R`missing close on 2026-11-18
[('2026-11-16', 212.4), ('2026-11-17', 214.05), ('2026-11-19', 211.8)]` },
      { p: R`You now have every tool needed to load a file, clean it, compute returns, simulate, and report results. The Quant Stack module replaces these loops with array operations that are both shorter and around a hundred times faster.` }
    ] }
  ],
  take: ["Build an equity curve and compute maximum drawdown", "Implement a moving-average signal without look-ahead bias", "Run a seeded Monte Carlo simulation and read percentiles", "Price a bond from its cash flows and solve for its yield by bisection", "Read and clean a CSV file with the standard library"],
  quiz: [
    { q: "An equity curve goes 100 → 120 → 90 → 110. The maximum drawdown is", o: ["-10%", "-18.2%", "-25%", "-30%"], a: 2, why: "Peak 120, trough 90: 90/120 − 1 = −25%." },
    { q: "Why must a backtest use yesterday's signal to earn today's return?", o: ["To reduce trading costs", "To avoid look-ahead bias", "Because prices are delayed", "To make the code faster"], a: 1, why: "Today's signal uses today's close, which was not known when today's return started." },
    { q: "Why seed a random number generator in research code?", o: ["To make results reproducible", "To make the numbers more random", "To speed up the simulation", "It is required by Python"], a: 0, why: "A fixed seed produces the same sequence, so results can be checked and compared." },
    { q: "A 5-year 4% annual-coupon bond is priced at 96. Its yield is", o: ["below 4%", "exactly 4%", "above 4%", "impossible to tell"], a: 2, why: "Below par means the yield is above the coupon (about 4.92% here)." }
  ]
}
},

/* ------------------------------------------------------------------ */
exam: [
  { q: R`What does <code>type(3 // 2)</code> return?`, o: ["float", "int", "bool", "str"], a: 1, why: R`Integer division of two ints gives an int: 1.` },
  { q: R`<code>f"{1234.5:,.1f}"</code> prints`, o: ["1234.5", "1,234.5", "1.234,5", "1,234.50"], a: 1, why: "Comma adds thousands separators, .1f keeps one decimal." },
  { q: R`What is printed? <code>x = 0</code> · <code>while x &lt; 10: x += 4</code> · <code>print(x)</code>`, o: ["8", "10", "12", "16"], a: 2, why: "0 → 4 → 8 → 12; the loop stops once x is no longer below 10." },
  { q: R`Which line correctly loops over two lists together?`, o: ["for a, b in tickers, weights:", "for a, b in zip(tickers, weights):", "for a in tickers and b in weights:", "for (a, b) in range(tickers, weights):"], a: 1, why: R`<code>zip</code> pairs up items from both lists.` },
  { q: R`<code>def f(x): x.append(1)</code>; after <code>a = []; f(a); f(a)</code>, what is <code>a</code>?`, o: ["[]", "[1]", "[1, 1]", "an error"], a: 2, why: "Lists are passed by reference; the function modifies the caller's list each time." },
  { q: "Which statement about local variables is true?", o: ["They are visible after the function returns", "They exist only while the function runs", "They must be declared global", "They are shared between all functions"], a: 1, why: "Local names are created on each call and disappear when it ends." },
  { q: R`<code>{"a": 1, "b": 2}.get("c", 9)</code> returns`, o: ["None", "KeyError", "9", "0"], a: 2, why: "The default is returned for a missing key." },
  { q: R`<code>sorted({3, 1, 3, 2})</code> returns`, o: ["[3, 1, 3, 2]", "[1, 2, 3]", "[1, 2, 3, 3]", "{1, 2, 3}"], a: 1, why: "The set removes the duplicate; sorted returns a list." },
  { q: R`What does <code>[r for r in [0.01, -0.02, 0.03] if r &lt; 0]</code> produce?`, o: ["[-0.02]", "[0.01, 0.03]", "[True]", "-0.02"], a: 0, why: "The filter keeps only negative returns." },
  { q: "In a backtest loop, the position held during day t should be based on", o: ["the close of day t", "the close of day t−1", "the average of the whole sample", "the close of day t+1"], a: 1, why: "Anything else uses information that wasn't available yet." },
  { q: "A bond priced above par has a yield", o: ["above its coupon", "equal to its coupon", "below its coupon", "of zero"], a: 2, why: "Paying more than face value means you earn less than the coupon rate." },
  { q: R`When reading a CSV with <code>csv.DictReader</code>, the value in each field is`, o: ["automatically a float if it looks like a number", "always a string", "None for every number", "a tuple"], a: 1, why: "csv reads text; converting to numbers is your job." }
]
};
}
