# MachGari
A digital fish market connecting Bangladesh's fishermen, wholesalers &amp; government. Features transparent pricing, direct selling, AI advisory &amp; market analytics. Built with Next.js &amp; React, it works offline with a mobile-first Bengali UI. Sample data included for instant demos. Eliminates middlemen while preserving traditional market relationships.

# মাছগাড়ি (Machgari) - Digital Fish Market Platform



Machgari is an innovative digital ecosystem transforming Bangladesh's traditional fish markets by connecting fishermen (জেলে), wholesalers (আড়তদার), and government regulators in a transparent marketplace. By eliminating middlemen and providing price transparency, the platform helps fishermen receive fair prices while maintaining efficient market operations.

## Features

### For Fishermen (জেলে)
- **Catch Management**: Log caught fish with details like quantity, quality, and photos
- **Market Price Comparison**: View real-time wholesale prices across different markets
- **Direct Selling**: Negotiate directly with wholesalers
- **Transaction Tracking**: Monitor all fish sales from offer to completion
- **AI Farming Advisor**: Get personalized recommendations for fish farming
- **Journey Planning**: Plan market trips after completing sales

### For Wholesalers (আড়তদার)
- **Fish Inventory Browser**: View available fish from different fishermen
- **Price Management**: Set competitive buying prices (within regulatory limits)
- **Transaction Management**: Handle offers, counter-offers, and confirmations
- **Fisherman Tracking**: Monitor fishermen's journey to market
- **Inventory Dashboard**: Track purchased fish

### For Government Agencies
- **Market Monitoring**: Real-time overview of supply, demand, and prices
- **Base Price Regulation**: Set and update base prices for different fish types
- **Interactive Analytics**: View charts and statistics of market activities
- **Price Trend Analysis**: Analyze price fluctuations over time

## Technology Stack

- **Frontend**: Next.js 14 with React
- **UI**: Tailwind CSS with Shadcn/UI components
- **State Management**: React Context API
- **Data Visualization**: Recharts
- **Storage**: LocalStorage (MVP version)
- **Language**: Full Bengali interface
- **AI**: Rule-based advisory system

## Getting Started

### Prerequisites
- Node.js 18.0+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/machgari.git

# Navigate to project directory
cd machgari

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will run at `http://localhost:3000`

## Demo Accounts

To explore different perspectives:

| Role       | Username | Password |
|------------|----------|----------|
| Fisherman  | jele     | password |
| Wholesaler | arotdar  | password |
| Government | govt     | password |

## Roadmap

- Backend integration with database
- User authentication system
- Mobile applications (Android/iOS)
- Digital payment integration
- Machine learning for price prediction
- Complete supply chain tracking

## MVP Note

This version runs entirely client-side using localStorage for persistence, making it perfect for demos and competitions without backend dependencies. Sample data (20 diverse entries with images) is included for predictable, repeatable demonstrations.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Machgari - Bringing transparency and efficiency to Bangladesh's fish markets*
