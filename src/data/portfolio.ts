/**
 * All site copy lives here. Edit this file to update the website —
 * no component changes needed.
 *
 * Anything still marked `TODO` is a placeholder waiting for real content.
 */

export interface KpiMetric {
  id: string
  value: string
  label: string
  sublabel: string
}

export interface JourneyMilestone {
  step: string
  tag: string
  title: string
  organization: string
  period?: string
  summary: string
  highlights?: string[]
  isFeaturedReview?: boolean
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
}

export interface CurrentBuild {
  id: string
  title: string
  status: string
  description: string
  stack: string[]
  linkUrl?: string
}

export interface SkillCategory {
  category: string
  skills: string[]
}

export interface ReviewPoint {
  title: string
  body: string
}

export interface DissertationReview {
  title: string
  context: string
  worked: ReviewPoint[]
  takeaway: ReviewPoint
}

/** Shown wherever real content is still missing. */
export const TBC = 'TBC'

export const profile = {
  name: 'Gauraiya Gaur',
  shortName: 'GG.',
  role: 'Data Scientist & Multi-Agent AI Developer',
  location: 'Coventry, UK',
  intro:
    "Hi, I’m Gauraiya — a data scientist turned AI developer out of the University of Warwick. AI is way more than template images and social media trends. I build multi-agent systems that turn complex problems into simple, everyday tools — giving you expert-level insights right where you need them most. No fluff. Just practical AI built for real life.",
  metaDescription:
    'Gauraiya Gaur — data scientist turned AI developer (MSc Business Analytics & AI, University of Warwick). Building practical multi-agent and neuro-symbolic AI systems.',
  portrait: '/portrait.jpg',
  portraitAlt: 'Gauraiya Gaur on a London street at Christmas',
  cvUrl: '/Gauraiya_Gaur_CV.pdf',
  email: 'gauraiyagaur99@gmail.com',
  linkedin: 'https://www.linkedin.com/in/gauraiya-gaur-7053081b5/',
  github: 'https://github.com/gauraiyagaur',
  projectsRepo: 'https://github.com/gauraiyagaur/AI-Projects',
}

export const hireMeHref = `mailto:${profile.email}?subject=${encodeURIComponent('Hello Gauraiya — let’s work together')}`

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Journey', href: '#journey' },
  { label: 'Current Builds', href: '#lab' },
  { label: 'Stack', href: '#stack' },
]

export const kpis: KpiMetric[] = [
  { id: 'industry', value: '3.5+', label: 'Industry Execution', sublabel: 'Years shipping enterprise data & AI solutions.' },
  { id: 'immersion', value: '5+', label: 'Deep AI Immersion', sublabel: 'Years of continuous building, research & upskilling.' },
  // TODO: exact number of completed projects
  { id: 'projects', value: TBC, label: 'Completed Projects', sublabel: 'End-to-end ML & agentic systems shipped.' },
  // TODO: exact number of distinction modules / research outputs
  { id: 'distinction', value: TBC, label: 'Distinction & Research', sublabel: 'Distinction modules & research outputs.' },
]

export const journey: JourneyMilestone[] = [
  {
    step: '01',
    tag: 'The Foundation',
    title: 'Computer Science & Software Roots',
    organization: 'BSc Computer & Communication Engineering — Manipal University Jaipur',
    period: '2018 — 2022',
    summary:
      'Built a core foundation in algorithms, data structures, and software engineering principles — learning how clean systems are architected before ever touching a predictive model.',
  },
  {
    step: '02',
    tag: 'The Pivot',
    title: 'Accidental Encounter with ML & Data Science',
    organization: 'Discovering predictive intelligence',
    summary:
      'Stumbled into machine learning and statistical modelling, shifting focus from writing deterministic rules to building systems that learn patterns from messy, real-world data.',
    highlights: ['Final-year project: machine-learning prediction of cardiovascular disease'],
  },
  {
    step: '03',
    tag: 'Industry Execution · 3.5 Years',
    title: 'Data Scientist & Analytics Consultant @ MathCo',
    organization: 'Enterprise consulting & production delivery — Bangalore',
    period: '2022 — 2025',
    summary:
      'Spent 3.5 years translating complex business ambiguity into deployed statistical and machine-learning models for major enterprise clients — including Walmart Connect, Best Buy, Redbox and GoFundMe. Led cross-functional squads, built front-end decision simulators, and delivered measurable commercial impact under tight deadlines.',
    highlights: [
      'Deployed an early-intervention model end-to-end: ~15% Customer Success efficiency lift in month one',
      'Omni-channel measurement framework with Walmart Connect leadership, contributing to $2.78B in consumer impact',
      'Moved up from analyst to lead measurement',
    ],
  },
  {
    step: '04',
    tag: 'The Leap',
    title: 'Bidding Farewell to Consulting for Postgraduate Research',
    organization: 'MSc Business Analytics & AI — Warwick Business School',
    period: '2025 — 2026',
    summary:
      'Stepped away from full-time consulting to deepen technical rigour in the UK, focusing on the frontier of large language models, multi-agent orchestration, and neuro-symbolic AI architectures.',
  },
  {
    step: '05',
    tag: 'MSc Milestones & Academic Review',
    title: 'Warwick Postgraduate Culmination',
    organization: 'University of Warwick — graduated with Distinction',
    period: '2026',
    summary:
      'Finished the MSc with an overall Distinction, alongside research work at the Gillmore Centre for Financial Technology.',
    highlights: [
      // TODO: replace with the exact Distinction module names
      'Notable modules: Advanced Data Analytics, Optimisation Models, Business Statistics, Generative AI, Analytics in Practice',
      'Research Associate, Gillmore Centre for Financial Technology — tokenisation in circular-economy initiatives',
      // TODO: add certifications, hackathons or other achievements
    ],
    isFeaturedReview: true,
  },
]

