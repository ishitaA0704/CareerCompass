# CareerCompass AI

> **Know where you stand. Know what to do next.**

CareerCompass AI is an **explainable, fairness-aware career and recruitment platform** designed to help candidates understand their readiness for a target role while helping recruiters evaluate applicants using **job-relevant, identity-blind signals**.

Unlike traditional AI hiring systems that produce unexplained scores, CareerCompass focuses on one core principle:

### **A score is useful only when people can understand the evidence behind it.**

---

## 🚀 Overview

CareerCompass AI connects the entire career-readiness and recruitment journey:

```text
                 CANDIDATE
                     │
                     ▼
              Target Role
                     │
                     ▼
              Readiness Assessment
                     │
                     ▼
               Skill Gap Analysis
                     │
                     ▼
             Personalized Roadmap
                     │
                     ▼
              AI Mock Interview
                     │
                     ▼
                Improvement
                     │
                     ▼
                Reassessment
```

For recruiters:

```text
                Applicants
                    │
                    ▼
             Identity-Blind Data
                    │
                    ▼
             Candidate Ranking
                    │
                    ▼
          Explainable Evaluation
                    │
                    ▼
              Fairness Audit
                    │
             ┌──────┴──────┐
             ▼             ▼
        No Concern     Review Flag
                           │
                           ▼
                     Human Review
```

---

# 🎯 Problem

Modern recruitment has two major problems.

### For candidates

Candidates often don't know:

* Whether they are actually ready for a specific role
* Which skills are preventing them from being competitive
* Why their profile may be weaker than other applicants
* What they should learn next
* How to objectively improve their interview performance

Most career platforms provide generic advice rather than a **role-specific improvement path**.

### For recruiters

Recruiters face:

* Large applicant pools
* Time-consuming screening
* Difficulty comparing candidates consistently
* Potential bias in evaluation
* AI systems that provide scores without meaningful explanations

A black-box score is not enough for a high-stakes hiring decision.

---

# 💡 Solution

CareerCompass AI provides a single platform where:

### Candidates can

* Select a target role
* Assess their career readiness
* Understand the evidence behind their score
* Compare their anonymous standing within an applicant cohort
* Identify high-priority skill gaps
* Follow a personalized four-week roadmap
* Practice through adaptive mock interviews
* Track improvement over time

### Recruiters can

* Analyze applicant pipelines
* View anonymized candidate rankings
* Compare candidates using job-relevant signals
* Understand the evidence behind candidate scores
* Run fairness-audit simulations
* Identify potential evaluation disparities
* Send flagged cases for human review

The platform is designed around **AI-assisted decision making rather than AI replacing human judgment**.

---

# ⭐ Key Features

## 1. Explainable Readiness Score

Candidates receive an overall readiness score for their selected role.

Instead of simply displaying:

```text
78%
```

CareerCompass explains **why**.

Example:

### Why 78%?

**Strengths**

* Strong Python experience
* Strong SQL fundamentals
* Relevant academic projects

**Limitations**

* Limited production experience
* Weak system-design exposure
* Limited cloud deployment experience

Every major score is therefore connected to evidence, limitations, or an actionable next step.

---

## 2. Identity-Blind Candidate Evaluation

The recruiter ranking interface focuses on **job-relevant signals**.

Candidate rankings use anonymized identifiers such as:

```text
C-1048
C-1082
C-1134
```

The ranking interface intentionally excludes identity-related information such as:

* Name
* Gender
* College
* Email
* Other unnecessary identity fields

This helps keep evaluation focused on relevant qualifications.

---

## 3. Deterministic Candidate Ranking

The current prototype uses a transparent weighted ranking model:

```text
Overall Match =
    50% Readiness Score
  + 30% Skill Relevance
  + 20% Project Experience
```

The ranking process:

1. Select candidates for the requested role
2. Calculate overall match
3. Sort candidates by overall match
4. Resolve ties using skill relevance and project experience
5. Assign candidate ranks
6. Calculate percentile and cohort bracket

This makes the ranking logic transparent and reproducible.

---

## 4. Anonymous Peer Benchmarking

Candidates can see their relative position within an applicant cohort without seeing other candidates' identities.

Example:

```text
Rank       #14
Applicants 128
Percentile 89th
Bracket    Top 15%
```

Candidates can also see:

* Pool median
* Anonymous score distribution
* Relative competitiveness
* Which skill gap could most improve their position

The goal is to turn ranking into an **actionable improvement signal**, rather than simply telling someone that they ranked 14th.

---

## 5. Skill Gap Analysis

CareerCompass compares:

```text
YOUR LEVEL        vs        ROLE REQUIREMENT
```

Example:

```text
System Design

Your level:       40%
Required level:   80%

Gap:              40 points
Priority:         HIGH
```

The system identifies strengths and prioritizes the skills that would have the greatest impact on role readiness.

---

## 6. Personalized Career Roadmap

Identified gaps are converted into a practical four-week roadmap.

Example:

### Week 1

* REST APIs
* HTTP fundamentals
* Authentication

### Week 2

* Database architecture
* SQL optimization

### Week 3

* System design
* Scalability

