/**
 * All site copy lives here. Edit this file to update the website,
 * no component changes needed.
 *
 * Anything still marked `TODO` is a placeholder waiting for real content.
 */

export type IconName = 'code' | 'spark' | 'briefcase' | 'leap' | 'trophy'

export interface KpiMetric {
  id: string
  value: string
  label: string
  sublabel: string
}

export interface JourneyMilestone {
  step: string
  tag: string
  icon: IconName
  title: string
  organization: string
  period?: string
  /** One line, always visible. */
  summary: string
  /** Revealed when the milestone is opened. */
  highlights?: string[]
  /** Short chips, e.g. client names or modules. */
  chips?: string[]
  /** Optional label shown before the chips. */
  chipsLabel?: string
}

export interface ProjectReflection {
  win: string
  lesson: string
}

export interface ProjectItem {
  id: string
  title: string
  category: string
  summary: string
  impact?: string
  stack: string[]
  repoUrl?: string
  liveUrl?: string
  /** Shown instead of links when code can't be public yet. */
  linkNote?: string
  reflection?: ProjectReflection
}

export interface ClientProject {
  id: string
  client: string
  title: string
  summary: string
  impact?: string
  stack: string[]
}

export interface CurrentBuild {
  id: string
  title: string
  status: string
  description: string
  stack: string[]
  linkUrl?: string
  linkNote?: string
}

export interface SkillCategory {
  category: string
  skills: string[]
}

/** Shown wherever real content is still missing. */
export const TBC = 'TBC'

export const profile = {
  name: 'Gauraiya Gaur',
  shortName: 'GG.',
  role: 'Data Scientist & Multi-Agent AI Developer',
  location: 'Coventry, UK',
  intro:
    "Hi, I’m Gauraiya, a data scientist turned AI developer out of the University of Warwick. AI is way more than template images and social media trends. I build multi-agent systems that turn complex problems into simple, everyday tools, giving you expert-level insights right where you need them most. No fluff. Just practical AI built for real life.",
  metaDescription:
    'Gauraiya Gaur, data scientist turned AI developer (MSc Business Analytics & AI, University of Warwick). Building practical multi-agent and neuro-symbolic AI systems.',
  portrait: '/portrait.jpg',
  portraitAlt: 'Gauraiya Gaur on a London street at Christmas',
  cvUrl: '/Gauraiya_Gaur_CV.pdf',
  email: 'gauraiyagaurwork@gmail.com',
  linkedin: 'https://www.linkedin.com/in/gauraiya-gaur-7053081b5/',
  github: 'https://github.com/gauraiyagaur',
  projectsRepo: 'https://github.com/gauraiyagaur/AI-Projects',
}

export const hireMeHref = `mailto:${profile.email}?subject=${encodeURIComponent('Hello Gauraiya, let’s work together')}`

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Journey', href: '#journey' },
  { label: 'Current Builds', href: '#lab' },
  { label: 'Stack', href: '#stack' },
]

export const kpis: KpiMetric[] = [
  { id: 'industry', value: '3.5+', label: 'Industry Execution', sublabel: 'Years shipping enterprise data & AI solutions.' },
  { id: 'immersion', value: '5+', label: 'Deep AI Immersion', sublabel: 'Years of continuous building, research & upskilling.' },
  { id: 'independent', value: '6', label: 'Independent Projects', sublabel: 'Self-driven ML, optimisation & agentic systems.' },
  { id: 'client', value: '5', label: 'Client Projects', sublabel: 'Enterprise data & AI work for global brands.' },
]

