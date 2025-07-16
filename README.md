# TruthLens - AI-Powered Fact Checker

## 🎯 What is TruthLens?

TruthLens is a simple, powerful AI-powered fact-checking tool. Enter any claim and get instant verification with:
- ✅ **True/False/Mixed verdicts**
- ✅ **Confidence scores (0-100%)**
- ✅ **Detailed explanations**
- ✅ **Verified source attribution**

## 🚀 Quick Start (Windows)
```bash
# Double-click this file or run in PowerShell:
./setup-dev.bat
```

## 🚀 Quick Start (Mac/Linux)
```bash
chmod +x setup-dev.sh
./setup-dev.sh
```

## 🔧 Manual Setup
```bash
npm install
npm run dev
```

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run setup` - Install dependencies and start dev server
- `npm run reset` - Reset all dependencies and reinstall
- `npm run check` - Check project status and dependencies

## 🤖 AI Integration

### Current Status: Enhanced Demo Mode
TruthLens is ready for OpenAI GPT-4 integration! To activate real AI fact-checking:

1. **Get OpenAI API Key**:
   - Go to https://platform.openai.com/api-keys
   - Create a new API key
   - Copy the key (starts with 'sk-')

2. **Add Your API Key** to `.env.local`:
   ```
   OPENAI_API_KEY=sk-your-actual-openai-api-key-here
   ```

3. **Restart Development Server**:
   ```bash
   npm run dev
   ```

### What TruthLens Does:
- **Fact Verification**: GPT-4 analyzes any claim for accuracy
- **Source Attribution**: Provides credible sources for verification
- **Confidence Scoring**: Shows how certain the AI is about its verdict

### Features:
- ✅ **Instant fact-checking** using GPT-4
- ✅ **True/False/Mixed/Unverified** verdicts
- ✅ **Confidence scores** (0-100%)
- ✅ **Detailed explanations** of the verdict
- ✅ **Verified source attribution**

## 🛠️ Troubleshooting

### If you get "package.json not found":
1. Make sure you're in the project directory
2. Run `npm run check` to verify location
3. Use the setup scripts provided

### If dependencies fail:
```bash
npm run reset
```

## 🌟 Simple & Focused
TruthLens does one thing really well: **fact-checking**. No complex features, just reliable AI-powered verification of any claim you want to check.

Perfect for journalists, researchers, students, or anyone who wants to verify information quickly and reliably.