/* Quantitative Finance Club TU Darmstadt — curriculum map.
   Lesson text lives in content/<module>.js and is loaded on demand. */
window.QFC = {
  written: ["calculus", "python-foundations", "instrument-map"],
  writtenProjects: [],
  programs: [
    { id: "math", slug: "math-for-quants", name: "Math for Quants", short: "Math", weeks: 16, glyph: "∫",
      blurb: "The mathematics a quant uses every day, built up from limits to stochastic calculus and simulation.",
      tags: ["Calculus", "Linear algebra", "Probability", "Optimization", "Stochastic calculus"] },
    { id: "code", slug: "code-for-quants", name: "Code for Quants", short: "Code", weeks: 20, glyph: "{ }",
      blurb: "Python from first principles to data pipelines, statistics and portfolio risk tooling.",
      tags: ["Python", "NumPy & pandas", "Data engineering", "Statistics", "Risk"] },
    { id: "finance", slug: "finance-for-quants", name: "Finance for Quants", short: "Finance", weeks: 12, glyph: "$",
      blurb: "What the instruments are, how markets actually trade them, and how derivatives get priced.",
      tags: ["Instruments", "Microstructure", "No-arbitrage", "Volatility"] }
  ],

  stages: ["Foundation", "Core", "Applied", "Advanced", "Specialization", "Frontier"],

  modules: [
    /* ---------- MATH ---------- */
    { slug: "calculus", program: "math", stage: 0, n: 1, title: "Calculus", hours: 12, level: "Beginner",
      desc: "Single-variable calculus with a trader's eye: when formulas behave, how sensitive a P&L is to one input, and how to add up continuous change.",
      prereq: [],
      lessons: [
        ["limits-and-continuity", "Limits & Continuity", "What a formula is approaching, and why risk systems quietly depend on it", 12],
        ["the-derivative", "The Derivative", "Rates of change, slopes and the sensitivity of a position to one input", 60],
        ["the-integral", "The Integral", "Adding up continuous change, by hand and numerically", 50],
        ["applications-in-finance", "Applications of Calculus in Finance", "Compounding, log returns and growth over time", 50]
      ], project: "single-trade" },
    { slug: "multivariable-calculus", program: "math", stage: 1, n: 2, title: "Multivariable Calculus", hours: 10, level: "Intermediate",
      desc: "Calculus when the answer depends on many inputs at once, as almost every portfolio, risk model and option price does.",
      prereq: ["calculus"],
      lessons: [
        ["functions-of-several-variables", "Functions of Several Variables", "Surfaces, level curves and thinking in more than one dimension", 35],
        ["partial-derivatives", "Partial Derivatives", "Moving one input while freezing the rest", 40],
        ["gradient-and-directional-derivatives", "Gradient & Directional Derivatives", "Which way is uphill, and how steep it is in any direction", 45],
        ["hessians-and-curvature", "Hessians & Curvature", "Second derivatives in many dimensions and what convexity looks like", 50],
        ["multidimensional-taylor", "Taylor Expansion in Multiple Dimensions", "Local approximations that power delta-gamma risk", 45]
      ], project: "risk-surface" },
    { slug: "linear-algebra", program: "math", stage: 1, n: 3, title: "Linear Algebra", hours: 12, level: "Intermediate",
      desc: "Vectors, matrices and eigen-decompositions as the working language of portfolios, factor models and risk.",
      prereq: ["calculus"],
      lessons: [
        ["vectors-and-linear-combinations", "Vectors & Linear Combinations", "Weights, returns and portfolios as arrows you can add", 35],
        ["matrices-and-multiplication", "Matrices & Matrix Multiplication", "Applying many linear maps at once", 40],
        ["row-and-column-spaces", "Row & Column Spaces", "Span, dimension and what a data matrix can express", 40],
        ["independence-and-rank", "Linear Independence & Rank", "Spotting assets and signals that add no new information", 45],
        ["projections", "Projections", "Splitting a return into explained and unexplained parts", 40],
        ["eigenvalues-and-eigenvectors", "Eigenvalues & Eigenvectors", "Directions a matrix only stretches, and why risk has them", 50],
        ["covariance-matrices", "Covariance Matrices", "How assets move together, and portfolio variance in one line", 45],
        ["pca-for-quants", "PCA (Quant Version)", "Compressing a market into a handful of factors", 50]
      ], project: "market-regimes" },
    { slug: "probability-and-random-variables", program: "math", stage: 2, n: 4, title: "Probability & Random Variables", hours: 14, level: "Intermediate",
      desc: "Probability as a tool for decisions under uncertainty: rules, updating, distributions, moments and tail risk.",
      prereq: ["calculus"],
      lessons: [
        ["sample-space-and-rules", "Sample Space, Events, and Probability Rules", "The axioms and the handful of rules everything rests on", 40],
        ["conditional-probability", "Conditional Probability and Independence", "How new information changes the odds", 40],
        ["bayes-rule", "Bayes' Rule and Updating Beliefs", "Turning evidence into a revised view", 45],
        ["random-variables-and-distributions", "Random Variables and Distributions", "Attaching numbers to outcomes, discrete and continuous", 45],
        ["expectation-variance-moments", "Expectation, Variance, and Moments", "Centre, spread, skew and fat tails", 50],
        ["joint-distributions", "Joint Distributions, Covariance, and Correlation", "Describing several random quantities at once", 45],
        ["lln-and-clt", "Law of Large Numbers and Central Limit Theorem", "Why averages settle down and sums look normal", 40],
        ["volatility-and-var", "Risk Metrics: Volatility and Value at Risk", "Putting a number on how much you could lose", 45]
      ], project: "strategy-verdict" },
    { slug: "optimization", program: "math", stage: 2, n: 5, title: "Optimization", hours: 13, level: "Advanced",
      desc: "Finding the best decision under constraints, from gradient descent to KKT conditions and quadratic programs.",
      prereq: ["multivariable-calculus", "linear-algebra"],
      lessons: [
        ["problems-and-objectives", "Optimization Problems and Objective Functions", "Decision variables, objectives and feasible sets", 40],
        ["first-order-methods", "First-Order Optimization Methods", "Walking downhill with gradients and step sizes", 45],
        ["convexity", "Convexity and Global Optimality", "When a local answer is guaranteed to be the best one", 45],
        ["second-order-methods", "Hessians and Curvature", "Newton's method and using curvature to step smarter", 50],
        ["optimality-conditions", "Optimality Conditions and Convergence Intuition", "How to recognise a minimum and how fast you reach it", 45],
        ["constrained-optimization", "Constrained Optimization", "Budgets, bounds and Lagrange multipliers", 50],
        ["lagrangian-and-kkt", "Lagrangian and KKT Conditions", "Equality and inequality constraints in one framework", 45],
        ["quadratic-optimization", "Quadratic Optimization and Quant Case Studies", "Mean-variance, calibration and hedging as QPs", 50]
      ], project: "portfolio-optimizer" },
    { slug: "differential-equations", program: "math", stage: 2, n: 6, title: "Differential Equations", hours: 13, level: "Advanced",
      desc: "Equations about rates of change, from compound growth to the diffusion equation behind option pricing.",
      prereq: ["calculus", "linear-algebra"],
      lessons: [
        ["first-order-odes", "First-Order ODEs and Exponential Models", "Separable equations, integrating factors and continuous growth", 30],
        ["second-order-odes", "Second-Order ODEs and Mean Reversion", "Characteristic equations, damping and pull towards a level", 35],
        ["systems-of-odes", "Systems of Differential Equations", "Matrix exponentials, eigen-solutions and stability", 35],
        ["intro-to-pdes", "Introduction to Partial Differential Equations", "Types of PDE, boundary conditions and transport", 30],
        ["diffusion-equation", "The Diffusion Equation", "The heat equation and its link to random walks", 35]
      ] },
    { slug: "stochastic-processes", program: "math", stage: 3, n: 7, title: "Stochastic Processes", hours: 14, level: "Advanced",
      desc: "Randomness that unfolds over time: random walks, Markov chains, Poisson arrivals and Brownian motion.",
      prereq: ["probability-and-random-variables"],
      lessons: [
        ["intro-to-stochastic-processes", "Introduction to Stochastic Processes", "Families of random variables indexed by time", 40],
        ["random-walks", "Random Walks", "Coin-flip paths and their surprising behaviour", 45],
        ["markov-chains", "Markov Chains", "Systems where only the current state matters", 50],
        ["stationary-distributions", "Stationary Distributions and Ergodicity", "Where a chain spends its time in the long run", 45],
        ["poisson-processes", "Poisson Processes", "Counting random arrivals, trades and jumps", 45],
        ["brownian-motion", "Brownian Motion", "The continuous limit of a random walk", 50],
        ["properties-of-brownian-motion", "Properties of Brownian Motion", "Scaling, information flow and hitting times", 45],
        ["gbm-and-lognormal", "Geometric Brownian Motion and the Lognormal Model", "The textbook stock price model and its limits", 50]
      ] },
    { slug: "stochastic-calculus", program: "math", stage: 4, n: 8, title: "Stochastic Calculus", hours: 14, level: "Advanced",
      desc: "Itô calculus, SDEs and change of measure: the machinery behind derivative pricing and rate models.",
      prereq: ["stochastic-processes", "differential-equations"],
      lessons: [
        ["quadratic-variation", "Quadratic Variation: Why Stochastic Calculus Exists", "Why ordinary calculus breaks on Brownian paths", 45],
        ["martingales-and-filtrations", "Martingales and Filtrations", "Fair games and what you know when", 40],
        ["ito-integral", "The Ito Integral", "Integrating against noise, and dW² = dt", 50],
        ["itos-lemma", "Ito's Lemma: The Chain Rule of Stochastic Calculus", "Transforming processes with one extra term", 55],
        ["sdes-in-finance", "SDEs in Finance: GBM, Ornstein-Uhlenbeck, and CIR", "Growth, mean reversion and positive rates", 55],
        ["simulating-sdes", "Simulating SDEs: Euler-Maruyama and Milstein", "Discretising SDEs and measuring the error", 40],
        ["calibrating-sdes", "Calibrating SDEs from Market Data", "Estimating speed, level and volatility from a time series", 50],
        ["feynman-kac", "Feynman-Kac: From SDEs to PDEs", "Expectations as solutions of PDEs", 50],
        ["girsanov-and-risk-neutral", "Change of Measure: Girsanov and Risk-Neutral Pricing", "Changing the drift to price without forecasts", 55],
        ["black-scholes-and-beyond", "Black-Scholes and Beyond: Stochastic Volatility and Jumps", "The formula, the smile and models that fix it", 60]
      ], project: "delta-hedging" },
    { slug: "computational-methods", program: "math", stage: 4, n: 9, title: "Computational Methods", hours: 15, level: "Advanced",
      desc: "Simulation and inference when no formula exists: Monte Carlo, variance reduction, MCMC and the Kalman filter.",
      prereq: ["probability-and-random-variables", "stochastic-processes"],
      lessons: [
        ["monte-carlo-integration", "Monte Carlo Integration", "Estimating expectations with random draws and error bars", 45],
        ["sampling-from-distributions", "Sampling from Distributions", "Inverse transform, rejection and correlated normals", 50],
        ["monte-carlo-pricing-and-risk", "Monte Carlo Pricing and Risk", "Path-dependent payoffs and simulated VaR", 50],
        ["variance-reduction", "Variance Reduction: More Accuracy from Fewer Paths", "Antithetics, control variates, stratification, importance sampling", 50],
        ["bayesian-inference", "Bayesian Inference: From Priors to Posteriors", "Conjugate updates and credible intervals", 50],
        ["metropolis-hastings", "The Metropolis-Hastings Algorithm", "Sampling a posterior known only up to a constant", 55],
        ["gibbs-sampling", "Gibbs Sampling and Data Augmentation", "One conditional at a time", 50],
        ["mcmc-diagnostics", "MCMC Diagnostics: Is Your Chain Lying to You?", "Trace plots, effective sample size and R-hat", 45],
        ["kalman-filter", "State-Space Models and the Kalman Filter", "Tracking a hidden state as data arrives", 55],
        ["capstone-mean-reverting-spread", "Capstone: Bayesian Inference for a Mean-Reverting Spread", "Every tool in the module on one trading problem", 60]
      ] },
    { slug: "advanced-bayesian-methods", program: "math", stage: 5, n: 10, title: "Advanced Bayesian Methods", hours: 12, soon: true,
      desc: "Hierarchical models, variational inference and Bayesian model comparison.", prereq: ["computational-methods"], lessons: [] },

    /* ---------- CODE ---------- */
    { slug: "python-foundations", program: "code", stage: 0, n: 1, title: "Python Foundations", hours: 12, level: "Beginner",
      desc: "Python from zero: values and types, control flow, functions, data structures, and first quant-flavoured programs.",
      prereq: [],
      lessons: [
        ["variables-and-data-types", "Variables & Data Types", "Numbers, strings, booleans and why types matter", 12],
        ["control-flow", "Control Flow", "Making decisions and repeating work", 30],
        ["functions", "Functions", "Packaging logic so you can reuse and test it", 35],
        ["data-structures", "Data Structures", "Lists, dicts, sets and comprehensions", 40],
        ["python-for-quant-problems", "Python for Quant Problems", "Small, complete programs on real finance questions", 45]
      ] },
    { slug: "quant-stack", program: "code", stage: 1, n: 2, title: "The Quant Stack", hours: 14, level: "Beginner",
      desc: "NumPy, pandas, Matplotlib and SciPy: the libraries nearly every quant notebook starts with.",
      prereq: ["python-foundations"],
      lessons: [
        ["numpy-fundamentals", "NumPy Fundamentals", "Arrays, vectorisation and broadcasting", 30],
        ["numpy-for-finance", "NumPy for Finance", "Returns, volatility and correlation in a few lines", 35],
        ["pandas-dataframes", "Pandas DataFrames", "Series, frames, selection and filtering", 35],
        ["pandas-time-series", "Pandas for Time Series", "Date indexes, resampling and rolling windows", 30],
        ["data-visualization", "Data Visualization", "Clear financial charts with Matplotlib", 30]
      ] },
    { slug: "ai-powered-development", program: "code", stage: 2, n: 3, title: "AI-Powered Development", hours: 10, level: "Intermediate",
      desc: "Using AI assistants well in quant work: when to trust them, how to brief them and how to build tools on top of them.",
      prereq: ["quant-stack"],
      lessons: [
        ["ai-framework", "The Quant's AI Framework", "Deciding what to hand to AI and what to keep", 25],
        ["when-ai-gets-it-wrong", "When AI Gets It Wrong", "Typical failure modes in quant code and maths", 30],
        ["prompt-and-context-engineering", "Prompt & Context Engineering", "Giving a model what it needs to be useful", 35],
        ["building-ai-tools", "Building AI-Powered Tools", "Calling model APIs from your own research tools", 30]
      ] },
    { slug: "financial-data-engineering", program: "code", stage: 2, n: 4, title: "Financial Data Engineering", hours: 12, level: "Intermediate",
      desc: "Getting market data, cleaning it and turning it into a dependable pipeline.",
      prereq: ["quant-stack"],
      lessons: [
        ["data-sources-and-apis", "Data Sources & APIs", "Where market and macro data comes from and how to fetch it", 35],
        ["working-with-ohlcv", "Working with OHLCV", "Bars, adjustments, splits and dividends", 35],
        ["data-quality-and-cleaning", "Data Quality & Cleaning", "Gaps, outliers and validation rules", 30],
        ["datetime-mastery", "Datetime Mastery", "Time zones, sessions and trading calendars", 30],
        ["alternative-data", "Alternative Data Intro", "Text, sentiment and responsible collection", 30],
        ["sql-for-quants", "SQL for Quants", "Querying, joining and designing tables", 35],
        ["building-a-data-pipeline", "Building a Data Pipeline", "Fetch, validate, store and schedule", 35]
      ], project: "data-pipeline" },
    { slug: "statistical-computing", program: "code", stage: 2, n: 5, title: "Statistical Computing", hours: 12, level: "Intermediate",
      desc: "Statistics in code: simulation, estimation, testing, bootstrapping, regression and the stylised facts of returns.",
      prereq: ["quant-stack"],
      lessons: [
        ["randomness-and-distributions", "Randomness & Distributions", "Generators, seeds, scipy.stats and heavy tails", 35],
        ["monte-carlo-methods", "Monte Carlo Methods", "Simulation, convergence and standard error", 35],
        ["estimators-and-confidence-intervals", "Estimators & Confidence Intervals", "Bias, variance and interval estimates", 40],
        ["hypothesis-testing", "Hypothesis Testing & p-values", "t-tests and the multiple-testing trap", 40],
        ["the-bootstrap", "The Bootstrap", "Resampling for intervals and permutation tests", 35],
        ["regression-and-covariance", "Regression & Covariance", "OLS, beta and inference on coefficients", 40],
        ["autocorrelation-and-stationarity", "Autocorrelation & Stationarity", "ACF, Ljung-Box and unit-root tests", 40],
        ["statistics-of-real-returns", "The Statistics of Real Returns", "Checking the stylised facts on actual data", 45]
      ], project: "ohlc-volatility" },
    { slug: "portfolio-risk", program: "code", stage: 3, n: 6, title: "Portfolio & Risk", hours: 12, level: "Advanced",
      desc: "Building and measuring portfolios in Python: volatility models, covariance, tail risk, optimisation and factors.",
      prereq: ["statistical-computing", "linear-algebra"],
      lessons: [
        ["assets-to-portfolios", "From Assets to Portfolios", "Weights, portfolio returns and diversification", 35],
        ["modeling-volatility", "Modeling Volatility", "Rolling, EWMA and GARCH estimates", 40],
        ["covariance-matrix-problem", "The Covariance Matrix Problem", "Noise, shrinkage and correlations in a crisis", 40],
        ["var-and-expected-shortfall", "VaR & Expected Shortfall", "Tail-risk estimates and how to backtest them", 40],
        ["mean-variance-in-practice", "Mean-Variance Optimization in Practice", "Frontiers on real data and why they misbehave", 45],
        ["factor-models", "Factor Models", "Market beta, Fama-French and statistical factors", 40],
        ["risk-attribution-and-parity", "Risk Attribution & Risk Parity", "Where risk comes from and how to budget it", 40],
        ["capstone-risk-report", "Capstone: The Portfolio Risk Report", "A complete risk report on one portfolio", 45]
      ] },
    { slug: "backtesting", program: "code", stage: 3, n: 7, title: "Backtesting", hours: 14, soon: true, desc: "Honest strategy tests: look-ahead bias, costs, walk-forward and overfitting.", prereq: ["portfolio-risk"], lessons: [] },
    { slug: "ml-for-quants", program: "code", stage: 3, n: 8, title: "Machine Learning for Quants", hours: 14, soon: true, desc: "Supervised learning on financial data without fooling yourself.", prereq: ["statistical-computing"], lessons: [] },
    { slug: "deep-learning", program: "code", stage: 4, n: 9, title: "Deep Learning & Advanced ML", hours: 12, soon: true, desc: "Sequence models and representation learning for markets.", prereq: ["ml-for-quants"], lessons: [] },
    { slug: "production-systems", program: "code", stage: 5, n: 10, title: "Production Systems", hours: 10, soon: true, desc: "Taking research code to reliable, monitored production.", prereq: ["backtesting"], lessons: [] },

    /* ---------- FINANCE ---------- */
    { slug: "instrument-map", program: "finance", stage: 0, n: 1, title: "The Instrument Map", hours: 10, level: "Beginner",
      desc: "Stocks, bonds, funds, futures, options, swaps, FX and perpetuals: what each one pays, who takes the other side and how it can go wrong.",
      prereq: [],
      lessons: [
        ["what-you-own", "What You Actually Own", "Instruments as contracts: cash flows owed and risks carried", 30],
        ["stocks", "Stocks", "Equity, dividends and what drives a share price", 35],
        ["bonds", "Bonds", "Coupons, maturity and the price-yield seesaw", 40],
        ["indices-and-etfs", "Indices & ETFs", "Building and weighting baskets, and how funds track them", 35],
        ["futures-and-forwards", "Futures & Forwards", "Locking in a price today for a trade later", 40],
        ["options", "Options", "Calls, puts and paying for a right rather than an obligation", 45],
        ["swaps-fx-perps", "Swaps, FX & Crypto Perps", "Exchanging cash flows, currencies and never-expiring futures", 45]
      ] },
    { slug: "market-microstructure", program: "finance", stage: 1, n: 2, title: "Market Microstructure", hours: 12, level: "Intermediate",
      desc: "How trading actually happens: order books, queues, market makers, venues, costs and the days markets break.",
      prereq: ["instrument-map"],
      lessons: [
        ["other-side", "Who's on the Other Side", "Every trade has a counterparty with a reason", 40],
        ["limit-order-book", "The Limit Order Book", "Bids, asks, spread and how prices form", 50],
        ["queue-position", "Queue Position", "Priority rules, tick sizes and the value of speed", 40],
        ["market-makers", "Market Makers, the Spread & Adverse Selection", "What the spread compensates for", 45],
        ["where-trades-happen", "Where Trades Happen", "Exchanges, internalisers, dark pools and order routing", 50],
        ["true-cost-of-a-trade", "The True Cost of a Trade", "Spread, impact and turnover beyond the commission", 45],
        ["short-selling-and-margin", "Short Selling, Leverage & Margin", "Borrowing shares and money, and how squeezes start", 45],
        ["when-markets-break", "When Markets Break", "Flash crashes, liquidity holes and circuit breakers", 45]
      ], project: "vwap-execution" },
    { slug: "no-arbitrage-pricing", program: "finance", stage: 1, n: 3, title: "Pricing by No-Arbitrage", hours: 12, level: "Intermediate", isNew: true,
      desc: "Pricing without forecasting: carry, parity, replication, binomial trees, Black-Scholes and implied volatility.",
      prereq: ["instrument-map"],
      lessons: [
        ["law-of-one-price", "The Law of One Price", "Equal payoffs, equal prices, and the trade that enforces it", 35],
        ["forwards-and-carry", "Forwards and the Price of Waiting", "Forward prices as financing cost, not prediction", 35],
        ["commodity-curves", "Commodity Curves: Storage, Scarcity and the Roll", "Contango, backwardation and roll yield", 35],
        ["building-payoffs", "Building Payoffs from Options", "Spreads, straddles, collars and covered calls", 40],
        ["put-call-parity", "Put-Call Parity", "Call minus put equals forward, and why it must", 35],
        ["one-step-replication", "Copying an Option in One Step", "Pricing by building the payoff from stock and cash", 30],
        ["trees-and-risk-neutral", "Trees and Risk-Neutral Pricing", "Multi-step trees, early exercise and risk-neutral odds", 35],
        ["black-scholes-machine", "Black-Scholes as a Machine", "Five inputs, one price, and the assumptions inside", 40],
        ["implied-vol-and-smile", "Implied Volatility and the Smile", "Backing volatility out of prices and reading the skew", 30],
        ["the-vix", "The VIX", "How the volatility index is built and why VIX products bleed", 40]
      ] },
    { slug: "risk-return-utility", program: "finance", stage: 1, n: 4, title: "Risk, Return & Utility", hours: 11, soon: true, desc: "Preferences, utility and the trade-off between reward and risk.", prereq: ["instrument-map"], lessons: [] },
    { slug: "greeks-hedging-volatility", program: "finance", stage: 2, n: 5, title: "Greeks, Hedging & Volatility", hours: 10, soon: true, desc: "Sensitivities, hedging in practice and trading volatility.", prereq: ["no-arbitrage-pricing"], lessons: [] },
    { slug: "rates-and-credit", program: "finance", stage: 2, n: 6, title: "Rates & Credit", hours: 11, soon: true, desc: "Yield curves, duration, swaps and default risk.", prereq: ["instrument-map"], lessons: [] },
    { slug: "how-quant-firms-make-money", program: "finance", stage: 3, n: 7, title: "How Quant Firms Make Money", hours: 9, soon: true, desc: "Market making, stat arb, systematic macro and the business behind them.", prereq: ["market-microstructure"], lessons: [] }
  ],

  /* Recommended path for a quant researcher, by stage */
  order: [
    "calculus", "python-foundations", "instrument-map",
    "multivariable-calculus", "linear-algebra", "quant-stack", "market-microstructure", "no-arbitrage-pricing", "risk-return-utility",
    "probability-and-random-variables", "optimization", "differential-equations", "ai-powered-development", "financial-data-engineering", "statistical-computing", "greeks-hedging-volatility", "rates-and-credit",
    "stochastic-processes", "portfolio-risk", "backtesting", "ml-for-quants", "how-quant-firms-make-money",
    "stochastic-calculus", "computational-methods", "deep-learning",
    "advanced-bayesian-methods", "production-systems"
  ],

  pipeline: [
    { name: "Data & infrastructure", note: "Pipelines and clean inputs" },
    { name: "Alpha research", note: "Signals, regimes and trade decisions" },
    { name: "Portfolio construction", note: "Turning views into weights" },
    { name: "Execution", note: "Getting filled without paying too much" },
    { name: "Risk & monitoring", note: "Hedging, volatility and drawdowns" }
  ],

  projects: [
    { slug: "data-pipeline", stage: 0, module: "financial-data-engineering", title: "A Clean Market Data Pipeline", level: "Intermediate", hours: 8,
      desc: "Pull daily prices from a public API, catch gaps, spikes and split errors, and write a tidy dataset that downstream research can trust." },
    { slug: "market-regimes", stage: 1, module: "linear-algebra", title: "Finding Market Regimes with PCA", level: "Intermediate", hours: 9,
      desc: "Treat each day's cross-section of returns as a vector, compress it with PCA and look for recurring clusters that behave like regimes." },
    { slug: "single-trade", stage: 1, module: "calculus", title: "Tuning a Single Trade", level: "Beginner", hours: 6,
      desc: "Choose a position size, a holding period and an exit level one variable at a time, using derivatives to find and defend each optimum." },
    { slug: "strategy-verdict", stage: 1, module: "probability-and-random-variables", title: "Should We Trade This Strategy?", level: "Intermediate", hours: 8,
      desc: "Estimate edge, break-even hit rate and the distribution of outcomes by simulation, stress the assumptions and write a go or no-go memo." },
    { slug: "risk-surface", stage: 1, module: "multivariable-calculus", title: "Mapping a Two-Asset Risk Surface", level: "Intermediate", hours: 8,
      desc: "Treat a two-asset book as a function of two market moves, compute its gradient and Hessian, and compare the quadratic approximation with full revaluation." },
    { slug: "portfolio-optimizer", stage: 2, module: "optimization", title: "A Constrained Portfolio Optimizer", level: "Advanced", hours: 12,
      desc: "Trace an efficient frontier with CVXPY, add long-only, sector and turnover limits, make it robust to estimation error and defend one allocation." },
    { slug: "vwap-execution", stage: 3, module: "market-microstructure", title: "VWAP Execution with Market Impact", level: "Intermediate", hours: 8,
      desc: "Slice a large parent order across the day, model temporary and permanent impact, and compare VWAP with an Almgren-Chriss style schedule." },
    { slug: "delta-hedging", stage: 4, module: "stochastic-calculus", title: "The Real Cost of Delta Hedging", level: "Advanced", hours: 12,
      desc: "Hedge a short option in discrete time, split the P&L into gamma and theta, pick a rebalancing frequency and see what jumps and changing volatility do to it." },
    { slug: "ohlc-volatility", stage: 4, module: "statistical-computing", title: "Volatility from OHLC Bars", level: "Intermediate", hours: 10,
      desc: "Simulate intraday paths, compare close-to-close with high-low range estimators, and find out when each one fails." }
  ]
};
