# 🤖 next-chatui

A modern, responsive chat interface built with Next.js 15, TypeScript, Tailwind CSS, and Supabase authentication.

## 📸 Screenshots

![Chat Interface](docs/images/screenshot.png)

## ✨ Features

- 💬 Real-time chat interface with AI
- 🔒 User authentication with Supabase
- 📝 User registration and login
- 🎨 Clean and responsive design
- 🌙 Dark mode UI
- 📜 Message history
- 📲 Smooth scrolling to latest messages
- ⚡ Loading states and error handling
- 📝 TypeScript support

## 📋 Prerequisites

- 📦 Node.js (v18 or higher)
- 📦 PNPM package manager
- 🔑 API key for your chosen LLM provider
- 🗄️ Supabase account and project

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# LLM Provider Configuration
API_KEY=your_api_key_here
MODEL_NAME=your_model_name

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🚀 Installation

1. Clone the repository:

   ```bash
   git clone [your-repo-url]
   cd [your-repo-name]
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. For development:

   ```bash
   pnpm dev
   ```

4. For production:

   ```bash
   pnpm run build
   pnpm run start
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```plaintext
src/
├── app/
│   ├── api/
│   │   └── chat/        # API endpoint for chat
│   ├── components/
│   │   └── chat/        # Chat UI components
│   ├── login/           # Login page
│   ├── signup/          # Signup page
│   └── page.tsx         # Main chat interface
├── lib/
│   └── supabaseClient.ts # Supabase client configuration
└── types/
    └── chat.ts          # TypeScript definitions
```

## 🛠️ Technology Stack

- ⚛️ [Next.js](https://nextjs.org/) - React framework
- 📘 [TypeScript](https://www.typescriptlang.org/) - Type safety
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - Styling
- 🔒 [Supabase](https://supabase.com/) - Authentication & Backend
- 🤖 [Google AI](https://ai.google.dev/) - Chat API

## 🔒 Authentication Features

- User registration with email and password
- Secure login system
- Protected routes with middleware
- Automatic session management
- Logout functionality

## 💻 Development

- 🏃‍♂️ Development server: `pnpm dev`
- 🏗️ Build for production: `pnpm run build`
- 🚀 Start production server: `pnpm run start`
- ✨ Lint code: `pnpm run lint`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Bug Reports

If you find any bugs, please create an issue in the GitHub repository.

## 💡 Feature Requests

Have ideas for new features? Feel free to open an issue to discuss them!
