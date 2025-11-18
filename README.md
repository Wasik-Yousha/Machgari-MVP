# 🐟 মাছগাড়ি (Machgari) - Digital Fish Market Platform

> **Live Demo**: [https://machgari-mvp.vercel.app](https://machgari-mvp.vercel.app)

📖 **Code available for viewing and learning** • All Rights Reserved • [Contact for licensing](mailto:24engineers.tech@gmail.com)

[![Deploy Status](https://img.shields.io/badge/deploy-success-brightgreen)](https://machgari-mvp.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![License](https://img.shields.io/badge/license-All%20Rights%20Reserved-red)](LICENSE)

---

## About Machgari

**Machgari** is Bangladesh's first integrated digital fish transport and market management platform. We're revolutionizing the traditional fish market by connecting **fishermen (জেলে)**, **wholesalers (আড়তদার)**, and **government regulators** in a transparent, efficient digital ecosystem.

### 🎯 Our Mission
To eliminate middlemen, ensure fair pricing for fishermen, enable transparent market operations, and empower government oversight—all while preserving the traditional relationships that make Bangladesh's fish markets unique.

---

## Key Features

### 👨‍🌾 For Fishermen (জেলে)

- **Easy Fish Upload**: Capture fish photos with mobile camera, add quantity and quality details
- **Fair Price Guarantee**: Get minimum base prices set by government + real-time market rates
- **Direct Wholesaler Connection**: View all nearby wholesalers, compare offers, choose the best deal
- **Sales Record Keeping**: Digital record of every transaction with monthly/yearly income tracking
- **Market Price Analysis**: See price trends, know the best time to sell
- **Secure Transactions**: Complete digital payment system with instant money transfer
- **🤖AI Super Assistant - 24/7**: Government-approved AI advisor providing:
  - Fishing advice (when, where, how to fish)
  - Price guidance (what should be the right price)
  - Weather information (sea/river conditions)
  - Business tips (how to increase income)
  - Fish health (disease detection & solutions)
  - Training & education (modern fishing methods)
  - **Voice command support** - just speak, AI answers!

### 🏪For Wholesalers (আড়তদার)

- **Fish Inventory Browser**: View available fish from all fishermen in your area
- **Price Management**: Set competitive wholesale prices (within regulatory limits)
- **Transaction Tracking**: Monitor all purchases from offer to delivery
- **Business Analytics**: Daily, weekly, monthly sales reports with profit analysis
- **Inventory Management**: Track stock levels and freshness timelines
- **Location-Based Services**: Find nearby fishermen, calculate transport costs

### 🏛️ For Government Officials

- **Real-Time Market Monitoring**: Live dashboard of entire fish market nationwide
- **Price Control System**: Set base prices and max/min price limits
- **Detailed Report Generation**: Regional, species-based, time-based analytics
- **Stakeholder Management**: View all fishermen and wholesalers, manage licenses
- **Trend Analysis**: Seasonal production trends, price patterns, forecasting
- **Quality Control**: Monitor food safety standards and product quality

### 🤖 General AI Assistant (For Everyone)

An open-access, completely **free** smart AI assistant that can answer any question instantly:

**Key Features:**
- Natural conversation in Bengali & English
- Multilingual support (understands regional dialects)
- Instant detailed answers
- Vast knowledge base (fish industry, markets, prices, farming methods)
- Personalized advice

**What You Can Ask:**
- Fish-related information
- Market & price data
- Fish farming methods
- Business advice
- Government policies & licenses
- Weather & environment
- Technology & equipment
- Education & training

---

## 🎨 Design Highlights

- **Brand Colors**: Orange (#FF6B35) & Blue (#1D7AA2) - representing sunset on water
- **Dark Mode**: Full dark mode support for comfortable viewing
- **Mobile-First**: Optimized for smartphones (primary device for fishermen)
- **Bengali Interface**: Complete Bangla UI with Hind Siliguri font
- **Accessible**: WCAG compliant with proper color contrast
- **Fast**: Optimized performance with Next.js 15
- **Offline-Ready**: Works with localStorage for MVP demos

---

## Technology Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15 with App Router |
| **Frontend** | React 19, TypeScript |
| **Styling** | Tailwind CSS 3.4 |
| **UI Components** | Shadcn/UI + Radix UI |
| **State Management** | React Context API |
| **Charts** | Recharts 2.15 |
| **Icons** | Lucide React |
| **Forms** | React Hook Form + Zod |
| **Theme** | next-themes (dark mode) |
| **Storage** | LocalStorage (MVP) |
| **Deployment** | Vercel |
| **Package Manager** | pnpm |

---

## Getting Started

### Prerequisites
- Node.js 18.0 or higher
- pnpm, npm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Wasik-Yousha/Machgari-MVP.git

# Navigate to project directory
cd Machgari-MVP

# Install dependencies
pnpm install
# or: npm install

# Run development server
pnpm dev
# or: npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

### Build for Production

```bash
# Create optimized production build
pnpm build

# Start production server
pnpm start
```

---

## Demo & Testing

### 🌐 Live Demo
**Visit**: [https://machgari-mvp.vercel.app](https://machgari-mvp.vercel.app)

### 📋 Test Routes

| Role | Path | Features to Explore |
|------|------|---------------------|
| **Fisherman (জেলে)** | `/Jele` | Upload fish, view market prices, AI assistant |
| **Wholesaler (আড়তদার)** | `/arotdar` | Browse inventory, manage prices, track transactions |
| **Government** | `/government-dashboard` | Market analytics, price control, monitoring |

### 💾 Sample Data
The MVP includes 20+ pre-populated fish entries with:
- Diverse fish species (রুই, কাতলা, ইলিশ, etc.)
- Realistic prices and quantities
- Multiple quality grades
- Sample images
- Transaction history

---

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with market summary and about section |
| `/about` | Complete platform overview and services |
| `/Jele` | Fisherman dashboard |
| `/arotdar` | Wholesaler dashboard |
| `/government-dashboard` | Government monitoring panel |
| `/services` | Platform services overview |

---

## Platform Benefits

### Complete Transparency
Every transaction is digitally recorded and visible to all parties

### Easy to Use
Mobile app & web platform - accessible anytime, anywhere

### 24/7 Service
Use the platform and get AI assistance at any time of day

### Fair Pricing
Government base prices ensure minimum fair value for fishermen

### No Middlemen
Direct connection between fishermen and wholesalers increases profit margins

### Data-Driven Decisions
Real-time analytics help all stakeholders make informed choices

---

## 🗺️ Roadmap

### Phase 1 (Current - MVP) ✅
- [x] Client-side application with localStorage
- [x] Full Bengali interface
- [x] Role-based dashboards (Fisherman, Wholesaler, Government)
- [x] Real-time price tracking
- [x] AI advisory system
- [x] Dark mode support
- [x] Vercel deployment

### Phase 2 (Next) 
- [ ] Backend API with database integration
- [ ] User authentication & authorization
- [ ] Real payment gateway integration
- [ ] SMS/Email notifications
- [ ] Advanced ML-based price predictions
- [ ] Mobile apps (Android/iOS)

### Phase 3 (Future) 
- [ ] Blockchain for transaction verification
- [ ] IoT integration for fish quality sensors
- [ ] Multi-language support (English, Hindi)
- [ ] Export/Import tracking
- [ ] Cold storage management
- [ ] Complete supply chain visibility

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style (TypeScript + ESLint)
- Write meaningful commit messages
- Update documentation for new features
- Test thoroughly before submitting PR
- Keep Bengali translations accurate

---

## 📄 Project Structure

```
machgari/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── arotdar/           # Wholesaler dashboard
│   ├── government-dashboard/  # Government panel
│   ├── Jele/              # Fisherman dashboard
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── header.tsx        # Navigation header
│   ├── footer.tsx        # Footer component
│   └── ...               # Feature components
├── contexts/             # React Context providers
│   ├── fish-data-context.tsx
│   ├── transactions-context.tsx
│   └── user-context.tsx
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

---

## 📊 MVP Features & Highlights

### Why LocalStorage?
This MVP uses browser localStorage for data persistence, making it:
-  **Backend-independent**: No server setup needed
-  **Competition-ready**: Perfect for hackathons and demos
-  **Instant setup**: Clone and run immediately
-  **Predictable**: Consistent demo experience
-  **Educational**: Clear code for learning purposes

### Sample Data Included
Pre-loaded with 20+ diverse fish entries featuring:
- Common Bangladeshi fish species
- Realistic market prices
- Multiple quality grades
- Location data
- Sample transaction flows

---

## Known Limitations (MVP)

- Data stored in browser (clears on cache clear)
- No real user authentication
- Single-user experience (demo mode)
- No actual payment processing
- Limited to browser localStorage capacity

These will be addressed in Phase 2 with backend integration.

---

## 📜 License & Copyright

**© 2025 Machgari. All Rights Reserved.**

This project and its code are **proprietary and confidential**. 

### ⚠️ Usage Restrictions

**Unauthorized copying, modification, distribution, or use of this software is strictly prohibited.**

-  **No unauthorized use** - You may NOT use this code without explicit written permission
-  **No copying** - You may NOT copy, fork, or replicate this code
-  **No modification** - You may NOT modify or create derivative works
-  **No distribution** - You may NOT distribute or share this code

###  What You Can Do

-  **View and learn** from the code
-  **Star the repository** if you find it useful
-  **Try the live demo** at [machgari-mvp.vercel.app](https://machgari-mvp.vercel.app)
-  **Provide feedback** and suggestions
-  **Contact me** for collaboration opportunities

### 📋 Restrictions

To protect the intellectual property, the following require **written permission**:
- Using this code in your own projects
- Creating derivative works
- Commercial use
- Distribution or redistribution

### 📧 Licensing & Collaboration

Interested in using this project or collaborating? I'd love to hear from you!

**Contact:** [24engineers.tech@gmail.com](mailto:24engineers.tech@gmail.com)

Let's discuss how we can work together! 🚀

---

## 📞 Contact & Support


- **Discussions**: [24engineers.tech@gmail.com](mailto:24engineers.tech@gmail.com)
- **Email**: [24engineers.tech@gmail.com](mailto:24engineers.tech@gmail.com)


 **If this project helped you, please star it and share!**

---

##  Acknowledgments

- **Next.js Team** - Amazing React framework
- **Vercel** - Seamless deployment platform
- **Shadcn** - Beautiful UI components
- **Bangladesh Fish Market Community** - Inspiration and insights
- **Open Source Community** - Tools and libraries

---

## 🌟 Star History

If you find this project useful, please consider giving it a ⭐ on GitHub!

---

<div align="center">

### 🐟 মাছগাড়ি - Bringing Transparency and Efficiency to Bangladesh's Fish Markets

**[Live Demo](https://machgari-mvp.vercel.app)** • **[Report Bug](https://github.com/Wasik-Yousha/Machgari-MVP/issues)** • **[Request Feature](https://github.com/Wasik-Yousha/Machgari-MVP/issues)**

Made with ❤️ for Bangladesh's fishing community

---

**© 2025 Machgari | Built by [Wasik Yousha](https://github.com/Wasik-Yousha)**

*If this project helped you, please ⭐ star it and share!*

</div>
