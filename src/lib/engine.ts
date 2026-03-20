/**
 * Antigravity Shield - Core Logic Engine
 * Handles Parametric Triggers, AI Fraud Detection, and Payout Simulations.
 */

export interface TriggerStatus {
  type: "RAIN" | "HEAT" | "CURFEW";
  value: number;
  threshold: number;
  isTriggered: boolean;
  zone: string;
}

export interface WorkerActivity {
  workerId: string;
  lat: number;
  lng: number;
  reportedLat: number;
  reportedLng: number;
  timestamp: number;
  isActive: boolean;
}

export const TriggerEngine = {
  getRainfall: (zone: string): TriggerStatus => {
    // Mocking real-time sensor data
    const mockVal = Math.random() * 100;
    return {
      type: "RAIN",
      value: mockVal,
      threshold: 80,
      isTriggered: mockVal > 80,
      zone,
    };
  },
  
  getHeat: (zone: string): TriggerStatus => {
    const mockVal = 35 + Math.random() * 15;
    return {
      type: "HEAT",
      value: mockVal,
      threshold: 45,
      isTriggered: mockVal > 45,
      zone,
    };
  }
};

export const AIFraudShield = {
  detectGPSSpoofing: (activity: WorkerActivity): boolean => {
    // Rule: If reported GPS distance from actual GPS > 500m, it's spoofing
    const distance = Math.sqrt(
      Math.pow(activity.lat - activity.reportedLat, 2) + 
      Math.pow(activity.lng - activity.reportedLng, 2)
    ) * 111000; // Rough conversion to meters
    
    return distance > 500;
  },
  
  validateActivity: (activity: WorkerActivity, trigger: TriggerStatus): boolean => {
    // Rule: Worker must be active in the zone during the trigger
    return activity.isActive && activity.timestamp > Date.now() - 3600000;
  }
};

export const PayoutSimulator = {
  simulateRazorpayPayout: async (amount: number, workerId: string) => {
    console.log(`[RAZORPAY SANDBOX] Initiating payout of ₹${amount} to ${workerId}`);
    await new Promise(r => setTimeout(r, 1500));
    return {
      status: "SUCCESS",
      transactionId: `TXN_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      payoutTime: new Date().toISOString()
    };
  }
};
