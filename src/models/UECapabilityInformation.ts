export interface UECarrierAggregationCombination {
  combinations: UECarrierAggregationCombinationComponent[];
}

export interface UECarrierAggregationCombinationComponent {
  band: number;
  bandwidthClass: {
    uplink: string;
    downlink: string;
  };
}

export interface UECapabilityInformation {
  eutra?: {
    supportedBandsList: number[];
    supportedAggregationCombos: UECarrierAggregationCombination[];
  };
  nr?: {
    supportedBandsList: number[];
  };
  wcdma?: {
    supportedBandsList: number[];
  };
  gsm?: {
    supportedBandsList: number[];
  };
}
