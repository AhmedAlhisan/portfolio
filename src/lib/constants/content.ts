export const personalInfo = {
  name: "Ahmed Alhisan",
  title: "AI Product Manager | Senior AI Software Engineer",
  location: "Riyadh, Saudi Arabia",
  contact: {
    phone: "+966535991010",
    email: "alhisan.swe@gmail.com",
    linkedin: "linkedin.com/in/ahmedalhisan",
  },
}

export const hero = {
  headline: "AI Product Manager & Senior AI Software Engineer",
  subheadline:
    "Voice Intelligence (ASR + LLMs), RAG pipelines, and agentic systems — built for real-world deployment.",
  chips: ["Whisper Fine-tuning", "RAG + Multi-Agent", "OCI Deployment"],
  brand: "I turn complex AI challenges into production-ready systems (ASR + LLM + RAG + agentic) with measurable business impact.",
}

export const about = {
  paragraphs: [
    "With 7+ years of experience spanning software engineering and AI product management, I specialize in transforming complex AI challenges into production-ready solutions that deliver measurable business value.",
    "My expertise lies at the intersection of voice intelligence (ASR + LLMs), retrieval-augmented generation (RAG) pipelines, and agentic systems. I've led AI initiatives that reduced cloud costs by 60%+ while maintaining world-class accuracy.",
    "As a member of the AI Association and an MIT Digital Transformation certificate candidate, I'm committed to advancing AI innovation in Saudi Arabia and beyond.",
  ],
  badges: [
    { label: "AI Association Member", value: "Since Oct 2025" },
    { label: "MIT Digital Transformation", value: "In Progress" },
  ],
}

export const impactCards = [
  {
    title: "AI Arabic Speech Recognition Tool",
    metric: { value: 60, suffix: "%", label: "Cloud Cost Reduction" },
    icon: "Brain",
    color: "cyan" as const,
    highlights: [
      "Whisper-based ASR optimized for Arabic-English bilingual input",
      "60% cloud cost reduction via quantization and CPU/GPU optimization",
      "Integrated LLMs for JSON entity extraction + sentiment classification",
    ],
  },
  {
    title: "Knowledge Agent System",
    metric: null,
    icon: "Database",
    color: "blue" as const,
    highlights: [
      "Enterprise RAG pipeline with multi-step agent orchestration",
      "Fast, traceable answers with full audit trails",
      "Improved accuracy + interpretability for real-world deployment",
    ],
  },
  {
    title: "RLHF + Online Learning Framework",
    metric: null,
    icon: "Target",
    color: "indigo" as const,
    highlights: [
      "Framework for reinforcement learning from human feedback",
      "Continuous learning loop from user feedback to model weight updates",
      "Real-time model adaptation for production environments",
    ],
  },
]

