# Flourish - Mental Health Assistance Platform

A comprehensive web-based mental health platform designed to improve counseling services and psychological support for students in Bangladesh. The platform facilitates seamless communication between students, counselors, and administrators while providing structured assessment tools and session management.

## 🎯 Project Overview

Flourish is a full-stack mental health assistance application that connects students with qualified counselors through a structured digital platform. The system provides:

- **Student Registration & Assessment**: Comprehensive registration forms and psychological questionnaires
- **Counselor Management**: Professional counselor profiles and session scheduling
- **Administrative Oversight**: Admin dashboard for managing counselors, questionnaires, and session requests
- **Questionnaire System**: Dynamic psychological assessment tools with customizable questions and scoring
- **Session Tracking**: Complete workflow from initial registration to counseling session completion

## 🏗️ Architecture

### Backend (Django REST API)
- **Framework**: Django 4.2.5 with Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: Token-based authentication
- **Deployment**: Configured for production with Gunicorn and Whitenoise
- **API Endpoint**: `https://flourish.onrender.com/`

### Frontend (React TypeScript)
- **Framework**: React 18.2.0 with TypeScript 5.2.2
- **UI Library**: Chakra UI 2.8.0 for component design
- **State Management**: Redux Toolkit with Redux Persist
- **Routing**: React Router DOM 6.15.0
- **Animations**: Framer Motion 10.16.4
- **Forms**: React Hook Form 7.45.4 with validation
- **HTTP Client**: Axios 1.5.0

## 📊 Database Schema

### Core Models
- **User Roles**: Client (Students), Counselor, AdminCounselor
- **RegistrationForm**: Student intake forms with personal details and problem descriptions
- **Questionnaire**: Dynamic psychological assessment tools
- **QuestionnaireField**: Individual questions within questionnaires
- **FilledQuestionnaire**: Completed assessments with responses and scoring

## 🚀 Features

### For Students (Clients)
- User registration and authentication
- Personal information and problem description forms
- Access to assigned psychological questionnaires
- Session request and scheduling
- Progress tracking and history viewing

### For Counselors
- Professional registration and profile management
- View assigned student cases and registration forms
- Access filled questionnaires and assessment results
- Session scheduling and management
- Case notes and progress tracking

### For Administrators
- Complete system oversight and user management
- Create and manage psychological questionnaires
- Assign counselors to student cases
- Monitor session requests and approvals
- Generate reports and analytics

### Counseling Services Offered
- **Individual Psychotherapy**: One-on-one counseling sessions
- **Group Therapy**: Structured group counseling sessions
- **Relaxation Training**: Stress management and relaxation techniques
- **Social Skill Training**: Interpersonal skills development

## 🛠️ Technology Stack

### Backend Dependencies
```
Django==4.2.5
djangorestframework
django-cors-headers
python-dotenv
gunicorn
whitenoise
brotli
psycopg2-binary
```

### Frontend Dependencies
```json
{
  "@chakra-ui/react": "^2.8.0",
  "@reduxjs/toolkit": "^1.9.5",
  "react": "^18.2.0",
  "react-router-dom": "^6.15.0",
  "axios": "^1.5.0",
  "framer-motion": "^10.16.4",
  "react-hook-form": "^7.45.4",
  "typescript": "^5.2.2"
}
```

## 📁 Project Structure

```
flourish/
├── flourish-api/              # Django Backend
│   ├── flourish/             # Project settings
│   ├── client/               # Student user management
│   ├── counselor/            # Counselor management
│   ├── adminCounselor/       # Administrator management
│   ├── questionnaire/        # Assessment tools
│   ├── registrationForm/     # Student intake forms
│   ├── requirements.txt      # Python dependencies
│   └── manage.py            # Django management
│
├── flourish-client/          # React Frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Route-based page components
│   │   ├── store/           # Redux state management
│   │   ├── api/             # API integration layer
│   │   ├── types/           # TypeScript type definitions
│   │   ├── theme/           # Chakra UI theme configuration
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   ├── package.json         # Node.js dependencies
│   └── tsconfig.json        # TypeScript configuration
│
└── README.md                # Project documentation
```

## 🔧 Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL
- Git

### Backend Setup
```bash
cd flourish-api
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend Setup
```bash
cd flourish-client
yarn install
yarn start
```

### Environment Variables
Create `.env` file in `flourish-api/`:
```
SECRET_KEY=your_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=your_db_name
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
```

## 🎨 User Interface

The application features a modern, responsive design with:
- Clean, intuitive navigation with role-based dashboards
- Accessible form design with comprehensive validation
- Smooth animations and transitions using Framer Motion
- Consistent design system powered by Chakra UI
- Mobile-responsive layout for all devices

## 🔐 Security Features

- Token-based authentication for secure API access
- Role-based access control (RBAC) for different user types
- CORS configuration for secure cross-origin requests
- Input validation and sanitization
- Secure password handling with Django's built-in features

## 🤝 Contributing

This project aims to improve mental health services for students in Bangladesh. Contributions are welcome for:
- Enhanced questionnaire features
- Improved user experience
- Additional counseling tools
- Accessibility improvements
- Documentation updates

## 📝 License

This project is focused on providing mental health assistance and is intended for educational and humanitarian purposes.

## 🎯 Mission

Flourish is dedicated to making mental health support more accessible and effective for students in Bangladesh, providing a bridge between those seeking help and qualified mental health professionals.
