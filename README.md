# 📚 University Library Management System

## 🤖 Introduction

A production-grade, full-stack library management solution built with Next.js 15. This system transitions beyond simple CRUD operations to include automated workflows, DDoS protection, and high-performance caching. It is designed to handle student onboarding, book borrowing, and multimedia asset management at scale.

## ⚙️ Tech Stack

### Frontend

*   **Framework:** Next.js 15 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS, ShadCN
*   **State & Forms:** React Hook Form, Zod
*   **Asset Management:** ImageKit (Multimedia Uploads)

### Backend & Services

*   **Database:** Neon (Serverless PostgreSQL)
*   **ORM:** Drizzle ORM
*   **Caching & Rate Limiting:** Upstash (Redis)
*   **Authentication:** Auth.js (NextAuth)
*   **Workflows:** Upstash Workflow (Automated Emails/Notifications)

## 🔋 Features

*   **Advanced Auth & Onboarding:** Secure user registration with automated welcome emails and onboarding flows via Upstash Workflows.
*   **Admin Dashboard:** A comprehensive interface for librarians to manage book inventories, track borrowing trends, and update records.
*   **Smart Borrowing:** Real-time availability checks with database transactions to prevent over-borrowing.
*   **Optimized Performance:** Redis caching for frequently accessed data and optimized PostgreSQL queries for large book catalogs.
*   **Security Suite:** Built-in rate limiting to prevent API abuse and DDoS protection layers.
*   **Multimedia Handling:** High-performance image and file uploads with transformations using ImageKit.

## 🤸 Installation

### Prerequisites

*   Node.js (v20+)
*   Neon Account (PostgreSQL)
*   Upstash Account (Redis & QStash)
*   ImageKit Account

### Step-by-Step Setup

1.  **Clone & Install**

    ```bash
    git clone https://github.com/DeveloperThierry/library.git
    cd library
    npm install
    ```

2.  **Environment Variables**

    Create a `.env.local` file:

    ```
    # NEXT
    NEXT_PUBLIC_SITE_URL=http://localhost:3000

    # AUTH
    AUTH_SECRET=

    # DATABASE (Neon)
    DATABASE_URL=

    # IMAGEKIT
    NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
    IMAGEKIT_PRIVATE_KEY=
    NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=

    # UPSTASH (Redis & Workflow)
    UPSTASH_REDIS_REST_URL=
    UPSTASH_REDIS_REST_TOKEN=
    QSTASH_TOKEN=
    ```

3.  **Database Migration**

    ```bash
    npx drizzle-kit push
    npm run seed # To populate initial book data
    ```

4.  **Run Development Server**

    ```bash
    npm run dev
    ```

## 🚀 Usage

*   **User Side:** Register as a student, browse the catalog, and "borrow" books to see the real-time status updates.
*   **Admin Side:** Access `/admin` to use the Book Form (featuring the custom color picker and ImageKit uploader) to add new inventory.
*   **Workflows:** Check the Upstash console to monitor automated email triggers when a new user signs up.

## 📜 License

This project is licensed under the MIT License.
