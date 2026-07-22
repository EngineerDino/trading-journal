# Project Summary: Local-First Trading Journal

## Core Philosophy & Objective
We are building a privacy-focused, database-free, browser-local Trading Journal web application. 
All data lives on the user's browser (IndexedDB) and is exported/imported via JSON files containing trade metadata, settings, and embedded Base64 screenshots.

## Tech Stack & Architecture
- **Framework:** React + Vite (TypeScript)
- **Styling:** Tailwind CSS v4 + shadcn/ui (Dark Mode support, sleek rounded card-style look)
- **State Management:** React Context API (`TradeContext`) wrapping the app as the single source of truth.
- **Persistence:** IndexedDB (for auto-save & handling large Base64 screenshots without storage limits)
- **Data Exchange:** Pure JSON import/export.

## Key Functionalities
1. **Trade Entry:** Instrument, Direction, Entry/Exit Prices & Times, Amount, StopLoss/TakeProfit, PnL, Commission, Comment, Rating, Emotion, Strategy Link, Clipboard Screenshot (Base64).
2. **Data Export/Import:** JSON-based state serialization/deserialization with schema validation.
3. **Trade Log & Feed:** Expandable card view per trade, lazy-loading screenshot, filtering/search.
4. **Dashboard:** Key metrics (Win Rate, Net PnL, R:R) and interactive charts (PnL growth, Win/Loss donuts).
5. **Strategies & Personalization:** User/Journal name, initial balance, custom strategy tags.

---

## TypeScript Data Schema (`src/types/trade.ts`)

```typescript
export type TradeDirection = 'LONG' | 'SHORT';
export type TradeStatus = 'WIN' | 'LOSS' | 'BE';
export type Emotion = 'CALM' | 'FOMO' | 'GREEDY' | 'ANXIOUS' | 'REVENGE';

export interface Strategy {
  id: string;
  name: string;
  description?: string;
}

export interface Trade {
  id: string;
  instrument: string;
  direction: TradeDirection;
  amount: number;
  
  entryPrice: number;
  exitPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  entryTime: string; // ISO String
  exitTime: string;  // ISO String
  
  status: TradeStatus;
  pnl: number;
  commission: number;
  
  strategyId?: string;
  rating?: number;        // 1-5 Stars
  emotion?: Emotion;
  comment?: string;
  screenshot?: string;    // Base64 image
  tags?: string[];
}

export interface AccountSettings {
  userName: string;
  journalName: string;
  initialBalance: number;
  currency: string;
}

export interface JournalExport {
  version: string;
  exportDate: string;
  accountSettings: AccountSettings;
  strategies: Strategy[];
  trades: Trade[];
}