export const dissertationReview: DissertationReview = {
  title: 'Academic Review: MSc Dissertation (Luxcal)',
  context:
    'Built and evaluated a calibrated, neuro-symbolic multi-agent system for luxury market research across 11 brand cases and 5 ablation conditions.',
  worked: [
    {
      title: 'Replicable engineering',
      body: 'Examiners noted the methodology as the strongest aspect of the work: the system architecture, gate logic and eleven-cell action space were specified clearly enough to be rebuilt from scratch.',
    },
    {
      title: 'Neuro-symbolic soundness',
      body: 'Separating deterministic arithmetic from LLM judgement was praised as a sound architectural choice, supported by useful ablation testing across five conditions.',
    },
    {
      title: 'Real-world gap',
      body: 'Commended for pushing multi-agent research beyond safe, standard domains into the nuanced constraints of luxury market research.',
    },
  ],
  takeaway: {
    title: 'Rigour over speed',
    body: 'While the technical build held strong, the review rightly flagged oversights in citation verification, baseline sample tracking (n = 30 vs n = 33) and structural polish — a sharp reminder that strong engineering demands unhurried, meticulous documentation.',
  },
}

export const projects: ProjectItem[] = [
  {
    id: 'luxcal',
    title: 'Luxcal — Agentic Market Research for Ultra-Premium Brands',
    category: 'MSc Dissertation · Multi-Agent',
    summary:
      'An autonomous multi-agent system using neuro-symbolic logic and agent orchestration (LLMs, tool calling, reasoning loops) that turns complex luxury-market questions into competitive intelligence.',
    impact: 'Custom evaluation benchmarks and guardrails — hallucination verification and output validation — keep agent behaviour deterministic and high-precision.',
    stack: ['Multi-Agent Systems', 'Neuro-Symbolic AI', 'LLM Orchestration', 'Python'],
    repoUrl: 'https://github.com/gauraiyagaur/AI-Projects',
  },
  {
    id: 'energy-rag',
    title: 'RAG System for the UK Energy Sector',
    category: 'MSc Coursework · RAG',
    summary:
      'End-to-end retrieval-augmented generation over NESO and Ofgem documents, with a full debugging and evaluation cycle and a technical report.',
    impact: '+37.7% retrieval precision (MRR) and +110.6% response grounding; citation-enforced prompting eliminated hallucinations on sparse-data edge cases.',
    stack: ['RAG', 'Vector Embeddings', 'Evaluation', 'Python'],
    repoUrl: 'https://github.com/gauraiyagaur/AI-Projects',
  },
  {
    id: 'credit-classification',
    title: 'Credit Application Classification',
    category: 'MSc Group Project · ML',
    summary:
      'Benchmarked six classification algorithms on imbalanced credit-application data following CRISP-DM.',
    impact: 'LightGBM and XGBoost led at ~0.90 ROC-AUC, versus 0.88 for logistic regression.',
    stack: ['LightGBM', 'XGBoost', 'scikit-learn', 'CRISP-DM'],
    repoUrl: 'https://github.com/gauraiyagaur/AI-Projects',
  },
  {
    id: 'credit-default',
    title: 'Credit Default Prediction with Deep Learning',
    category: 'MSc Project · Deep Learning',
    summary:
      'Designed and trained a PyTorch deep neural network for consumer-loan default on 41,298 observations.',
    impact: '~70% held-out accuracy.',
    stack: ['PyTorch', 'Deep Learning', 'pandas'],
    repoUrl: 'https://github.com/gauraiyagaur/AI-Projects',
  },
]

// TODO: replace all three with real current projects
export const currentBuilds: CurrentBuild[] = [
  {
    id: 'build-1',
    title: 'Current Project 1 — TBC',
    status: 'Building',
    description: 'Two-line description of what this project does and why it matters. Waiting on details from Gauraiya.',
    stack: ['TBC'],
  },
  {
    id: 'build-2',
    title: 'Current Project 2 — TBC',
    status: 'Active',
    description: 'Two-line description of what this project does and why it matters. Waiting on details from Gauraiya.',
    stack: ['TBC'],
  },
  {
    id: 'build-3',
    title: 'Current Project 3 — TBC',
    status: 'Building',
    description: 'Two-line description of what this project does and why it matters. Waiting on details from Gauraiya.',
    stack: ['TBC'],
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
