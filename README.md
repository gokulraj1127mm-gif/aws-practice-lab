# AWS Practice Lab — Full-Stack Cloud Learning Platform

> **Comprehensive, production-grade cloud computing simulator and certification training platform.**  
> Built for students, DevOps engineers, and cloud architects to master AWS hands-on without unexpected cloud bills or credit card requirements.

---

## 🌟 Key Platform Capabilities

### 1. 20 Service Quiz Banks with 400 Validated Questions
- **400 Total Questions**: Exactly 20 questions per service across 20 canonical AWS services.
- **Difficulty Distribution**: Exactly 7 Beginner, 7 Intermediate, and 6 Advanced questions per service.
- **Zero Duplicates & Validated Data**: Audited via automated Node.js compliance testing suite (`npm run validate:quizzes`).
- **Practice vs. Timed Exam Modes**: Immediate question feedback in Practice Mode; timed countdown, question flagging, and post-submission analysis in Exam Mode.
- **Topic-Wise Breakdown & Retakes**: Pinpoints weak cloud domains and enables retrying only missed questions.

### 2. Educational AWS Console Simulator
- Realistically mimics the **AWS Management Console** top bar, regional routing, search, and service selection.
- **18+ Simulated Services**: EC2, S3, IAM, VPC, Lambda, RDS, DynamoDB, CloudWatch, CloudTrail, ELB, Auto Scaling, Route 53, CloudFront, ECS/EKS, Elastic Beanstalk, CloudFormation, Systems Manager, AWS Budgets.
- **Interactive Provisioning**: Form modals with strict client-side validation (S3 naming rules, EC2 instance types, IAM policies).
- **Guided Lab Checklists**: Step-by-step verification, security warnings, and estimated real-world cost trade-offs.
- **Zero Cost Guarantee**: Clear visual banner confirming all operations are simulated in local state.

### 3. Interactive Architecture Canvas Builder
- Visual topology editor with drag-and-drop AWS service nodes.
- Canvas controls: Connect services with animated SVG lines (Network vs. Logical dependencies), Zoom in/out, Undo/Redo history, Delete, and Canvas Reset.
- **Predefined Architecture Blueprints**:
  1. *Static Website Hosting (S3 + CloudFront with OAC)*
  2. *Resilient Three-Tier Web App (ALB + EC2 Auto Scaling + RDS Multi-AZ)*
  3. *Serverless REST API (API Gateway + Lambda + DynamoDB)*
- **Deep-Dive Well-Architected Analysis**: Request flow, security boundaries, high-availability, bottlenecks, cost drivers, and official AWS documentation citations.
- **Diagram Persistence**: Save and reload diagrams from browser storage, or export diagram JSON definitions.

### 4. AWS Cost Estimator & Architecture Comparison Engine
- Compares **Architecture A (Traditional IaaS)** vs. **Architecture B (Serverless Native)**.
- **Assumptions-based modeling**: AWS region multipliers, EC2 instance types, operating hours, EBS storage, ALB/NAT Gateway hourly rates, Lambda memory/duration, and DynamoDB RCU/WCU.
- **FinOps Insights**: Highlights idle capacity penalties, high-throughput crossover points, and hidden network data processing fees.
- **Direct Links**: Integrates with official AWS Pricing Calculator (`calculator.aws`).

### 5. AI & Technical Knowledge-Base Tutor
- Structured answers tailored to **Beginner, Intermediate, or Advanced** language depth.
- Common scenario diagnostic playbooks (e.g., S3 403 Forbidden, EC2 Port 22 SSH Timeout, Lambda Cold Starts).
- Transparent engine labeling (**Curated AWS Technical Knowledge Engine**), avoiding fabricated citations or hallucinated URLs.
- Quick prompt buttons and direct links to relevant service quiz exams.

### 6. Cloud Career Roadmaps & Interview Prep
- 5 Complete Specialization Tracks:
  1. **AWS Cloud Engineer**
  2. **AWS DevOps Engineer**
  3. **AWS Cloud Security Engineer**
  4. **AWS Solutions Architect**
  5. **AWS Serverless Developer**
- Each roadmap features prerequisite competencies, ordered 3-phase curriculum timelines, portfolio deliverables, milestone checklist tracking, and scenario-based technical interview questions with model architectural answers.

