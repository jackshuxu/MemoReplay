# 📷 Memolane: Connecting Through Memories

Memolane is an app designed to help people connect through shared memories and assist Alzheimer's patients in recalling events using images from their photo library. By leveraging AI and intuitive design, Memolane fosters meaningful connections and enhances memory retention.

## 🌟 Features

- 🖼️ **Photo-Based Memory Recall** – Uses images to trigger memories and reconnect users with past events.
- 🧠 **Alzheimer’s Support** – Tailored features to help patients with memory loss remember important moments.
- 🔊 **Voice Annotations** – Users can add and listen to personalized voice notes for each photo.
- 🤖 **AI-Assisted Reminders** – AI-generated memory prompts based on metadata and past interactions.
- 🏠 **Family & Friends Sharing** – Securely share memories with loved ones in private groups.
- 🔍 **Smart Search** – AI-powered image recognition to help users find memories quickly.
- 📅 **Timeline View** – Organizes memories chronologically for easy navigation.
- ☁️ **Cloud Sync & Backup** – Securely stores and syncs memories across devices.

## 💻 Technologies Used

- **Frontend:** Next.js (React framework)
- **Backend:** Drizzle
- **Database:** PostgreSQL (relational database)
- **Authentication:** Clerk (optional for secure login/registration)
- **AI Integration:** OpenAI / Google Vision API for image recognition and memory prompts

## 🚀 Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/memolane.git
   ```
2. **Install Dependencies:**
   ```bash
   cd memolane
   npm install
   ```
3. **Create a `.env` File** and fill in the required values:

   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   DATABASE_URL=your_postgres_connection_string

   OPENAI_API_KEY=your_openai_api_key

   AWS_REGION=your_aws_region
   AWS_ACCESS_KEY_ID=your_aws_access_key_id
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   AWS_BUCKET_NAME=your_aws_bucket_name

   NEXT_PUBLIC_APP_URL=your_app_url
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

## 🛠️ Commands

- `dev` – Starts the development server (`npm run dev`).
- `build` – Builds the app for production (`npm run build`).
- `start` – Runs the production server (`npm run start`).
- `lint` – Lints the codebase (`npm run lint`).
- `db:setup` – Initializes the database (`npx drizzle-kit push:pg`).

## 🚀 Deployment on Vercel

1. **Create a Vercel Account** – Sign up at [vercel.com](https://vercel.com/).
2. **Connect GitHub Repository** – Import your project.
3. **Set Environment Variables** – Add `.env` values in Vercel.
4. **Deploy** – Click "Deploy" and Vercel will handle the rest!
