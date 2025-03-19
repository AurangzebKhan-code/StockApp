React Native Stock Application

Setup Instructions:
   1. Run "npm install" to install dependencies
   2. Run "npm start" to start Metro
   3. Run "npm run android"
   
   Note: Node.js and React Native environment must be set up on your machine.

## Project Structure
StockApp/
├── src/
│ ├── components/ # Reusable UI components
│ │ ├── StockCard.tsx
│ │ ├── StockList.tsx
│ │ ├── SearchBar.tsx
│ │ ├── SortOptions.tsx
│ │ ├── ErrorBoundary.tsx
│ │ └── LoadingIndicator.tsx
│ ├── screens/ # Screen components
│ │ ├── StockListScreen.tsx
│ │ └── StockDetailScreen.tsx
│ ├── navigation/ # Navigation configuration
│ │ └── AppNavigator.tsx
│ ├── services/ # API and business logic
│ │ └── stockService.ts
│ ├── hooks/ # Custom hooks
│ │ ├── useDebounce.ts
│ │ └── useFetchStocks.ts
│ ├── types/ # TypeScript type definitions
│ │ └── index.ts
│ ├── utils/ # Utility functions
│ │ ├── withErrorHandling.tsx # HOC example
│ │ └── formatters.ts
│ └── App.tsx # Entry point
├── tests/ # Test files
│ │ ├── StockCard.test.tsx
│ │ └── SearchBar.test.tsx
└── documentation/ # Documentation
└── ARCHITECTURE.md # This file
