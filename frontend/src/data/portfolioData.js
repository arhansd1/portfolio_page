export const portfolioData = {
  name: "Arhan S D",
  title: "AI/GenAI Engineer / FullStack ",
  college: "Bits Goa '26 - ENI",
  email: "sdarhan2002a@gmail.com",
  linkedin: "https://www.linkedin.com/in/arhan-s-d-a01186347/",
  github: "https://github.com/arhansd1",
  about: "Passionate AI/GenAI Engineer specializing in building intelligent systems and LLM applications. Experienced in developing production-ready ML pipelines and conversational AI solutions. Well versed in Full Staack Web Devolopment / Design",
  
  experience: [
    {
      type: "Internship",
      role: "AI Intern",
      company: "10xScale.ai",
      period: "06/2025 - 12/2025",
      description: "Worked on building end-to-end AI products including resume-enhancement systems, multi-node chatbots, and automated job-apply agents. Designed vector-database pipelines for retrieval-augmented generation (RAG), fine-tuned large language models, pre-trained small language models, and developed multi-agent workflows for scalable AI systems.",
      tech_used: {
        "Python": "used for core AI development and automation",
        "LLMs": "used for building intelligent conversational and reasoning systems",
        "SLMs": "used for pre-training and lightweight AI deployments",
        "LangGraph": "used to design multi-agent workflows",
        "AgentFlow": "used for orchestrating agent-based systems",
        "MCP": "used for agent communication and control",
        "Playwright": "used for browser automation in job-apply agents",
        "Qdrant": "used as a vector database for RAG pipelines",
        "mem0": "used for long-term memory management in agents"
      }
    },
    {
      type: "Internship",
      role: "FullStack developer",
      company: "MDDTI Southern Railways , Bangalore",
      period: "06/2024 - 08/2024",
      description: "Collaborated with a team to design and develop a fully functional company website to enhance online presence and user engagement. Developed a computer-based testing (CBT) platform enabling efficient test creation, management, and administration. Implemented features for test creation, test management, and result analysis.",
      tech_used:{
        "HTML": "used for structuring web pages",
        "CSS": "used for styling and layout",
        "JavaScript": "used for client-side logic and interactivity",
        "Node.js": "used for backend development",
        "Express": "used to build REST APIs",
        "SQL": "used for database management and queries"
      }

    }
  ],
  
  projects: [
      {
      name: "Autofill Extension",
      period: "07/2025 - 09/2025",
      type:"Internship project" ,
      description: "An AI-powered Chrome extension that automatically fills online forms by detecting input fields and intelligently matching them with user data. Built end-to-end, including extension UI, backend services, database design, and AI-driven field-matching logic, enabling one-click, accurate form completion across multiple websites.",
      tools_used: {
        "TypeScript": "used for building the Chrome extension and core logic",
        "Chrome Extension APIs": "used to interact with browser tabs and form elements",
        "LangGraph": "used to build agent-based field detection and matching workflows",
        "PostgreSQL": "used to store and manage user data securely",
        "Automation Tools": "used for DOM analysis and form interaction"
      },
      github:null,
      website_link: "https://careerpilot.10xscale.ai"
    },
    {
      name: "CSV Cleaner (CleanSV)",
      period: "04/2025 - 04/2025",
      type: "Personal Project",
      description: "An AI-powered web application that simplifies CSV and Excel data cleaning using plain English commands. Users can upload datasets, describe desired changes, and receive auto-generated Python code with a live table preview. Supports accept/reject per operation, full undo/redo, and one-click download while handling duplicates, formatting issues, and missing values in a clean, editor-style interface.",
      tools_used: {
        "Python": "used for data processing and backend logic",
        "FastAPI": "used to build backend APIs",
        "LangGraph": "used to orchestrate AI-driven data transformation workflows",
        "React.js": "used to build the frontend interface",
        "Tailwind CSS": "used for responsive UI styling",
        "OpenAI Models": "used for natural language understanding and code generation",
        "Unsloth": "used to fine-tune LLMs for reliable code execution"
      },
      github: "https://github.com/arhansd1/CleanSV-v1-",
      website_link: null
    },
    {
      name: "Computer-Based Testing Platform",
      period: "05/2024 - 06/2024",
      type: "Internship Project",
      description: "Developed a secure and user-friendly computer-based testing platform with separate admin and student portals. The system supports question bank management, test creation, result evaluation, and implements measures to ensure a cheat-free testing environment while providing smooth and safe access for students.",
      tools_used: {
        "HTML": "used for structuring the web application",
        "CSS": "used for styling and responsive layout",
        "JavaScript": "used for frontend interactivity and validation",
        "Node.js": "used for backend logic and server-side processing",
        "Express": "used to build REST APIs",
        "SQL": "used to manage question databases and test results"
      },
      github: "https://github.com/arhansd1/computer-based-testing-website",
      website_link: null
    }
  ],
  
  skills: {
    "AI/ML": ["LLMs", "RAG", "Fine-tuning", "Prompt Engineering", "LangChain"],
    "Languages": ["Python", "JavaScript", "SQL"],
    "Frameworks": ["PyTorch", "TensorFlow", "FastAPI", "React"],
    "Tools": ["Docker", "AWS", "Git", "Vector DBs"]
  }
};