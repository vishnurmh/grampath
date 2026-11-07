export interface Career {
  id: string;
  title: string;
  category: string;
  description: string;
  requiredSkills: string[];
  educationRequirements: string[];
  careerOpportunities: string[];
  learningSuggestions: string[];
  salaryRange: string;
}

export const CAREERS: Career[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    category: "Computer Science",
    description:
      "Designs, develops, tests, and maintains software applications and systems using programming languages and engineering principles.",
    requiredSkills: ["JavaScript", "Python", "Java", "SQL", "Git", "Problem Solving"],
    educationRequirements: ["Bachelor's in Computer Science or related field", "Knowledge of data structures and algorithms"],
    careerOpportunities: ["Web Development", "Mobile App Development", "Software Product Companies", "Startups"],
    learningSuggestions: ["Build personal projects", "Contribute to open source", "Learn version control (Git)", "Practice coding problems"],
    salaryRange: "\u20B93,00,000 - \u20B915,00,000 per year",
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "Data Science",
    description:
      "Analyzes large datasets to extract insights, build predictive models, and support data-driven decision making.",
    requiredSkills: ["Python", "Statistics", "SQL", "Machine Learning", "Data Visualization", "Pandas"],
    educationRequirements: ["Bachelor's/Master's in Data Science, Statistics, or Mathematics", "Strong foundation in math and programming"],
    careerOpportunities: ["Analytics Teams", "Finance and Banking", "E-commerce", "Healthcare Data"],
    learningSuggestions: ["Learn Python for data analysis", "Study statistics and probability", "Practice with real datasets", "Build a portfolio of projects"],
    salaryRange: "\u20B94,00,000 - \u20B920,00,000 per year",
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    category: "Artificial Intelligence",
    description:
      "Builds and deploys artificial intelligence models, including machine learning and deep learning systems.",
    requiredSkills: ["Python", "TensorFlow/PyTorch", "Machine Learning", "Deep Learning", "Linear Algebra", "NLP"],
    educationRequirements: ["Bachelor's/Master's in Computer Science, AI, or related", "Strong mathematics background"],
    careerOpportunities: ["AI Research Labs", "Tech Product Companies", "Autonomous Systems", "Robotics"],
    learningSuggestions: ["Complete Python fundamentals", "Study machine learning algorithms", "Build neural network projects", "Deploy models to cloud"],
    salaryRange: "\u20B96,00,000 - \u20B925,00,000 per year",
  },
  {
    id: "civil-engineer",
    title: "Civil Engineer",
    category: "Engineering",
    description:
      "Plans, designs, and supervises construction of infrastructure such as roads, bridges, buildings, and water systems.",
    requiredSkills: ["AutoCAD", "Structural Analysis", "Project Management", "Surveying", "Mathematics"],
    educationRequirements: ["Bachelor's in Civil Engineering", "Licensure as a Professional Engineer (optional)"],
    careerOpportunities: ["Construction Companies", "Government Public Works", "Real Estate Developers", "Consulting Firms"],
    learningSuggestions: ["Learn design software (AutoCAD, Revit)", "Study building codes and standards", "Gain site internship experience", "Work on structural projects"],
    salaryRange: "\u20B92,50,000 - \u20B912,00,000 per year",
  },
  {
    id: "mechanical-engineer",
    title: "Mechanical Engineer",
    category: "Engineering",
    description:
      "Designs, analyzes, and manufactures mechanical systems, machines, and tools across industries.",
    requiredSkills: ["CAD", "Thermodynamics", "Mechanics", "Materials Science", "Manufacturing"],
    educationRequirements: ["Bachelor's in Mechanical Engineering", "Understanding of physics and materials"],
    careerOpportunities: ["Automotive Industry", "Manufacturing Plants", "Aerospace", "Energy Sector"],
    learningSuggestions: ["Learn 3D modeling (SolidWorks, AutoCAD)", "Study mechanics and thermodynamics", "Work on hands-on projects", "Intern at manufacturing units"],
    salaryRange: "\u20B92,50,000 - \u20B912,00,000 per year",
  },
  {
    id: "nurse",
    title: "Registered Nurse",
    category: "Healthcare",
    description:
      "Provides patient care, administers treatments, educates patients, and supports doctors in healthcare settings.",
    requiredSkills: ["Patient Care", "Medical Terminology", "First Aid", "Communication", "Empathy"],
    educationRequirements: ["Diploma or Bachelor's in Nursing (B.Sc Nursing)", "State nursing council registration"],
    careerOpportunities: ["Hospitals", "Clinics", "Nursing Homes", "Home Healthcare"],
    learningSuggestions: ["Complete accredited nursing program", "Obtain clinical practice hours", "Learn patient communication", "Stay updated on healthcare protocols"],
    salaryRange: "\u20B92,00,000 - \u20B98,00,000 per year",
  },
  {
    id: "doctor",
    title: "Doctor (MBBS)",
    category: "Healthcare",
    description:
      "Diagnoses and treats illnesses, injuries, and diseases, providing primary and specialized medical care.",
    requiredSkills: ["Medical Diagnosis", "Patient Communication", "Anatomy", "Pharmacology", "Decision Making"],
    educationRequirements: ["MBBS degree from recognized medical college", "Internship and licensing (MCI/NMC)"],
    careerOpportunities: ["Government Hospitals", "Private Hospitals", "Clinics", "Research Institutions"],
    learningSuggestions: ["Clear NEET entrance exam", "Complete MBBS (5.5 years)", "Pursue specialization (MD/MS)", "Gain clinical experience"],
    salaryRange: "\u20B95,00,000 - \u20B930,00,000+ per year",
  },
  {
    id: "agriculture-officer",
    title: "Agriculture Officer",
    category: "Agriculture",
    description:
      "Supports farmers with modern farming techniques, crop management, soil health, and government agriculture schemes.",
    requiredSkills: ["Crop Science", "Soil Analysis", "Pest Management", "Government Schemes", "Farmer Outreach"],
    educationRequirements: ["Bachelor's in Agriculture or Horticulture", "Knowledge of local farming practices"],
    careerOpportunities: ["State Agriculture Department", "Krishi Vigyan Kendras", "Agri-business Companies", "Cooperative Societies"],
    learningSuggestions: ["Study agronomy and soil science", "Learn about government farm schemes", "Visit farms for practical exposure", "Understand organic farming"],
    salaryRange: "\u20B93,00,000 - \u20B910,00,000 per year",
  },
  {
    id: "government-job",
    title: "Government Jobs (SSC, Banking, Railways)",
    category: "Government Jobs",
    description:
      "Stable public sector roles selected through competitive examinations such as SSC, IBPS, and RRB.",
    requiredSkills: ["General Knowledge", "Quantitative Aptitude", "Reasoning", "English", "Current Affairs"],
    educationRequirements: ["10th/12th pass or Graduate degree (varies by post)", "Preparation for competitive exams"],
    careerOpportunities: ["Staff Selection Commission (SSC)", "Banking (IBPS/SBI)", "Indian Railways", "State Government"],
    learningSuggestions: ["Study previous year question papers", "Practice aptitude and reasoning daily", "Read newspapers for current affairs", "Join a coaching or online test series"],
    salaryRange: "\u20B92,50,000 - \u20B910,00,000 per year",
  },
  {
    id: "teacher",
    title: "School Teacher",
    category: "Teaching",
    description:
      "Educates students in schools, prepares lessons, assesses progress, and supports overall development.",
    requiredSkills: ["Subject Knowledge", "Lesson Planning", "Classroom Management", "Communication", "Patience"],
    educationRequirements: ["Bachelor's degree + B.Ed (Bachelor of Education)", "State teaching eligibility test (TET/CTET)"],
    careerOpportunities: ["Government Schools", "Private Schools", "Coaching Centers", "Online Education"],
    learningSuggestions: ["Complete B.Ed degree", "Clear TET/CTET exam", "Practice teaching (internship)", "Develop communication skills"],
    salaryRange: "\u20B92,50,000 - \u20B98,00,000 per year",
  },
  {
    id: "entrepreneur",
    title: "Entrepreneur / Small Business Owner",
    category: "Entrepreneurship",
    description:
      "Starts and runs their own business, identifies market opportunities, and manages operations and growth.",
    requiredSkills: ["Business Planning", "Sales & Marketing", "Financial Management", "Leadership", "Risk Taking"],
    educationRequirements: ["No fixed requirement; Business degree helpful", "Practical experience and market research"],
    careerOpportunities: ["Startups", "Retail Business", "Service Agencies", "Online Selling"],
    learningSuggestions: ["Start a small pilot project", "Learn basic accounting and marketing", "Study successful business case studies", "Network with other entrepreneurs"],
    salaryRange: "Varies by business",
  },
];

