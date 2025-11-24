# Dodo Payment Task - API Queue System & Financial Dashboard

A Next.js application featuring an intelligent API queue system with rate limiting capabilities and a comprehensive financial dashboard UI. This project demonstrates modern web development practices including efficient API request management, rate limit handling, and a beautiful, responsive financial management interface.

## How to Run the Project

### Prerequisites

- Node.js 18+ (or higher)
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd dodo-payment-task
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

5. **Access the Dashboard**:
   Visit [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to view the financial dashboard with cards, transactions, spending summaries, and more.

6. **Access the Queue Demo**:
   Visit [http://localhost:3000/queue-demo](http://localhost:3000/queue-demo) to interact with the API queue system.

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Technologies Used

### Core Framework & Runtime
- **Next.js 16.0.3** - React framework with App Router for server-side rendering and API routes
- **React 19.2.0** - UI library for building interactive user interfaces
- **TypeScript 5** - Type-safe JavaScript for better code quality and developer experience

### UI Components & Styling
- **Tailwind CSS 4** - Utility-first CSS framework for rapid UI development
- **Radix UI** - Unstyled, accessible component primitives:
  - `@radix-ui/react-avatar` - Avatar components
  - `@radix-ui/react-dialog` - Modal dialogs
  - `@radix-ui/react-dropdown-menu` - Dropdown menus
  - `@radix-ui/react-progress` - Progress indicators
  - `@radix-ui/react-select` - Select components
  - `@radix-ui/react-separator` - Visual separators
  - `@radix-ui/react-tabs` - Tab navigation
  - `@radix-ui/react-tooltip` - Tooltip components
- **Lucide React** - Icon library for modern, consistent icons
- **Motion** - Animation library for smooth transitions
- **Recharts** - Charting library for data visualization

### Utilities & Helpers
- **class-variance-authority** - Utility for managing component variants
- **clsx** - Utility for constructing className strings conditionally
- **tailwind-merge** - Utility to merge Tailwind CSS classes intelligently

### Development Tools
- **ESLint** - Code linting with Next.js configuration
- **PostCSS** - CSS processing with Tailwind CSS

## Key Architectural & Design Decisions

### 1. **Separation of Business Logic from UI**

The project strictly separates business logic from UI components, following SOLID principles:

- **Business Logic Layer** (`src/lib/`):
  - `api-queue/api-queue.ts` - Core queue management logic
  - `rate-limiter/rate-limiter.ts` - Rate limiting algorithm
  - `utils.ts` - Utility functions for formatting and calculations

- **UI Layer** (`src/components/`):
  - `api-queue/ApiQueueDemo.tsx` - Presentation component that consumes the queue system
  - Reusable UI components in `ui/` directory

This separation ensures:
- Business logic can be tested independently
- UI components remain focused on presentation
- Easy to swap UI implementations without changing core logic

### 2. **API Queue System Architecture**

The `ApiQueue` class implements a robust queue management system:

- **Singleton Pattern**: Global queue instance (`globalApiQueue`) ensures consistent state across the application
- **Observer Pattern**: Subscribe/unsubscribe mechanism for reactive state updates
- **Job Lifecycle Management**: Jobs transition through states: `pending` → `processing` → `completed`/`failed`
- **Concurrency Control**: Configurable `maxConcurrent` setting prevents overwhelming the API
- **Automatic Retry**: Built-in retry mechanism for rate-limited requests with exponential backoff support

**Key Features**:
- Unique job IDs for tracking
- State persistence during component lifecycle
- Automatic queue processing
- Error handling and retry logic

### 3. **Rate Limiting Strategy**

The `RateLimiter` class implements a sliding window rate limiting algorithm:

- **In-Memory Storage**: Uses `Map` for efficient O(1) lookups
- **Per-Client Tracking**: Identifies clients by IP address (supports proxy headers)
- **Configurable Limits**: 10 requests per 60 seconds (default)
- **Automatic Cleanup**: Periodic cleanup of expired records to prevent memory leaks
- **HTTP Headers**: Returns standard rate limit headers (`X-RateLimit-*`, `Retry-After`)

**Rate Limit Response**:
- Returns `429 Too Many Requests` when limit exceeded
- Includes `Retry-After` header indicating when to retry
- Provides remaining request count in response headers

### 4. **Type Safety & TypeScript**

Comprehensive type definitions ensure type safety throughout the application:

- **Type Definitions** (`src/types/`):
  - `queue.types.ts` - Queue job and state types
  - `api.types.ts` - API request/response types
  - `dashboard.types.ts` - Dashboard-specific types
  - `sidebar.types.ts` - Sidebar navigation types

- **Generic Types**: Queue system uses generics (`QueueJob<T>`) for flexibility
- **Strict TypeScript**: Enabled strict mode for maximum type safety

### 5. **Reusable Component Architecture**

The project emphasizes component reusability:

- **UI Component Library** (`src/components/ui/`): Base components (Button, Card, Input, etc.) that can be reused across the application
- **Feature Components** (`src/components/api-queue/`, `src/components/dashboard/`): Higher-level components that compose base components
- **Constants Separation** (`src/constants/`): Configuration and constants separated from components for maintainability

### 6. **API Route Design**

The `/api/echo` route demonstrates best practices:

- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes
- **Request Validation**: Validates request body and required fields
- **Rate Limit Integration**: Seamlessly integrates with the rate limiter
- **Standard HTTP Responses**: Follows RESTful conventions
- **Client Identification**: Extracts client IP from various proxy headers for accurate rate limiting

### 7. **State Management Pattern**

The queue system uses a reactive state management pattern:

- **Observer/Subscribe Pattern**: Components subscribe to queue state changes
- **Immutable State Updates**: State is computed from job arrays, ensuring consistency
- **Real-time Updates**: UI automatically updates when queue state changes
- **No External State Library**: Uses native JavaScript patterns, reducing dependencies

### 8. **Code Organization**

Clean code structure following best practices:

```
src/
├── app/              # Next.js App Router pages and API routes
├── components/       # React components (UI + feature components)
├── constants/        # Configuration and constants
├── hooks/            # Custom React hooks
├── lib/              # Business logic and utilities
└── types/            # TypeScript type definitions
```

### 9. **Error Handling Strategy**

Robust error handling at multiple levels:

- **Network Errors**: Caught and handled gracefully
- **Rate Limit Errors**: Automatic retry with exponential backoff
- **Validation Errors**: Clear error messages returned to client
- **Unexpected Errors**: Fallback error handling prevents crashes

### 10. **Performance Considerations**

- **Efficient Data Structures**: Uses `Map` and `Set` for O(1) operations
- **Memory Management**: Automatic cleanup of expired rate limit records
- **Concurrent Processing**: Configurable concurrency prevents resource exhaustion
- **Lazy Processing**: Queue only processes when needed

### 11. **Dashboard UI Implementation**

The Dashboard UI is a comprehensive financial management interface built with modern design principles:

#### **Layout Architecture**

- **Responsive Grid Layout**: Three-column grid system (1 column on mobile, 3 columns on desktop) using CSS Grid
- **Sidebar Navigation**: Collapsible sidebar with icon-only mode for space efficiency
- **Sticky Header**: Persistent header with user profile, search, notifications, and quick actions
- **Widget-Based Design**: Modular widgets that can be easily rearranged or extended

#### **Dashboard Widgets**

The dashboard consists of 7 specialized widgets, each serving a specific financial function:

1. **My Cards Widget** (`MyCardsWidget.tsx`)
   - Displays active debit/credit cards with visual card representation
   - Shows card balance and status indicators
   - Spending limit tracking with time-based tabs (Daily, Weekly, Monthly)
   - Interactive pie charts showing spending limits vs. remaining budget
   - Card navigation controls for multiple cards
   - Uses CSS variables for dynamic theming

2. **Transactions Widget** (`TransactionsWidget.tsx`)
   - Recent transaction history with categorized display
   - Tabbed interface: Incoming, Outgoing, and Pending transactions
   - Transaction details: title, description, amount, date, and category icons
   - Color-coded transaction types (income vs. expenses)
   - "See All" navigation for full transaction history

3. **Spending Summary Widget** (`SpendingSummaryWidget.tsx`)
   - Pie chart visualization of spending by category
   - Category breakdown: Shopping, Utilities, Others
   - Time period selector (Week, Month, Year)
   - Color-coded categories with percentage indicators
   - Interactive chart with hover states

4. **Expenses Chart Widget** (`ExpensesChartWidget.tsx`)
   - Line chart showing expense trends over time
   - Total expenses display with percentage change indicator
   - Compact design with integrated chart visualization
   - Visual indicators for expense increases/decreases

5. **Exchange Widget** (`ExchangeWidget.tsx`)
   - Currency exchange interface (USD ↔ EUR)
   - Real-time exchange rate display
   - Input field for amount conversion
   - Fee breakdown: Tax, Exchange Fee, Total Amount
   - Available balance indicator
   - Flag icons for currency selection

6. **Subscriptions Widget** (`SubscriptionsWidget.tsx`)
   - Active subscription management
   - Subscription status badges: Paid, Expiring, Pending
   - Service icons (Spotify, YouTube Music, Prime Video)
   - Promotional card for special offers
   - Monthly/Yearly pricing display
   - Quick actions menu for each subscription

7. **Credit Score Widget** (`CreditScoreWidget.tsx`)
   - Credit score display with visual bar indicator
   - Score breakdown visualization (36 bars representing score range)
   - Credit score description and recommendations
   - "View Details" action button

#### **Design Patterns & Features**

- **Component Composition**: Each widget is a self-contained component that can be used independently
- **Constants-Driven Content**: All text content and configuration stored in `src/constants/` for easy localization
- **Type Safety**: Comprehensive TypeScript types for all dashboard data structures
- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop
- **Accessibility**: Uses Radix UI primitives for keyboard navigation and screen reader support
- **Visual Hierarchy**: Consistent spacing, typography, and color system throughout
- **Interactive Elements**: Hover states, transitions, and visual feedback on all interactive components

#### **Navigation Structure**

- **Sidebar Navigation** (`AppSideBar.tsx`):
  - Collapsible sidebar with icon-only mode
  - Active route highlighting with visual indicator
  - Grouped navigation items (Main, Others)
  - Team switcher and user profile in footer
  - Mobile-responsive with overlay support

- **Header Component** (`Header.tsx`):
  - User profile display with avatar
  - Search functionality
  - Notification bell with badge indicator
  - Quick action button ("Move Money")
  - Responsive design with mobile sidebar trigger

#### **Data Visualization**

- **Recharts Integration**: Professional charts using Recharts library
  - Pie charts for spending categories and limits
  - Line charts for expense trends
  - Responsive containers that adapt to widget size
  - Custom color schemes matching design system

- **Visual Indicators**:
  - Progress bars for spending limits
  - Status badges with color coding
  - Icon-based category representation
  - Percentage change indicators

#### **Styling Approach**

- **Tailwind CSS**: Utility-first styling for rapid development
- **CSS Variables**: Dynamic theming support through CSS custom properties
- **Component Variants**: Consistent styling through class-variance-authority
- **Shadow System**: Subtle shadows (`shadow-xs`) for depth and hierarchy
- **Border System**: Consistent border colors and styles
- **Color Palette**: Semantic color tokens (foreground, muted-foreground, primary, etc.)

#### **State Management**

- **Client Components**: Widgets use `"use client"` directive for interactivity
- **Local State**: React hooks (`useState`, `useEffect`) for component-level state
- **No Global State**: Each widget manages its own state independently
- **Reactive Updates**: Real-time UI updates based on user interactions

#### **Code Organization**

```
src/components/dashboard/
├── MyCardsWidget.tsx          # Card management and spending limits
├── TransactionsWidget.tsx      # Transaction history
├── SpendingSummaryWidget.tsx  # Spending breakdown by category
├── ExpensesChartWidget.tsx   # Expense trends visualization
├── ExchangeWidget.tsx        # Currency exchange interface
├── SubscriptionsWidget.tsx   # Subscription management
└── CreditScoreWidget.tsx     # Credit score display
```

#### **Accessibility Features**

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus management
- Screen reader friendly content
- Color contrast compliance

#### **Performance Optimizations**

- **Code Splitting**: Each widget is a separate component, enabling lazy loading
- **Efficient Rendering**: React memoization where appropriate
- **Optimized Charts**: Recharts with responsive containers
- **CSS Variables**: Runtime theme switching without re-renders
- **Image Optimization**: Next.js Image component for avatars and icons

## Project Structure

```
dodo-payment-task/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── echo/          # Echo API endpoint with rate limiting
│   │   ├── dashboard/         # Dashboard page
│   │   ├── queue-demo/        # Queue demo page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── api-queue/         # Queue demo component
│   │   ├── dashboard/         # Dashboard widgets
│   │   ├── ui/                # Reusable UI components
│   │   └── sidebar/           # Sidebar components
│   ├── constants/             # Configuration constants
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Business logic
│   │   ├── api-queue/         # Queue management system
│   │   └── rate-limiter/      # Rate limiting implementation
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## Key Features

- **Intelligent API Queue**: Manages API requests with automatic retry on rate limits
- **Rate Limiting**: Server-side rate limiting with per-client tracking
- **Real-time Updates**: Reactive UI that updates as queue state changes
- **Dashboard UI**: Comprehensive financial dashboard with 7 specialized widgets
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Data Visualization**: Interactive charts and graphs using Recharts
- **Type Safety**: Full TypeScript coverage with strict mode
- **Reusable Components**: Modular, reusable component architecture
- **Error Handling**: Comprehensive error handling at all levels
- **Clean Architecture**: Separation of concerns following SOLID principles

## Notes

- The queue system processes requests sequentially by default (`maxConcurrent: 1`) to avoid rate limits
- Rate limiter allows 10 requests per 60 seconds per client IP
- Failed jobs are preserved in history for debugging
- The echo API simulates a 2-second processing delay to demonstrate queue behavior