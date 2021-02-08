import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CreateCustomer {
    securedCustomer = {
        ProductCode: null,
        salutationCode: null,
        nameLine1: null,
        nameLine2: null,
        Email: null,
        homeMobileNumberAreaCode: null,
        homeMobileNumber: null,
        OccupationMCS_ID: null,
        UtmSource: null,
        propertyTypeCode: null,
        facilityPricingPackageCode: null,
        CityPropertyCode: null,
        otherExpenses: null,
        Installment: null,
        amount: null,
        averageMonthlySalary: null,
        tenureYr: null,
        capchaVerify: null
    };

    unsecuredCustomer = {
        occupationCode: null,
        averageMonthlySalary: null,
        monthlyOtherIncome: null,
        totalWorkingExperienceMonth: null,
        PricingOption_ID: null,
        NM_facilityCategoryCode: null,
        NM_amount: null,
        NM_facilityCode: null,
        NM_promotionCode: null,
        interestRate: null,
        NM_facilityPricingPackageCode: null,
        NM_tenureMth: null,
        salutationCode: null,
        nameLine1: null,
        nameLine2: null,
        homeMobileNumberAreaCode: null,
        homeMobileNumber: null,
        homeEmail: null,
        officeStateCode: null,
        mailingRoomNo: null,
        mailingAddressLine1: null,
        mailingAddressLine2: null,
        mailingFloorNo: null,
        mailingMoo: null,
        mailingAddressLine3: null,
        mailingCity: null,
        mailingStateCode: null,
        mailingDistrictCode: null,
        mailingTownCode: null,
        mailingPostCode: null,
        UtmSource: null,
        OccupationMCS_ID: null,
        ContactCity_Code: null,
        ProductCode: null,
        capchaVerify: null,

    };
    getSecuredCustomer() {
        return this.securedCustomer;
    }
    getUnSecuredCustomer() {
        return this.unsecuredCustomer;
    }
}
