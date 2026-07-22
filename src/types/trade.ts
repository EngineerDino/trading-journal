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
  instrument: string;     // z.B. "NQ", "EURUSD", "AAPL"
  direction: TradeDirection;
  amount: number;         // Anzahl Shares / Kontrakte / Lots
  
  // Preise & Zeiten
  entryPrice: number;
  exitPrice: number;
  stopLoss?: number;      // Optional für R:R Berechnung
  takeProfit?: number;    // Optional
  entryTime: string;      // ISO String
  exitTime: string;       // ISO String
  
  // Performance & PnL
  status: TradeStatus;
  pnl: number;            // Netto-Gewinn/Verlust
  commission: number;     // Broker-Gebühren
  
  // Meta, Mindset & Verknüpfungen
  strategyId?: string;    // Verknüpfung zur Strategie-ID
  rating?: number;        // 1 bis 5 Sterne (Disziplin/Plan-Einhaltung)
  emotion?: Emotion;      // Psychologische Verfassung
  comment?: string;
  screenshot?: string;    // Base64 Image String
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