### 7. Secure Admin Dashboard
- **Backend Gated**: Authorization enforced server-side using JWT and `adminOnly` Express middleware.
- **User Governance**: Search, filter, and toggle user roles between `student` and `admin`.
- **Metrics**: Real-time stats on registered users, active quiz questions, and lab completions.
- **Quiz Importer/Exporter**: Validate JSON quiz banks against schema rules before importing.

### 8. Accessible Light / Dark / System Theme System
- Accessible theme selector in the navigation bar.
- Persistent user preference stored in `localStorage`.
- Zero-flash blocking initialization script in `index.html`.
- Semantic CSS overrides ensuring high contrast in both themes.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v3.4, Lucide React icons, React Hot Toast, Axios |
| **Backend** | Node.js, Express 5, Mongoose ODM, JSON Web Tokens (JWT), Bcrypt.js, CORS |
| **Database** | MongoDB (`mongodb://localhost:27017/aws-practice-lab`) |
| **Environment** | Windows 11, PowerShell, VS Code |

---

## 🚀 Exact Startup & Setup Commands (PowerShell)

### Prerequisites
- Node.js (v18+ or v20+ recommended)
- MongoDB running locally at `mongodb://localhost:27017`

### Step 1: Backend Setup
```powershell
# Open terminal and navigate to backend directory
cd D:\Projects\Aws\aws-practice-lab\backend

# Install dependencies (if not already installed)
npm install

# Start backend server (runs on http://localhost:5000)
npm start
```

### Step 2: Frontend Setup
```powershell
# Open a second PowerShell terminal and navigate to frontend directory
cd D:\Projects\Aws\aws-practice-lab\frontend

# Install dependencies (if not already installed)
npm install

# Start frontend Vite development server (runs on http://localhost:5173)
npm run dev
```

### Step 3: Run the 400-Question Quiz Validation Suite
```powershell
cd D:\Projects\Aws\aws-practice-lab\frontend
npm run validate:quizzes
```

---

## ⚙️ Environment Variables Configuration

Create a `.env` file inside `backend/.env` (never commit secrets to version control):

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/aws-practice-lab
JWT_SECRET=super_secret_jwt_key_aws_practice_lab_2026_secure
JWT_EXPIRE=30d

# Optional AI Provider (Tutor falls back to local knowledge engine if omitted)
GEMINI_API_KEY=your_optional_api_key_here
```

---

## 🔐 Administrator Account Setup

To test the **Admin Portal** (`/api/admin`), you can promote any registered user or register an admin:

1. **Option A (Via MongoDB Shell)**:
   ```javascript
   use aws-practice-lab
   db.users.updateOne({ email: "your-email@domain.com" }, { $set: { role: "admin" } })
   ```

2. **Option B (Using the In-App Demo)**:
   - Click "Sign In" in the navigation bar.
   - Enter `admin@aws-practice-lab.internal` or sign in with your account.
   - If the account role is `admin`, the Admin Dashboard tab automatically unlocks all privileged management controls.

---

## 🧪 Testing and Acceptance Results

| Test Area | Criteria | Verified Result |
|---|---|---|
| **Quiz Bank Count** | Exactly 20 services, 20 questions each | **400 / 400 (100% Passed)** |
| **Difficulty Balance** | 7 Beginner, 7 Intermediate, 6 Advanced per service | **140 Beg / 140 Int / 120 Adv (100% Passed)** |
| **Duplicate Check** | Zero normalized duplicate questions | **0 Duplicates (100% Passed)** |
| **Frontend Production Build** | `npm run build` | **0 Errors, Built successfully** |
| **Backend Route Syntax** | `node -c server.js` | **0 Syntax Errors, Verified clean** |
| **Theme System** | Light, Dark, and System preference with anti-flash | **Verified with CSS semantic tokens** |
| **Access Control** | Admin endpoints rejected for standard students | **403 Forbidden enforced via middleware** |

---

## 📄 License & Disclaimer
This project is an independent educational learning platform and is **not affiliated with, sponsored by, or endorsed by Amazon Web Services, Inc. (AWS)**. All trademarks and registered trademarks are the property of their respective owners.
