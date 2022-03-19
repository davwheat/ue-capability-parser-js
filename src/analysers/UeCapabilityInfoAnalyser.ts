import { UECapabilityInformation } from '../models/UECapabilityInformation';

function supportedEutraBands(data: Record<string, any>): number[] | false {
  const {
    'ul-dcch': {
      message: {
        c1: {
          ueCapabilityInformation: {
            criticalExtensions: {
              c1: { 'ueCapabilityInformation-r8': ueCapabilityInformation },
            },
          },
        },
      },
    },
  } = data;

  if ('ue-CapabilityRAT-ContainerList' in ueCapabilityInformation) {
    const eutraRat = (ueCapabilityInformation['ue-CapabilityRAT-ContainerList'] as Record<string, any>[]).find((x) => x['rat-Type'] === 'eutra');

    if (eutraRat) {
      const {
        'ueCapabilityRAT-Container': { 'rf-Parameters': rfParams },
      } = eutraRat;

      const supportedBandList: { bandEUTRA: string; halfDuplex: 'true' | 'false' }[] = rfParams.supportedBandListEUTRA;

      const bands = supportedBandList.map((x) => parseInt(x.bandEUTRA));

      const over64Bands =
        eutraRat?.['ueCapabilityRAT-Container']?.nonCriticalExtension?.nonCriticalExtension?.lateNonCriticalExtension?.nonCriticalExtension
          ?.nonCriticalExtension?.nonCriticalExtension?.['rf-Parameters-v9e0']?.['supportedBandListEUTRA-v9e0'];

      if (over64Bands) {
        over64Bands.forEach((x, i) => {
          if (x) {
            bands[i] = parseInt(x['bandEUTRA-v9e0']);
          }
        });
      }

      return bands.sort((a, b) => a - b);
    }
  }

  return false;
}

export default function analyseForUeCapabilityInfo(log: Record<string, any>): UECapabilityInformation {
  const info: UECapabilityInformation = {};

  const eutraBands = supportedEutraBands(log);

  if (eutraBands) {
    info.eutra ||= {
      supportedBandsList: eutraBands,
      supportedAggregationCombos: [],
    };
  }

  return info;
}
