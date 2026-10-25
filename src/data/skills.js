export const skillsData = [
  {
    category: "Frontend Engineering",
    code: "01",
    summary: "Building high-performance, accessible, and reactive user interfaces with modern client frameworks.",
    items: [
      { name: "Next.js", description: "App Router, Server Components, SSR, CSR, Dynamic Routing, Caching & ISR" },
      { name: "React", description: "Component architecture, custom hooks, reactive state, DOM/BOM optimization" },
      { name: "TypeScript", description: "Type safety, interfaces, generics, OOP principles, and clean contracts" },
      { name: "JavaScript (ES6+)", description: "Async/await, closures, promises, array methods, and problem solving" },
      { name: "Tailwind CSS", description: "Utility-first responsive layouts, theme tokens, and clean design systems" },
      { name: "UI Frameworks", description: "ShadCN UI, Hero UI, DaisyUI component libraries for rapid polished UIs" }
    ]
  },
  {
    category: "Backend & Architecture",
    code: "02",
    summary: "Designing scalable server systems, modular MVC codebases, and robust RESTful API endpoints.",
    items: [
      { name: "Node.js", description: "Asynchronous runtime execution, non-blocking I/O, events, and server logic" },
      { name: "Express.js", description: "Modular pattern, routing, middleware pipeline, error handlers, and CORS" },
      { name: "RESTful APIs", description: "Granular CRUD operations, HTTP status codes, structured response bodies" },
      { name: "Modular Architecture", description: "Separation of concerns across models, controllers, routes, and services" }
    ]
  },
  {
    category: "Database & ODM",
    code: "03",
    summary: "Architecting document schemas, complex data aggregations, and resilient MongoDB persistence.",
    items: [
      { name: "MongoDB", description: "NoSQL document storage, MongoDB Atlas cloud deployment, and indexing" },
      { name: "Mongoose ODM", description: "Schema validation, relations, hooks, virtuals, and entity modeling" },
      { name: "Aggregation Pipelines", description: "$match, $group, $project, $lookup, $unwind, and advanced queries" },
      { name: "CRUD & Data Integrity", description: "Secure ACID operations, pagination, filtering, and data sanitization" }
    ]
  },
  {
    category: "Auth & Security",
    code: "04",
    summary: "Implementing enterprise-grade identity management, access control, and token security.",
    items: [
      { name: "BetterAuth", description: "Modern authentication system, session persistence, and MongoDB adapter" },
      { name: "JWT Authentication", description: "JSON Web Tokens, secure HTTPOnly cookie management, and refresh cycles" },
      { name: "RBAC (Access Control)", description: "Role-Based Access Control for Admin, User, and Moderator tiers" },
      { name: "OAuth Providers", description: "Social authentication integrations with Google OAuth and GitHub OAuth" }
    ]
  },
  {
    category: "Payments & Integration",
    code: "05",
    summary: "Integrating global and local payment gateways with secure webhook event handling.",
    items: [
      { name: "Stripe", description: "Stripe Checkout sessions, subscription logic, and webhook signatures" },
      { name: "SSLCommerz", description: "Local payment gateway workflow, IPN handling, and transaction tracking" },
      { name: "API Integrations", description: "Consuming external third-party REST APIs, Axios data pipelines" }
    ]
  },
  {
    category: "AI-Driven Development",
    code: "06",
    summary: "Leveraging modern AI-native agentic tools and local intelligence for accelerated production velocity.",
    items: [
      { name: "AI Assisted Coding", description: "Agentic workflows with Cursor AI, Antigravity, Claude Code, and Lovable" },
      { name: "Local AI & Ollama", description: "Running local LLMs via Ollama, API integration in Express backend" },
      { name: "Context Engineering", description: "PRD writing, prompt engineering, AI code reviews, and refactoring" },
      { name: "Modern DevOps", description: "Git, GitHub branch workflows, Vercel edge deployment, and Postman" }
    ]
  }
];