### Week 4

* Mock interviews
* Final assessment

The roadmap is designed to turn abstract "skill gaps" into **specific actions and proof points**.

---

## 7. Adaptive Mock Interviews

CareerCompass includes an interactive mock interview.

Instead of simply asking a fixed list of questions, the interview can adapt its follow-up questions based on the candidate's response.

The current evaluation model analyzes:

### Structure

Does the response have a clear sequence, context, decision, and conclusion?

### Relevance

Does the answer connect to role-related engineering and production concepts?

### Depth

Does the response include metrics, trade-offs, failure modes, decisions, or lessons learned?

The evaluator returns:

* Overall score
* Dimension scores
* Feedback tags
* Written guidance

The current implementation uses a deterministic rubric as an **explainable prototype**, rather than presenting it as a replacement for a trained interviewer.

---

## 8. Fairness & Bias Audit

CareerCompass includes a fairness-audit concept designed to identify potential disparities in candidate evaluation.

The recruiter can inspect:

* Cohort score distributions
* Potential disparity indicators
* Counterfactual identity-swap testing
* Human-review recommendations

Example:

```text
⚠ Potential disparity detected

Candidates in this group received
systematically lower screening scores.

Recommended action:
Human review
```

Importantly, CareerCompass does **not** claim that an AI system is "100% unbiased."

Instead, the system:

```text
Detect
  ↓
Explain
  ↓
Flag
  ↓
Human Review
  ↓
Accountable Decision
```

---

## 9. Human-in-the-Loop Recruitment

When a potential fairness issue is detected, CareerCompass recommends human review.

Recruiters can:

* Review evidence
* Compare candidates
* Override a recommendation
* Shortlist
* Reject
* Continue review
* Mark a case as reviewed

The goal is to ensure that AI assists recruitment rather than becoming an unaccountable decision maker.

---

# 🖥️ Application Pages

## Public

| Route | Purpose              |
| ----- | -------------------- |
| `/`   | Product landing page |

## Candidate

| Route                   | Purpose                                               |
| ----------------------- | ----------------------------------------------------- |
| `/candidate/onboarding` | Target role, experience, resume and skill calibration |
| `/candidate/dashboard`  | Readiness score and explanations                      |
| `/candidate/ranking`    | Anonymous cohort ranking                              |
| `/candidate/gaps`       | Skill-gap analysis                                    |
| `/candidate/roadmap`    | Personalized four-week roadmap                        |
| `/candidate/interview`  | Interactive mock interview                            |

## Recruiter

| Route                  | Purpose                          |
| ---------------------- | -------------------------------- |
| `/recruiter/dashboard` | Hiring pipeline and analytics    |
| `/recruiter/ranking`   | Anonymized candidate leaderboard |
| `/recruiter/fairness`  | Fairness and bias audit          |
| `/recruiter/review`    | Human-review workflow            |

The candidate and recruiter experiences have separate navigation while a persistent role toggle allows movement between the two demo experiences.

---

# 🏗️ Architecture

```text
careercompass-ai/
│
├── client/
│   ├── index.html
│   └── src/
│       ├── App.tsx
│       ├── index.css
│       ├── components/
│       │   ├── AppShell.tsx
│       │   ├── DashboardLayout.tsx
│       │   └── ui/
│       ├── contexts/
│       ├── lib/
│       │   └── trpc.ts
│       └── pages/
│           ├── Home.tsx
│           ├── CandidateOnboarding.tsx
│           ├── CandidateDashboard.tsx
│           ├── CandidateRanking.tsx
│           ├── CandidateGaps.tsx
│           ├── CandidateRoadmap.tsx
│           ├── CandidateInterview.tsx
│           ├── RecruiterDashboard.tsx
│           ├── RecruiterRanking.tsx
│           └── RecruiterFairness.tsx
│
├── server/
│   ├── routers.ts
│   ├── db.ts
│   └── _core/
│
├── drizzle/
│   ├── schema.ts
│   └── migrations/
│
├── shared/
│
├── package.json
├── pnpm-lock.yaml
├── vite.config.ts
└── tsconfig.json
```

---

# 🛠️ Tech Stack

| Layer           | Technology                            |
| --------------- | ------------------------------------- |
| Frontend        | React 19                              |
| Language        | TypeScript                            |
| Build Tool      | Vite                                  |
| Routing         | Wouter                                |
| Styling         | Tailwind CSS 4 + Custom CSS           |
| Components      | shadcn/ui-style components + Radix UI |
| Icons           | Lucide React                          |
| Charts          | Recharts                              |
| Server          | Express 4                             |
| API             | tRPC 11                               |
| Validation      | Zod                                   |
| ORM             | Drizzle ORM                           |
| Database Driver | MySQL2                                |
| Authentication  | Manus OAuth / Session Framework       |
| Storage         | AWS S3 SDK helpers                    |
| Testing         | Vitest                                |
| Server Bundling | esbuild                               |

---

# 🔌 API Architecture

The application uses typed tRPC procedures under:

```text
/api/trpc
```

Current procedures include:

### `auth.me`

Retrieves the current authenticated user.