export const journey: JourneyMilestone[] = [
  {
    step: '01',
    tag: 'The Foundation',
    icon: 'code',
    title: 'Software roots',
    organization: 'BSc Computer & Communication Engineering, Manipal University Jaipur',
    period: '2018 – 2022',
    summary: 'Algorithms, data structures and clean architecture, before any model.',
    highlights: ['Learnt how clean systems are architected before touching a predictive model', 'CGPA 8/10'],
  },
  {
    step: '02',
    tag: 'The Pivot',
    icon: 'spark',
    title: 'Fell for ML',
    organization: 'Discovering predictive intelligence',
    summary: 'From writing rules to building systems that learn from messy data.',
    highlights: ['Final-year project: machine-learning prediction of cardiovascular disease'],
  },
  {
    step: '03',
    tag: 'Industry · 3.5 yrs',
    icon: 'briefcase',
    title: 'Data Scientist @ MathCo',
    organization: 'Enterprise consulting & production delivery, Bangalore',
    period: '2022 – 2025',
    summary: 'Shipped ML for global brands. Analyst to lead measurement.',
    chips: ['Walmart Connect', 'Best Buy', 'Redbox', 'GoFundMe'],
    highlights: [
      '~15% Customer Success efficiency lift in month one from an early-intervention model',
      'Measurement framework contributing to $2.78B in consumer impact',
      'Led cross-functional squads and built front-end decision simulators',
    ],
  },
  {
    step: '04',
    tag: 'The Leap',
    icon: 'leap',
    title: 'Off to Warwick',
    organization: 'MSc Business Analytics & AI, Warwick Business School',
    period: '2025 – 2026',
    summary: 'Left consulting for the frontier: LLMs, multi-agent and neuro-symbolic AI.',
    highlights: ['Moved to the UK to deepen technical rigour full time'],
  },
  {
    step: '05',
    tag: 'MSc Milestones',
    icon: 'trophy',
    title: 'Distinction in 4 modules',
    organization: 'MSc Business Analytics & AI, University of Warwick (overall: Merit)',
    period: '2026',
    summary: 'Earned Distinction in four core modules, leading group projects along the way.',
    chipsLabel: 'Distinction in',
    chips: ['Optimisation', 'Generative AI', 'Forecasting', 'Analytics in Practice'],
    highlights: [
      'Distinction modules: Optimisation, Generative AI, Forecasting, Analytics in Practice',
      'Built leadership skills leading group projects; praised by peers and professors for technical and communication skills',
      'Rated highly by peers throughout the course for doing more or higher-quality work than expected',
      'Makes important contributions that improve the team’s work',
      'Helps complete the work of teammates who are having difficulty',
    ],
  },
]

export const projects: ProjectItem[] = [
  {
    id: 'luxcal',
    title: 'Luxcal: Agentic Market Research for Ultra-Premium Brands',
    category: 'MSc Dissertation · Multi-Agent',
    summary:
      'A neuro-symbolic multi-agent system (LLMs, tool calling, reasoning loops) that turns luxury-market questions into competitive intelligence, evaluated across 11 brand cases and 5 ablation conditions.',
    impact: 'Custom benchmarks and guardrails (hallucination verification, output validation) keep agent behaviour deterministic and high-precision.',
    stack: ['Multi-Agent Systems', 'Neuro-Symbolic AI', 'LLM Orchestration', 'Python'],
    repoUrl: 'https://github.com/gauraiyagaur/luxcal',
    reflection: {
      win: 'Praised by Warwick examiners for a reproducible neuro-symbolic multi-agent architecture, specifically for separating deterministic logic from LLM judgement and for tackling a complex, non-standard domain.',
      lesson: 'Critiqued for rushed citation auditing and minor reporting gaps in the final tables. Proof that even when the code and logic hold up, disciplined documentation is half the craft.',
    },
  },
  {
    id: 'energy-rag',
    title: 'RAG System for the UK Energy Sector',
    category: 'MSc Coursework · RAG',
    summary:
      'End-to-end retrieval-augmented generation over NESO and Ofgem documents, with a full debugging and evaluation cycle and a technical report.',
    impact: '+37.7% retrieval precision (MRR) and +110.6% response grounding. Citation-enforced prompting eliminated hallucinations on sparse-data edge cases.',
    stack: ['RAG', 'Vector Embeddings', 'Evaluation', 'Python'],
    repoUrl: 'https://github.com/gauraiyagaur/AI-Projects',
  },
  {
    id: 'credit-classification',
    title: 'Credit Application Classification',
    category: 'MSc Group Project · Predictive Modelling',
    summary: 'Benchmarked six classification algorithms on imbalanced credit-application data, following CRISP-DM.',
    impact: 'LightGBM and XGBoost led at ~0.90 ROC-AUC, versus 0.88 for logistic regression.',
    stack: ['LightGBM', 'XGBoost', 'scikit-learn', 'CRISP-DM'],
    linkNote: 'Code coming to GitHub', // TODO: add repo link
  },
  {
    id: 'credit-default',
    title: 'Credit Default Prediction',
    category: 'MSc Project · Deep Neural Network',
    summary: 'A PyTorch deep neural network for consumer-loan default, trained on 41,298 observations.',
    impact: '~70% held-out accuracy.',
    stack: ['PyTorch', 'Deep Learning', 'pandas'],
    linkNote: 'Code coming to GitHub', // TODO: add repo link
  },
  {
    id: 'tube-heating',
    title: 'Statistical Analysis of the London Tube Heating System',
    category: 'MSc Project · Statistics',
    summary: 'Statistical analysis of heat on the London Underground, built in R and RStudio.',
    stack: ['R', 'RStudio', 'Statistical Testing'],
    linkNote: 'Code coming to GitHub', // TODO: add repo link + one-line result
  },
  {
    id: 'pyomo-optimisation',
    title: 'Integer & Mixed-Integer Programming',
    category: 'MSc Project · Optimisation',
    summary: 'Formulated and solved optimisation problems as integer and mixed-integer programmes with the Pyomo solver.',
    stack: ['Pyomo', 'MILP', 'Python'],
    linkNote: 'Code coming to GitHub', // TODO: add repo link + one-line result
  },
]

