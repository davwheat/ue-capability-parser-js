import parseNsgLogToObject from '../../src/parsers/nsg';

test('can parse NSG-style signalling logs', () => {
  const output = parseNsgLogToObject(
    `
LTE RRC OTA Packet
 version : 27
 LTE RRC Release : 16.1.0
 NR RRC Release : 15.10.0
 phyCellId : 172
 freq : 6400
 sfn : 0
 Channel : 8
ul-dcch
 message -> c1 -> ueCapabilityInformation
  rrc-TransactionIdentifier : 2
  criticalExtensions -> c1 -> ueCapabilityInformation-r8
   test
   ue-CapabilityRAT-ContainerList
    [0]
     rat-Type : nr
    [1]
     rat-Type : eutra
    [2]
     thisIsNotTechnicallySpecAccurate
      at-all : true
    [3]
     nor -> is -> this
      literally
       whatsoever : true
    [4]
     [0]
      do-embedded-arrays-work : yes
      test
       [0]
        do-embedded-arrays-work-again : yes
     [1]
      do-embedded-arrays-work-again-again : yes
    [5]
    [6]
    [7]
     empty-indexes : yes
    [8]`
  );

  expect(output).toMatchObject({
    'LTE RRC OTA Packet': {
      version: '27',
      'LTE RRC Release': '16.1.0',
      'NR RRC Release': '15.10.0',
      phyCellId: '172',
      freq: '6400',
      sfn: '0',
      Channel: '8',
    },
    'ul-dcch': {
      message: {
        c1: {
          ueCapabilityInformation: {
            'rrc-TransactionIdentifier': '2',
            criticalExtensions: {
              c1: {
                'ueCapabilityInformation-r8': {
                  test: {},
                  'ue-CapabilityRAT-ContainerList': [
                    {
                      'rat-Type': 'nr',
                    },
                    {
                      'rat-Type': 'eutra',
                    },
                    {
                      thisIsNotTechnicallySpecAccurate: {
                        'at-all': 'true',
                      },
                    },
                    {
                      nor: {
                        is: {
                          this: {
                            literally: {
                              whatsoever: 'true',
                            },
                          },
                        },
                      },
                    },
                    [
                      {
                        'do-embedded-arrays-work': 'yes',
                        test: [
                          {
                            'do-embedded-arrays-work-again': 'yes',
                          },
                        ],
                      },
                      {
                        'do-embedded-arrays-work-again-again': 'yes',
                      },
                    ],
                    null,
                    null,
                    {
                      'empty-indexes': 'yes',
                    },
                    null,
                  ],
                },
              },
            },
          },
        },
      },
    },
  });
});
