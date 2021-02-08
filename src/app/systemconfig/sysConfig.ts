import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AppService {

    systemCon = {
        'SecuredMinLoanAmount': 1500000,
        'SecuredMinSalary': 20000,
        'unSecuredMinloanAmount': 30000,
        'isCalculate': [
            'amount',
            'facilityPricingPackageCode',
            'tenureYr'
        ],
        'isMonthly': [
            'Installment'
        ],
        'ReadOnly': [
        ],
    };
}
