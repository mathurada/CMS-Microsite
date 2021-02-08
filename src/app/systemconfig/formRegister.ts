export const registerform = {
    personalloan: {
        salutationCode: {
            label: 'คำนำหน้าชื่อ',
            type: 'select',
            validation: {
                required: true,
            },
            options: [
            ],
            service: 'GetAllSalutation'
        },
        nameLine1: {
            label: 'ชื่อ (ไทย)',
            type: 'text',
            validation: {
                required: true,
                max: 50,
                pattern: 'textThai',
                patternMsg: 'กรุณากรอกข้อมูลเป็นภาษาไทยเท่านั้น'
            },
        },
        nameLine2: {
            label: 'นามสกุล (ไทย)',
            type: 'text',
            validation: {
                required: true,
                max: 50,
                pattern: 'textThai',
                patternMsg: 'กรุณากรอกข้อมูลเป็นภาษาไทยเท่านั้น'
            }
        },
        Phone_No: {
            label: 'เบอร์โทรศัพท์มือถือ',
            type: 'text',
            validation: {
                required: true,
                max: 10,
                min: 10,
                pattern: 'mobileNumber',
                patternMsg: 'หมายเลขเบอร์โทรศัพท์ไม่ถูกต้อง'
            }
        },
        homeEmail: {
            label: 'อีเมล',
            type: 'text',
            validation: {
                required: true,
                pattern: 'email',
                max: 200,
                patternMsg: 'รูปแบบอีเมล์ไม่ถูกต้อง'
            }
        },
        ContactCity_Code: {
            label: 'จังหวัดที่ติดต่อกลับ',
            type: 'select',
            options: [
            ],
            validation: {
                required: true
            },
            service: 'GetAllContactCity'
        },
        OccupationMCS_ID: {
            label: 'อาชีพ',
            type: 'select',
            options: [
            ],
            validation: {
                required: true
            },
            service: 'GetAllOcupationMCSByID'
        },
        averageMonthlySalary: {
            label: 'รายได้',
            type: 'text',
            validation: {
                required: true,
                max: 13,
                pattern: 'number',
                patternMsg: 'กรุณากรอกตัวเลขเท่านั้น'
            }
        },
        totalWorkingExperienceMonth: {
            label: 'ระยะเวลาการทำงาน',
            type: 'month',
            validation: {
                required: true,
                max: 2,
                pattern: 'month',
            },
            render: [{
                label: 'ปี',
                id: 'totalWorkingExperienceYear'
            },
            {
                label: 'เดือน',
                id: 'totalWorkingExperienceMonth'
            }

            ]
        },
    },
    extracash: {
        salutationCode: {
            label: 'คำนำหน้าชื่อ',
            type: 'select',
            validation: {
                required: true,
            },
            options: [
            ],
            service: 'GetAllSalutation'
        },
        nameLine1: {
            label: 'ชื่อ (ไทย)',
            type: 'text',
            validation: {
                required: true,
                max: 50,
                pattern: 'textThai',
                patternMsg: 'กรุณากรอกข้อมูลเป็นภาษาไทยเท่านั้น'
            },
        },
        nameLine2: {
            label: 'นามสกุล (ไทย)',
            type: 'text',
            validation: {
                required: true,
                max: 50,
                pattern: 'textThai',
                patternMsg: 'กรุณากรอกข้อมูลเป็นภาษาไทยเท่านั้น'
            }
        },
        Phone_No: {
            label: 'เบอร์โทรศัพท์มือถือ',
            type: 'text',
            validation: {
                required: true,
                max: 10,
                min: 10,
                pattern: 'mobileNumber',
                patternMsg: 'หมายเลขเบอร์โทรศัพท์ไม่ถูกต้อง'
            }
        },
        homeEmail: {
            label: 'อีเมล',
            type: 'text',
            validation: {
                required: true,
                pattern: 'email',
                max: 200,
                patternMsg: 'รูปแบบอีเมล์ไม่ถูกต้อง'
            }
        },
        ContactCity_Code: {
            label: 'จังหวัดที่ติดต่อกลับ',
            type: 'select',
            options: [
            ],
            validation: {
                required: true
            },
            service: 'GetAllContactCity'
        },
        OccupationMCS_ID: {
            label: 'อาชีพ',
            type: 'select',
            options: [
            ],
            validation: {
                required: true
            },
            service: 'GetAllOcupationMCSByID'
        },
        averageMonthlySalary: {
            label: 'รายได้',
            type: 'text',
            validation: {
                required: true,
                max: 13,
                pattern: 'number',
                patternMsg: 'กรุณากรอกตัวเลขเท่านั้น'
            }
        },
        totalWorkingExperienceMonth: {
            label: 'ระยะเวลาการทำงาน',
            type: 'month',
            validation: {
                required: true,
                max: 2,
                pattern: 'month',
            },
            render: [{
                label: 'ปี',
                id: 'totalWorkingExperienceYear'
            },
            {
                label: 'เดือน',
                id: 'totalWorkingExperienceMonth'
            }

            ]
        },
        DivCalculate: {
            NM_amount: {
                label: 'วงเงินกู้ที่ต้องการ',
                type: 'text',
                options: [
                ],
                validation: {
                    required: true,
                    max: 16,
                    pattern: 'number'
                },
                service: ''
            },
            NM_promotionCode: {
                label: 'แคมเปญที่ต้องการ',
                type: 'select',
                options: [
                ],
                validation: {
                    required: true
                }
            },
            interestRate: {
                label: 'อัตราดอกเบี้ยที่ต้องการ',
                type: 'select',
                options: [
                ],
                validation: {
                    required: true
                }
            }
        }
    },
    newhome: {
        salutationCode: {
            label: 'คำนำหน้าชื่อ',
            type: 'select',
            validation: {
                required: true,
            },
            options: [
            ],
            service: 'GetAllSalutation'
        },
        nameLine1: {
            label: 'ชื่อ (ไทย)',
            type: 'text',
            validation: {
                required: true,
                max: 50,
                pattern: 'textThai',
                patternMsg: 'กรุณากรอกข้อมูลเป็นภาษาไทยเท่านั้น'
            },
        },
        nameLine2: {
            label: 'นามสกุล (ไทย)',
            type: 'text',
            validation: {
                required: true,
                max: 50,
                pattern: 'textThai',
                patternMsg: 'กรุณากรอกข้อมูลเป็นภาษาไทยเท่านั้น'
            }
        },
        Phone_No: {
            label: 'เบอร์โทรศัพท์มือถือ',
            type: 'text',
            validation: {
                required: true,
                max: 10,
                min: 10,
                pattern: 'mobileNumber',
                patternMsg: 'หมายเลขเบอร์โทรศัพท์ไม่ถูกต้อง'
            }
        },
        Email: {
            label: 'อีเมล',
            type: 'text',
            validation: {
                required: true,
                pattern: 'email',
                max: 200,
                patternMsg: 'รูปแบบอีเมล์ไม่ถูกต้อง'
            }
        },
        OccupationMCS_ID: {
            label: 'อาชีพ',
            type: 'select',
            options: [
            ],
            validation: {
                required: true
            },
            service: 'GetAllHomeloanOccupation'
        },
        averageMonthlySalary: {
            label: 'รายได้',
            type: 'text',
            validation: {
                required: true,
                max: 13,
                pattern: 'number',
                patternMsg: 'กรุณากรอกตัวเลขเท่านั้น'
            }
        },
        otherExpenses: {
            label: 'ภาระที่ต้องผ่อนชำระต่อเดือน',
            type: 'text',
            validation: {
                required: false,
                max: 16,
                pattern: 'number',
                patternMsg: 'กรุณากรอกตัวเลขเท่านั้น'
            }
        },
        CityPropertyCode: {
            label: 'จังหวัดของสินทรัพย์',
            type: 'select',
            options: [
            ],
            validation: {
                required: true
            },
            service: 'GetAllHomeLoanCityProperty'
        },
        DivCalculate: {
            propertyTypeCode: {
                label: 'ประเภทที่อยู่อาศัย',
                type: 'select',
                options: [
                ],
                validation: {
                    required: true
                },
                service: 'GetAllHomeLoanHouseType'
            },
            amount: {
                label: 'วงเงินกู้ที่ต้องการ',
                type: 'text',
                validation: {
                    required: true,
                    max: 16,
                    pattern: 'number',
                    patternMsg: 'กรุณากรอกตัวเลขเท่านั้น'
                }
            },
            facilityPricingPackageCode: {
                label: 'อัตราดอกเบี้ยเฉลี่ย 3 ปีแรก',
                type: 'select',
                options: [
                ],
                validation: {
                    required: true
                },
            },
            tenureYr: {
                label: 'จำนวน (ปี) ที่ต้องการกู้',
                type: 'select',
                options: [
                ],
                validation: {
                    required: true
                },
                service: 'GetAllHomeLoanTenure'
            },
            Installment: {
                label: 'จำนวนผ่อนต่อเดือน (บาท)',
                type: 'text',
                validation: {
                    required: false
                },
                readOnly: true
            },
        }
    },
    refinance: {
        salutationCode: {
            label: 'คำนำหน้าชื่อ',
            type: 'select',
            validation: {
                required: true,
            },
            options: [
            ],
            service: 'GetAllSalutation'
        },
        nameLine1: {
            label: 'ชื่อ (ไทย)',
            type: 'text',
            validation: {
                required: true,
                max: 50,
                pattern: 'textThai',
                patternMsg: 'กรุณากรอกข้อมูลเป็นภาษาไทยเท่านั้น'
            },
        },
        nameLine2: {
            label: 'นามสกุล (ไทย)',
            type: 'text',
            validation: {
                required: true,
                max: 50,
                pattern: 'textThai',
                patternMsg: 'กรุณากรอกข้อมูลเป็นภาษาไทยเท่านั้น'
            }
        },
        Phone_No: {
            label: 'เบอร์โทรศัพท์มือถือ',
            type: 'text',
            validation: {
                required: true,
                max: 10,
                min: 10,
                pattern: 'mobileNumber',
                patternMsg: 'หมายเลขเบอร์โทรศัพท์ไม่ถูกต้อง'
            }
        },
        Email: {
            label: 'อีเมล',
            type: 'text',
            validation: {
                required: true,
                pattern: 'email',
                max: 200,
                patternMsg: 'รูปแบบอีเมล์ไม่ถูกต้อง'
            }
        },
        OccupationMCS_ID: {
            label: 'อาชีพ',
            type: 'select',
            options: [
            ],
            validation: {
                required: true
            },
            service: 'GetAllHomeloanOccupation'
        },
        averageMonthlySalary: {
            label: 'รายได้',
            type: 'text',
            validation: {
                required: true,
                max: 13,
                pattern: 'number',
                patternMsg: 'กรุณากรอกตัวเลขเท่านั้น'
            }
        },
        otherExpenses: {
            label: 'ภาระที่ต้องผ่อนชำระต่อเดือน',
            type: 'text',
            validation: {
                required: false,
                max: 16,
                pattern: 'number',
                patternMsg: 'กรุณากรอกตัวเลขเท่านั้น'
            }
        },
        CityPropertyCode: {
            label: 'จังหวัดของสินทรัพย์',
            type: 'select',
            options: [
            ],
            validation: {
                required: true
            },
            service: 'GetAllHomeLoanCityProperty'
        },
        DivCalculate: {
            propertyTypeCode: {
                label: 'ประเภทที่อยู่อาศัย',
                type: 'select',
                options: [
                ],
                validation: {
                    required: true
                },
                service: 'GetAllHomeLoanHouseType'
            },
            amount: {
                label: 'วงเงินกู้ที่ต้องการ',
                type: 'text',
                validation: {
                    required: true,
                    max: 16,
                    pattern: 'number',
                    patternMsg: 'กรุณากรอกตัวเลขเท่านั้น'
                }
            },
            facilityPricingPackageCode: {
                label: 'อัตราดอกเบี้ยเฉลี่ย 3 ปีแรก',
                type: 'select',
                options: [
                ],
                validation: {
                    required: true
                },
            },
            tenureYr: {
                label: 'จำนวน (ปี) ที่ต้องการกู้',
                type: 'select',
                options: [
                ],
                validation: {
                    required: true
                },
                service: 'GetAllHomeLoanTenure'
            },
            Installment: {
                label: 'จำนวนผ่อนต่อเดือน (บาท)',
                type: 'text',
                validation: {
                    required: false
                },
                readOnly: true
            },
        }
    },
    mortgagepower: {
        salutationCode: {
            label: 'คำนำหน้าชื่อ',
            type: 'select',
            validation: {
                required: true,
            },
            options: [
            ],
            service: 'GetAllSalutation'
        },
        nameLine1: {
            label: 'ชื่อ (ไทย)',
            type: 'text',
            validation: {
                required: true,
                max: 50,
                pattern: 'textThai',
                patternMsg: 'กรุณากรอกข้อมูลเป็นภาษาไทยเท่านั้น'
            },
        },
        nameLine2: {
            label: 'นามสกุล (ไทย)',
            type: 'text',
            validation: {
                required: true,
                max: 50,
                pattern: 'textThai',
                patternMsg: 'กรุณากรอกข้อมูลเป็นภาษาไทยเท่านั้น'
            }
        },
        Phone_No: {
            label: 'เบอร์โทรศัพท์มือถือ',
            type: 'text',
            validation: {
                required: true,
                max: 10,
                min: 10,
                pattern: 'mobileNumber',
                patternMsg: 'หมายเลขเบอร์โทรศัพท์ไม่ถูกต้อง'
            }
        },
        Email: {
            label: 'อีเมล',
            type: 'text',
            validation: {
                required: true,
                pattern: 'email',
                max: 200,
                patternMsg: 'รูปแบบอีเมล์ไม่ถูกต้อง'
            }
        },
        OccupationMCS_ID: {
            label: 'อาชีพ',
            type: 'select',
            options: [
            ],
            validation: {
                required: true
            },
            service: 'GetAllHomeloanOccupation'
        },
        averageMonthlySalary: {
            label: 'รายได้',
            type: 'text',
            validation: {
                required: true,
                max: 13,
                pattern: 'number',
                patternMsg: 'กรุณากรอกตัวเลขเท่านั้น'
            }
        },
        otherExpenses: {
            label: 'ภาระที่ต้องผ่อนชำระต่อเดือน',
            type: 'text',
            validation: {
                required: false,
                max: 16,
                pattern: 'number',
                patternMsg: 'กรุณากรอกตัวเลขเท่านั้น'
            }
        },
        CityPropertyCode: {
            label: 'จังหวัดของสินทรัพย์',
            type: 'select',
            options: [
            ],
            validation: {
                required: true
            },
            service: 'GetAllHomeLoanCityProperty'
        },
        DivCalculate: {
            propertyTypeCode: {
                label: 'ประเภทที่อยู่อาศัย',
                type: 'select',
                options: [
                ],
                validation: {
                    required: true
                },
                service: 'GetAllHomeLoanHouseType'
            },
            amount: {
                label: 'วงเงินกู้ที่ต้องการ',
                type: 'text',
                validation: {
                    required: true,
                    max: 16,
                    pattern: 'number',
                    patternMsg: 'กรุณากรอกตัวเลขเท่านั้น'
                }
            },
            facilityPricingPackageCode: {
                label: 'อัตราดอกเบี้ยเฉลี่ย 3 ปีแรก',
                type: 'select',
                options: [
                ],
                validation: {
                    required: true
                },
            },
            tenureYr: {
                label: 'จำนวน (ปี) ที่ต้องการกู้',
                type: 'select',
                options: [
                ],
                validation: {
                    required: true
                },
                service: 'GetAllHomeLoanTenure'
            },
            Installment: {
                label: 'จำนวนผ่อนต่อเดือน (บาท)',
                type: 'text',
                validation: {
                    required: false
                },
                readOnly: true
            },
        }
    }
};
