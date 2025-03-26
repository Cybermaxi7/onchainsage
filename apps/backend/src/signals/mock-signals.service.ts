import { Injectable, NotFoundException } from "@nestjs/common";
import { TradingSignal } from "src/interfaces/trading-signal.interface";

@Injectable()
export class MockSignalService {
  private readonly tokenPairs = ["BTC/USD", "ETH/USD", "SOL/USD", "AVAX/USD", "DOT/USD"];
  private readonly categories = ["high-confidence", "medium-confidence", "low-confidence"];
  private readonly recommendations = ["buy", "sell", "hold"];

  private signals: TradingSignal[];

  constructor() {
    this.signals = this.generateMockSignals();
  }

  generateMockSignals(): TradingSignal[] {
    return Array.from({ length: 5 }, (_, i) => this.generateSingleSignal());
  }

  generateSingleSignal(): TradingSignal {
    return {
      signal_id: `sig_mock_${Date.now()}`, // Unique ID based on timestamp
      timestamp: new Date().toISOString(),
      token_pair: this.tokenPairs[Math.floor(Math.random() * this.tokenPairs.length)],
      sentiment_score: Number.parseFloat((Math.random() * 2 - 1).toFixed(2)), // Range from -1 to 1
      liquidity_usd: Math.floor(Math.random() * 5000000) + 500000, // Range from 500K to 5.5M
      volume_usd: Math.floor(Math.random() * 1000000) + 100000, // Range from 100K to 1.1M
      category: this.categories[Math.floor(Math.random() * this.categories.length)],
      thesis: `This is a dynamically generated signal for real-time updates.`,
      recommendation: this.recommendations[Math.floor(Math.random() * this.recommendations.length)],
    };
  }

  getMockSignalById(id: string): TradingSignal {
    const signal = this.signals.find((signal) => signal.signal_id === id);
    if (!signal) {
      throw new NotFoundException(`Signal with ID ${id} not found`);
    }
    return signal;
  }
  getFilteredSignals(category?: string, token_pair?: string): TradingSignal[] {
    return this.signals.filter(signal => {
      return (!category || signal.category === category) && 
             (!token_pair || signal.token_pair === token_pair);
    });
  }
}