export const projects = [
  {
    id: "ai-speech-recognition",
    title: "AI Arabic Speech Recognition",
    problem:
      "Emergency paramedics needed accurate, real-time Arabic-English speech-to-text with entity extraction for critical medical information. Existing solutions were too expensive for cloud deployment at scale and lacked Arabic dialect support.",
    approach:
      "Fine-tuned Whisper model for Arabic dialect variations using PyTorch Lightning. Integrated lightweight LLMs for structured entity extraction and sentiment analysis. Implemented quantization and hybrid CPU/GPU deployment strategies to optimize costs.",
    architecture: {
      nodes: [
        { id: "data", label: "Audio Input", icon: "FileAudio", color: "cyan" },
        { id: "asr", label: "Whisper ASR", icon: "Mic", color: "cyan" },
        { id: "llm", label: "LLM Extraction", icon: "Brain", color: "blue" },
        { id: "sentiment", label: "Sentiment", icon: "Heart", color: "indigo" },
        { id: "api", label: "REST API", icon: "Server", color: "purple" },
      ],
      connections: [
        { from: "data", to: "asr", label: "Audio Stream" },
        { from: "asr", to: "llm", label: "Transcript" },
        { from: "llm", to: "sentiment", label: "Entities" },
        { from: "sentiment", to: "api", label: "Structured JSON" },
      ],
    },
    techStack: [
      "Whisper",
      "PyTorch Lightning",
      "Quantization",
      "Transformers",
      "FastAPI",
      "Oracle Cloud (OCI)",
      "Microservices",
    ],
    results:
      "Achieved 60%+ cloud cost reduction through quantization and optimized deployment. Delivered production-ready ASR system serving emergency paramedics with high accuracy on Arabic dialects. Successfully integrated with existing backend infrastructure.",
    learnings:
      "Learned importance of early cost optimization in AI deployments. Discovered that hybrid CPU/GPU strategies can dramatically reduce infrastructure costs without sacrificing quality. Reinforced value of domain-specific fine-tuning for Arabic language variants.",
  },
  {
    id: "knowledge-agent",
    title: "Knowledge Agent System (RAG + Multi-Agent)",
    problem:
      "Enterprise needed intelligent question-answering system that could provide accurate, traceable answers from large document repositories. Traditional keyword search failed to understand context and intent.",
    approach:
      "Built RAG pipeline with vector database for semantic search. Implemented multi-step agent orchestration for complex reasoning tasks. Added full audit trails for answer provenance and traceability.",
    architecture: {
      nodes: [
        { id: "query", label: "User Query", icon: "Search", color: "cyan" },
        { id: "vector", label: "Vector DB", icon: "Database", color: "blue" },
        { id: "rag", label: "RAG Pipeline", icon: "GitMerge", color: "indigo" },
        { id: "agent", label: "Multi-Agent", icon: "Bot", color: "purple" },
        { id: "output", label: "Answer + Audit", icon: "CheckCircle", color: "cyan" },
      ],
      connections: [
        { from: "query", to: "vector", label: "Embedding" },
        { from: "vector", to: "rag", label: "Context" },
        { from: "rag", to: "agent", label: "Augmented Prompt" },
        { from: "agent", to: "output", label: "Structured Response" },
      ],
    },
    techStack: [
      "RAG",
      "Vector Database",
      "LLMs (Gemma, Mistral)",
      "Multi-Agent Framework",
      "FastAPI",
      "Microservices",
    ],
    results:
      "Improved answer accuracy compared to keyword search. Reduced time-to-answer for complex queries through intelligent agent routing. Delivered full audit trails meeting enterprise compliance requirements.",
    learnings:
      "RAG quality heavily depends on chunk strategy and embedding model selection. Multi-agent orchestration enables complex reasoning but requires careful prompt engineering. Audit trails are critical for enterprise AI adoption.",
  },
  {
    id: "rlhf-framework",
    title: "RLHF Framework",
    problem:
      "LLM outputs needed continuous improvement based on real-world user feedback. Static models couldn't adapt to changing user preferences and domain-specific requirements.",
    approach:
      "Implemented RLHF pipeline with online learning loop. Collected user feedback, trained reward model, and fine-tuned LLM with PPO. Built infrastructure for continuous model updates without service interruption.",
    architecture: {
      nodes: [
        { id: "llm", label: "Base LLM", icon: "Brain", color: "cyan" },
        { id: "feedback", label: "User Feedback", icon: "MessageCircle", color: "blue" },
        { id: "reward", label: "Reward Model", icon: "Trophy", color: "indigo" },
        { id: "ppo", label: "PPO Training", icon: "Zap", color: "purple" },
        { id: "updated", label: "Updated LLM", icon: "Sparkles", color: "cyan" },
      ],
      connections: [
        { from: "llm", to: "feedback", label: "Generate" },
        { from: "feedback", to: "reward", label: "Train" },
        { from: "reward", to: "ppo", label: "Score" },
        { from: "ppo", to: "updated", label: "Fine-tune" },
        { from: "updated", to: "llm", label: "Deploy" },
      ],
    },
    techStack: [
      "RLHF",
      "PPO (Proximal Policy Optimization)",
      "Online Learning",
      "LLM Fine-tuning",
      "PyTorch",
      "Reward Modeling",
    ],
    results:
      "Established continuous learning pipeline enabling model improvement from production feedback. Reduced need for manual dataset curation. Improved model alignment with user preferences over time.",
    learnings:
      "RLHF reward model quality is crucial - garbage in, garbage out. Online learning requires careful monitoring to prevent reward hacking. Continuous deployment infrastructure is essential for iterative improvements.",
  },
]

