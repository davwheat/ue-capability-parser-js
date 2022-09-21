export enum LteCCFeatureType {
  DOWNLINK = 0,
  UPLINK = 1,
}

export class FeaturePerCCLte {
  type: LteCCFeatureType;
  mimo: number;
  qam: string | null;

  constructor(type: LteCCFeatureType = LteCCFeatureType.DOWNLINK, mimo: number = 0, qam: string | null = null) {
    this.type = type;
    this.mimo = mimo;
    this.qam = qam;
  }
}