### `auth.logout`

Clears the current session cookie.

### `interview.evaluate`

Evaluates a candidate's interview response using the deterministic interview rubric.

### `ranking.leaderboard`

Returns:

* Role-filtered candidate rankings
* Scoring weights
* Cohort metadata
* Anonymized ranked candidates

Example conceptual input:

```ts
{
  role: "Backend Engineer"
}
```

---

# 📊 Current Demo Logic

The current implementation is intentionally designed as a **functional product prototype**.

Some capabilities use deterministic/demo data rather than production AI models.

### Resume processing

Resume processing is currently represented through onboarding and anonymization UI.

### Candidate ranking

Ranking is generated deterministically using:

```text
50% Readiness
30% Skill Relevance
20% Project Experience
```

### Interview evaluation

Interview responses are evaluated using an explainable rubric based on response characteristics such as:

* Structure
* Relevance
* Depth

### Fairness auditing

The fairness interface demonstrates:

* Cohort distributions
* Disparity warnings
* Counterfactual testing concepts
* Human-review workflows

This makes the prototype immediately understandable without requiring external model credentials.

---

# 🚀 Getting Started

## Prerequisites

Make sure you have:

* Node.js
* pnpm

installed.

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd careercompass-ai
```

Install dependencies:

```bash
pnpm install
```

---

## Development

Start the development server:

```bash
pnpm dev
```

---

# 🧪 Testing

Run TypeScript validation:

```bash
pnpm check
```

Run the test suite:

```bash
pnpm test
```

Build the application:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

Format the project:

```bash
pnpm format
```

Push Drizzle database changes:

```bash
pnpm db:push
```

Recommended verification sequence:

```bash
pnpm check
pnpm test
pnpm build
```

---

# 🔐 Demo Personas

The prototype includes two demo personas:

| Persona     | View      |
| ----------- | --------- |
| Alex Morgan | Candidate |
| Sam Rivera  | Recruiter |

The role switcher is intended for product demonstration.

In a production deployment, authorization should be enforced server-side rather than relying on a client-side role toggle.

---

# 🧠 Design Principles

## Explainability

Important scores should never exist as unexplained numbers.

Every score should provide:

```text
Score
 ↓
Evidence
 ↓
Limitations
 ↓
Recommended Action
```

---

## Fairness by Construction

The recruiter experience emphasizes:

* Identity-blind evaluation
* Job-relevant signals
* Counterfactual testing
* Cohort-level monitoring
* Human review

---

## Candidate Growth

CareerCompass doesn't stop after evaluation.

The platform connects:

```text
Assessment
    ↓
Skill Gaps
    ↓
Roadmap
    ↓
Interview Practice
    ↓
Improvement
```

This makes the platform a continuous career-development tool rather than a one-time screening system.

---

## Human Oversight

AI provides analysis and recommendations.

Humans remain accountable for consequential recruitment decisions.

```text
AI Recommendation ≠ Final Decision
```

---

# 🔮 Future Roadmap

A production version of CareerCompass AI could introduce:

### AI & Assessment

* LLM-powered resume analysis
* Real-time adaptive interviewing
* Voice-based interviews
* More sophisticated skill inference
* Role-specific assessment generation

### Recruitment

* Persistent job requisitions
* Candidate profiles
* Applicant tracking
* Interview scheduling
* Recruiter collaboration
* Interviewer feedback aggregation

### Fairness

* Automated fairness metrics
* Model calibration monitoring
* Bias testing across multiple stages
* Audit logs
* Model/version tracking
* Counterfactual evaluation pipelines

### Security & Infrastructure

* Secure resume/document upload
* Automated PII redaction
* Server-side role authorization
* Encrypted storage
* Audit events
* Production database persistence

---

# ⚠️ Current Limitations

CareerCompass AI is currently a **functional product prototype**, not a production hiring system.

Current limitations include:

* Demo/deterministic candidate data
* Simulated resume processing
* Deterministic interview evaluation
* Demonstration-level fairness analysis
* Demo role switching
* Limited persistence compared with a production recruitment platform

These boundaries are intentional so that the prototype can clearly demonstrate the product concept and interaction model.

---

# 🌱 Production Vision

A production implementation should persist:

* Job requisitions
* Candidate profiles
* Skill evidence
* Assessment results
* Review decisions
* Audit events

It should also introduce:

* Secure document processing
* PII redaction before feature extraction
* Server-side authorization
* Model and scoring versioning
* Calibration monitoring
* Fairness monitoring
* Comprehensive auditability

---

# 🏆 Why CareerCompass AI?

Traditional recruitment systems often answer:

> **"Who scored highest?"**

CareerCompass aims to answer three better questions:

### For candidates

> **"How ready am I, why, and what should I do next?"**

### For recruiters

> **"Why does this candidate rank here?"**

### For organizations

> **"Can we make this decision more transparently and responsibly?"**

CareerCompass AI brings **readiness, explainability, continuous improvement, fairness, and human oversight** into a single career intelligence platform.

---

## 📄 License

This project is licensed under the **MIT License**, unless the surrounding project or deployment environment specifies a different distribution policy.