export interface Scholarship {
  id: string;
  name: string;
  type: "Government" | "Merit" | "Need" | "Technical";
  description: string;
  eligibility: string;
  benefits: string;
  applicationInfo: string;
  provider: string;
}

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: "national-means-cum-merit",
    name: "National Means-cum-Merit Scholarship (NMMSS)",
    type: "Merit",
    description:
      "Scholarship for economically weaker meritorious students to reduce dropouts at the secondary stage.",
    eligibility: "Class VIII passed students; parental income not exceeding prescribed limit; studying in government/local body schools.",
    benefits: "\u20B912,000 per year (renewable up to Class XII).",
    applicationInfo: "Apply through the National Scholarship Portal (NSP) with school verification.",
    provider: "Ministry of Education, Government of India",
  },
  {
    id: "post-matric",
    name: "Post-Matric Scholarship for SC/ST/OBC",
    type: "Government",
    description:
      "Government scholarship for students belonging to SC, ST, and OBC categories pursuing post-matric education.",
    eligibility: "Belong to SC/ST/OBC category; family income within specified limits; enrolled in recognized institution.",
    benefits: "Covers tuition fees, maintenance allowance, and other educational expenses.",
    applicationInfo: "Apply via National Scholarship Portal (NSP) or state portals with caste and income certificates.",
    provider: "Ministry of Social Justice and Empowerment",
  },
  {
    id: "merit-cum-means",
    name: "Merit-cum-Means Scholarship for Minorities",
    type: "Need",
    description:
      "Financial assistance for meritorious students from minority communities pursuing professional and technical courses.",
    eligibility: "Minority community student; minimum 50% marks in previous exam; family income below limit.",
    benefits: "Course fee reimbursement and maintenance allowance.",
    applicationInfo: "Apply through National Scholarship Portal (NSP) with minority community certificate.",
    provider: "Ministry of Minority Affairs",
  },
  {
    id: "ai-scte",
    name: "AICTE Pragati Scholarship (Girls)",
    type: "Technical",
    description:
      "Scholarship for girl students pursuing technical education (diploma/degree) in AICTE-approved institutions.",
    eligibility: "Girl student admitted to first year of diploma/degree in AICTE-approved institution; family income limit.",
    benefits: "\u20B950,000 per year for up to 4 years.",
    applicationInfo: "Apply through AICTE portal with admission proof and income certificate.",
    provider: "All India Council for Technical Education (AICTE)",
  },
  {
    id: "inspire",
    name: "INSPIRE Scholarship (SHE)",
    type: "Merit",
    description:
      "Scholarship for students pursuing natural and basic sciences at the undergraduate level.",
    eligibility: "Top 1% in Class XII board examination; enrolled in B.Sc/BS/integrated M.Sc in natural sciences.",
    benefits: "\u20B980,000 per year (scholarship + mentorship).",
    applicationInfo: "Apply online through the INSPIRE portal with mark sheets and admission proof.",
    provider: "Department of Science and Technology (DST)",
  },
];