export const clientWorkNote =
  'Delivered at MathCo. Code and data belong to MathCo and its clients, so these are summaries of shipped work. References available on request.'

export const clientProjects: ClientProject[] = [
  {
    id: 'gofundme',
    client: 'GoFundMe',
    title: 'Predictive Early-Intervention Model',
    summary: 'End-to-end model (cleansing, feature engineering, build, deployment) flagging accounts for the Customer Success team to reach early.',
    impact: '~15% Customer Success efficiency lift in the first month after deployment.',
    stack: ['Python', 'Predictive Modelling', 'Deployment'],
  },
  {
    id: 'walmart',
    client: 'Walmart Connect',
    title: 'Omni-Channel Measurement Framework',
    summary: 'Turned ambiguous objectives from commercial leadership into a measurement framework spanning market and revenue analysis.',
    impact: 'Contributed to $2.78B in consumer impact; analysis informed ~25% revenue growth across the account.',
    stack: ['SQL', 'Python', 'Measurement'],
  },
  {
    id: 'redbox',
    client: 'Redbox',
    title: 'A/B Testing for Promotion Offers',
    summary: 'Designed and ran A/B tests to measure how promotional offers performed, with test durations set by power analysis.',
    stack: ['A/B Testing', 'Power Analysis', 'Python'],
  },
  {
    id: 'bestbuy',
    client: 'Best Buy',
    title: 'Front-End Staffing Simulation',
    summary: 'A simulation system to optimise front-end staff allocation and increase customer close rate.',
    stack: ['Simulation', 'Optimisation', 'Python'],
  },
  {
    id: 'automotive',
    client: 'Automotive client, North America',
    title: 'Inventory Forecasting',
    summary: 'Time-series forecasting to plan vehicle inventory across North America.',
    stack: ['Time-Series', 'Python', 'Snowflake'],
  },
]

export const currentBuilds: CurrentBuild[] = [
  {
    id: 'gillmore',
    title: 'Tokenisation in the Circular Economy',
    status: 'Research',
    description:
      'Research Associate at the Gillmore Centre for Financial Technology, University of Warwick. Helping with research and designing frameworks.',
    stack: ['FinTech', 'Tokenisation', 'Framework Design'],
    linkNote: 'Work in progress, not public yet',
  },
  {
    id: 'stock-nn',
    title: 'Long-Term Stock Prediction',
    status: 'Building',
    description: 'Fine-tuning neural network models to find the best stock picks for long-term investment.',
    stack: ['Neural Networks', 'Fine-Tuning', 'Time-Series'],
    linkNote: 'Code coming to GitHub', // TODO: add repo link
  },
  {
    id: 'intraday-agent',
    title: 'Intraday Trading AI Agent',
    status: 'Building',
    description: 'An AI agent for intraday trading, built to book maximum profit while keeping risk to a minimum.',
    stack: ['AI Agents', 'Python', 'Risk Controls'],
    linkNote: 'Code coming to GitHub', // TODO: add repo link
  },
]

export const skillCategories: SkillCategory[] = [
  {
    category: 'Multi-Agent & LLMs',
    skills: [
      'Multi-Agent Systems',
      'LLM Orchestration',
      'Tool Calling',
      'RAG Systems',
      'Evaluation & Guardrails',
      'Hallucination Verification',
      'Neuro-Symbolic AI',
      'LangGraph',
      'CrewAI',
      'Pydantic',
      'Vector Embeddings',
      'Generative AI',
      'Claude Code',
    ],
  },
  {
    category: 'Data Science & ML',
    skills: [
      'Predictive Modelling',
      'Gradient Boosting',
      'Deep Learning',
      'PyTorch',
      'scikit-learn',
      'A/B Testing',
      'Statistical Hypothesis Testing',
      'Power Analysis',
      'Time-Series Forecasting',
      'Optimisation (Pyomo, MILP)',
      'Simulation',
    ],
  },
  {
    category: 'Data Engineering & BI',
    skills: ['PySpark', 'Snowflake', 'AWS (Lambda, S3)', 'GCP', 'Tableau', 'Power BI'],
  },
  {
    category: 'Languages & Frameworks',
    skills: ['Python', 'SQL', 'R', 'pandas', 'NumPy', 'Git'],
  },
]