export const experiences = [
  {
    period: "12/2023 — PRESENT",
    company: "Al Sahab National Company",
    role: "Senior AI & Software Engineer / AI Product Manager",
    logo: "/images/companies/alsahab-logo.png.svg",
    highlights: [
      "Product owner for enterprise AI-based Speech-to-Text system for paramedics: defined roadmap, coordinated cross-functional teams, and led deployment",
      "Fine-tuned Whisper model for Arabic dialects using PyTorch Lightning, improving accuracy and reducing cloud inference costs by 60%+",
      "Integrated LLMs (Gemma, Mistral) for real-time information extraction and sentiment classification",
      "Deployed scalable ASR system on Oracle Cloud (OCI) with optimized CPU and GPU inference",
      "Built robust backend with RESTful APIs and microservices architecture",
      "Led integrations with third-party APIs for comprehensive system connectivity",
      "Mentored cross-functional AI team, setting sprint goals and ensuring timely delivery",
    ],
  },
  {
    period: "10/2025 — PRESENT",
    company: "AI Association",
    role: "Member",
    logo: "/images/companies/ai-association-logo.png.svg",
    highlights: [
      "Contributing to strategic initiatives supporting Saudi Arabia's AI ecosystem",
      "Collaborating on AI innovation projects and knowledge sharing",
    ],
  },
  {
    period: "09/2019 — 12/2023",
    company: "Ministry of Defense – National Defense University",
    role: "Backend Engineer",
    logo: "/images/companies/mod-logo.svg",
    highlights: [
      "Built RESTful APIs and backend services, improving operational efficiency by approximately 30%",
      "Delivered 'Track Employee Courses and Mandates' platform, receiving official recognition for impact",
      "Modernized legacy MVC applications to microservices architecture",
      "Optimized system performance, resolved critical bugs, and enhanced stability",
      "Deployed and managed Windows Server 2019 environments",
    ],
  },
  {
    period: "12/2014 — 12/2018",
    company: "SARA Group",
    role: "IT Specialist",
    logo: "/images/companies/sara-logo.png.svg",
    highlights: [
      "Resolved 100+ support tickets monthly, maintaining high user satisfaction",
      "Created training materials and documentation, increasing software adoption by 80%",
      "Monitored enterprise systems performance and ensured uptime",
      "Conducted thorough testing and validation of IT solutions",
    ],
  },
]

export const skills = {
  Programming: ["Python", "Java", "C#", "JavaScript"],
  Frameworks: [
    "PyTorch Lightning",
    "Transformers",
    "Hugging Face",
    "FastAPI",
    "Spring Boot",
    ".NET",
    "Django",
    "Flask",
  ],
  "AI/ML": [
    "Speech to Text",
    "LLMs (Gemma, Mistral)",
    "RAG",
    "RLHF",
    "NLP",
    "Fine-tuning",
    "Quantization",
  ],
  "DevOps/Cloud": [
    "Git",
    "Hugging Face",
    "Oracle Cloud (OCI)",
    "CPU/GPU Optimization",
  ],
  Databases: ["PostgreSQL", "SQL Server", "Vector Database"],
  Concepts: [
    "SDLC",
    "Microservices",
    "RESTful APIs",
    "AI Product Roadmaps",
    "Production Deployment",
  ],
  "Soft Skills": [
    "Product Vision",
    "Stakeholder Management",
    "Leadership",
    "Mentoring",
    "Communication",
  ],
}

export const education = [
  {
    institution: "MIT Professional Education",
    degree: "Professional Certificate in Digital Transformation in AI Age",
    period: "Sep 2025 - Jul 2026",
    status: "In Progress",
    logo: "/images/companies/mit-logo.svg",
    type: "certification" as const,
  },
  {
    institution: "META & TUWAIQ Academy",
    degree: "Professional Diploma in Generative AI",
    period: "Sep 2024 - Sep 2025",
    status: "Completed",
    logo: "/images/companies/meta-tuwaiq-logo.png.svg",
    type: "certification" as const,
  },
  {
    institution: "King Saud University",
    degree: "B.Sc. Software Engineering",
    period: "2013 - 2018",
    status: "Completed",
    logo: "/images/companies/ksu-logo.png.svg",
    type: "degree" as const,
  },
]

export const certifications = [
  { name: "Generative AI", issuer: "META & TUWAIQ Academy", year: "2025" },
  { name: "AI Product Manager", issuer: "Udacity & BFS", year: "2024" },
  { name: "T5 Data Science and AI", issuer: "SADAIA", year: "2023" },
  {
    name: "Communication & Emotional Intelligence",
    issuer: "EuroMaTech",
    year: "2023",
  },
  { name: "Web Development with Django", issuer: "Tuwaiq Academy", year: "2022" },
  { name: "Front-End Nanodegree", issuer: "Udacity", year: "2021" },
]

export const contact = {
  cta: "Let's build production AI",
  description:
    "I'm always interested in new opportunities to build production-ready AI systems that deliver real business impact. Let's connect!",
}

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#impact", label: "Impact" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
]
