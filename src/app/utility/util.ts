import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { AppService } from '../systemconfig/sysConfig';
import { APIService } from '../services/api.service';

import { EnvService } from '../services/config.service';
declare var $;

@Injectable({
    providedIn: 'root'
})

export class UtilityMethod {
    constructor(private apiService: APIService,
        private appService: AppService,
        private router: Router,
        private activateRoute: ActivatedRoute,
        private envService: EnvService) {
    }


    EmailPattern = '([A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@{1}(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+([\.][A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9]))+)+';
    PhoneNumberPattern = '([0][0-9]{9})';
    NumberPattern = '^[0-9,]+';
    TextThaiPattern = '^[ก-๋์. -]+$';


    Showloading(isShow) {
        const loading = <HTMLDivElement>document.querySelector('div#divLoading');
        if (loading !== undefined) {

            if (isShow) {
                loading.className = 'loading show';
            } else {
                setTimeout(() => {
                    loading.className = 'loading';
                }, 500);
            }

        }

    }

    async RenderBanner(bannerData) {
        let str = '';
        let active = true;
        const bannerPath = this.envService.config.imageBannerPath;

        if (bannerData.length > 0) {

            str += ' <ol class="carousel-indicators"> ';

            for (let i = 0; i < bannerData.length; i++) {
                const urlImg = bannerPath + bannerData[i].BannerFileName;

                const isImageFound = await this.CheckUrlImage(urlImg);
                if (!isImageFound) { continue; }

                if (i === 0) {
                    str += '   <li data-target="#carouselExampleIndicators" data-slide-to="' + i + '" class="active" ></li> ';
                    active = false;
                } else {
                    if (active) {
                        str += '   <li data-target="#carouselExampleIndicators" data-slide-to="' + i + '" class="active" ></li> ';
                        active = false;
                    } else {
                        str += '   <li data-target="#carouselExampleIndicators" data-slide-to="' + i + '"></li> ';
                    }
                }
            }

            str += ' </ol> ';
            str += ' <div class="carousel-inner" role="listbox"> ';

            active = true;

            for (let i = 0; i < bannerData.length; i++) {
                const urlImg = bannerPath + bannerData[i].BannerFileName;
                const isImageFound = await this.CheckUrlImage(urlImg);
                const url = bannerData[i].BannerURL;

                if (!isImageFound) { continue; }
                var divImg = '<img class="d-block w-100" src="' + urlImg + '" style="cursor:pointer;"';

                if (i == 0) {
                    str += '<div class="carousel-item active">';
                    str += divImg;
                    if (url != null && url !== undefined && url !== '') {
                        str += ' onclick="window.open(\'' + url + '\')"';
                    }
                    str += '>';
                    active = false;
                }
                else {
                    if (active) {
                        str += '<div class="carousel-item active">';
                        str += divImg;
                        active = false;
                    }
                    else {
                        str += '<div class="carousel-item">';
                        str += divImg;
                    }
                    if (url != null && url !== undefined && url !== '') {
                        str += ' onclick="window.open(\'' + url + '\')"';
                    }
                    str += '>';
                }

                str += '     <div class="carousel-caption d-none d-md-block"> ';
                str += '     </div> ';
                str += '   </div> ';
            }

            str += '   </div> ';
            str += ' </div> ';
            str += ' <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev"> ';
            str += '   <span class="carousel-control-prev-icon" aria-hidden="true"></span> ';
            str += '   <span class="sr-only">Previous</span> ';
            str += ' </a> ';
            str += ' <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next"> ';
            str += '   <span class="carousel-control-next-icon" aria-hidden="true"></span> ';
            str += '   <span class="sr-only">Next</span> ';
            str += ' </a> ';

            $('#carouselExampleIndicators').html(str);

            $('#carouselExampleIndicators').carousel(
                // tslint:disable-next-line:radix
                {
                    interval: this.envService.config.timeSlidingBanner * 1000
                }
            );
        }
    }

    RenderContent(contentData) {
        let strContent = '';

        for (let i = 0; i < contentData.length; i++) {

            if (contentData[i].ContentType.toString() === 'Header') {
                $('#pTitle').html(contentData[i].ContentHeader);
                $('#pTitleBody').html(contentData[i].ContentBody);
            }

            if (contentData[i].ContentType.toString() === 'Title') {

                strContent += ' <div class="card-header collapsed" ';
                strContent += ' style="cursor: pointer" data-toggle="collapse" href="#collapse' + i + '" aria-expanded="true" aria-controls="collapse' + i + '">';
                strContent += '  <a class="card-title">';
                // ContentHeader
                strContent += contentData[i].ContentHeader;
                strContent += '   </a>';
                strContent += '  </div>';

                strContent += '  <div id="collapse' + i + '" class="collapse" data-parent="#accordion">';
                strContent += '   <div style="padding:10px 15px 15px 20px;border-bottom: 1px solid rgba(0,0,0,.125);">';
                // ContentBody
                let contentBody = '';
                if (contentData[i].ContentBody !== undefined && contentData[i].ContentBody != null) {
                    contentBody = (contentData[i].ContentBody === undefined ? '' : contentData[i].ContentBody);
                }
                strContent += contentBody;
                strContent += '  </div>';
                strContent += '  </div>';
            }

            if (contentData[i].ContentType.toString() === 'Footer') {
                $('#pContent3').html(contentData[i].ContentHeader + ' ' + contentData[i].ContentBody);
            }

        }
        $('#divContent2').html(strContent);
    }

    async GetInstallment() {
        setTimeout(() => {
            const FieldCalculate = this.appService.systemCon.isCalculate;
            if (FieldCalculate != null && FieldCalculate !== undefined) {

                const field: HTMLInputElement[] = new Array(FieldCalculate.length);
                // Add HTMLElement in array
                for (let i = 0; i < FieldCalculate.length; i++) {
                    field[i] = document.querySelector('[name=\'' + FieldCalculate[i] + '\']');
                }
                // Add Event For HTMLElement
                for (let j = 0; j < FieldCalculate.length; j++) {
                    field[j].addEventListener('change', async () => {
                        const tempvalue = '0';
                        const defaultOption = '0: null';
                        if (field[0].value !== '' && field[1].value !== '' && field[2].value !== ''
                            && field[0].value !== defaultOption && field[1].value !== defaultOption && field[2].value !== defaultOption) {
                            let param = 'PricingCode=' + field[1].value;

                            param += '&LoanAmount=' + parseInt(field[0].value.replace(/,/g, ''));
                            param += '&TenureYear=' + parseInt(field[2].value) / 12;

                            const res = await this.apiService.get('SecuredLoan', 'GetInstallment?' + param);

                            if (res['RESPONSE_INFO']['RESCODE'] === '000') {
                                const installment = this.DecimalAddCommas(res['MontlyPayment']);
                                $('#Installment').val(installment);
                            } else {
                                console.log(res['RESPONSE_INFO']['RESCODE']);
                            }
                        } else {
                            $('#Installment').val(tempvalue);
                        }
                    });
                }
            }
        }, 1000);
    }

    mapValidators(validators) {

        const formValidators = [];
        if (validators) {
            for (const validation of Object.keys(validators)) {
                if (validation === 'required' && validators.required === true) {
                    formValidators.push(Validators.required);
                } else if (validation === 'min') {
                    formValidators.push(Validators.minLength(validators.min));
                } else if (validation === 'max') {
                    formValidators.push(Validators.maxLength(validators.max));
                } else if (validation === 'pattern') {
                    if (validators.pattern === 'mobileNumber') {
                        formValidators.push(Validators.pattern(this.PhoneNumberPattern));
                    }
                    if (validators.pattern === 'email') {
                        formValidators.push(Validators.pattern(this.EmailPattern));
                    }
                    if (validators.pattern === 'number') {
                        formValidators.push(Validators.pattern(this.NumberPattern));
                    }
                    if (validators.pattern === 'textThai') {
                        formValidators.push(Validators.pattern(this.TextThaiPattern));
                    }
                }
            }
            return formValidators;
        }
    }

    eventValueChange(form, dataObject) {
        setTimeout(() => {
            for (const prop of Object.keys(dataObject)) {
                if (dataObject[prop].validation.pattern === 'number') {
                    this.Validate_DatatypeDecimal(<HTMLInputElement>document.getElementById(prop));
                }
                if (dataObject[prop].validation.pattern === 'textThai') {
                    this.Validate_TextThaiOnly(<HTMLInputElement>document.getElementById(prop));
                }
                if (dataObject[prop].validation.pattern === 'email') {
                    this.Validate_Email(form.controls[prop], prop);
                }
                if (dataObject[prop].validation.pattern === 'mobileNumber') {
                    //new AutoNumeric('#'+ prop, {allowDecimalPadding: false,aSep: '' });
                    this.Validate_DatatypeInt(<HTMLInputElement>document.getElementById(prop));
                }
                if (dataObject[prop].type === 'month') {
                    for (const i of Object.keys(dataObject[prop].render)) {
                        this.ReactiveFormValidate_IsMonth(<HTMLInputElement>document.getElementById(dataObject[prop].render[i].id), form, prop);
                        form.get(prop).valueChanges.subscribe(
                            data => {
                                if (isNaN(data)) {
                                    form.controls[prop].setValue(null);
                                }
                            });
                    }
                }
            }
        }, 500);
    }

    createOption(JqueryElem: any, arrData: any) {
        if (JqueryElem != null && JqueryElem !== undefined) {
            if (arrData.MasterData != null) {
                for (let j = 0; j < arrData.MasterData.length; j++) {
                    JqueryElem.append(
                        $('<option>',
                            {
                                value: arrData.MasterData[j].Code,
                                text: arrData.MasterData[j].Name
                            }
                        )
                    );
                }
            }
        }
    }

    removeOption(JqueryElem: any) {
        if (JqueryElem != null && JqueryElem !== undefined) {
            JqueryElem.find('option:not(:first)').remove();
        }
    }

    DecimalAddCommas(value: string) {
        if (value != null) {
            return value.toString().replace(/,/g, '').replace(/[^0-9]+/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        return;
    }

    RemoveCommas(value: string) {
        if (value != null) {
            return value.toString().replace(/,/g, '');
        }
        return;
    }

    Goto_SorryPage(error: any, msg: string) {
        sessionStorage.setItem('ERR_MSG', msg);
        this.router.navigate(['/error']);
        console.log(error);
    }

    getHomeMobileNumber(phoneNumber: string) {
        const result: string[] = [];
        if (phoneNumber != null && phoneNumber !== undefined) {
            result[0] = phoneNumber.substring(0, 3);
            result[1] = phoneNumber.substring(phoneNumber.length - 7);
        }
        return result;
    }

    AlertNotMatchCondition() {
        const msg = 'ขออภัย ลูกค้าไม่ตรงนโยบายของธนาคาร<br/>ขอบคุณที่สนใจผลิตภัณฑ์ของธนาคาร';
        const modalTag = <HTMLDivElement>document.getElementById('Modal');
        if (modalTag !== null) { modalTag.outerHTML = ''; }

        const modalDiv: HTMLDivElement = <HTMLDivElement>document.createElement('div');
        modalDiv.setAttribute('id', 'Modal');
        modalDiv.setAttribute('class', 'modal');
        const modalTxt = `
        <div class="modal-content">
    <div class="modal-header-red">
      <span id="close" class="modal-close">x</span>
      <p>&nbsp;</p>
    </div>
    <div class="modal-body text-center">
      <div class="text-center" style="font-size:20px;">` + msg + `</div>
    </div>
    <div class="modal-footer">
      <button id="btnCancel" class="btn btn-primary btn-navigate no-margin">ตกลง</button>
    </div>
  </div>`;
        modalDiv.innerHTML = modalTxt;
        (<HTMLBodyElement>document.querySelector('body')).appendChild(modalDiv);

        // Get the modal
        const modal = document.getElementById('Modal');
        const cancel = document.getElementById('btnCancel');
        const span = document.getElementById('close');

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = 'none';
        };

        // When the user clicks on <button> close, close the modal
        cancel.onclick = function () {
            modal.style.display = 'none';
        };

        // Show Pop up
        modal.style.display = 'block';
    }

    GetUTMSource() {
        let sessionUtmSource = sessionStorage.getItem('utmSource');
        const isBack = sessionStorage.getItem('isBack');
        if (sessionUtmSource == null) {
            this.activateRoute.queryParams.subscribe(params => {
                var utmSource = params['utm_source'];
                if (utmSource === undefined) {
                    sessionStorage.setItem('utmSource', '');
                } else {
                    if (utmSource.length > 100) {
                        utmSource = utmSource.substr(0, 100);
                        utmSource = utmSource.replace(/'%22'/g, '"');
                    }
                    sessionStorage.setItem('utmSource', utmSource);
                }
            });
        }
    }

    async CheckUrlImage(urlImg) {
        return new Promise((resolve, reject) => {
            const img = document.createElement('img');
            img.src = urlImg;
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
        });
    }

    Validate_Email(form, formControl) {
        $('#' + formControl).change(function () {

            var value = $('#' + formControl).val();
            var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.{1}[a-zA-Z]{2,4}$/;
            var pattern = new RegExp(emailPattern);

            if (emailPattern.test(value) == false) {
                form.setValue('Invalid Email');
                $('#' + formControl).val(value)
                //return false;
            }
            //return true;
        });
    }
    Validate_DatatypeInt(tag: HTMLInputElement) {

        tag.addEventListener('keyup', function (e) {
            if (e.key != undefined) {
                if (e.key.match(/\D/g) != null) {
                    this.value = this.value.replace(/\D/g, '')
                }
            }
        });

        tag.addEventListener('keydown', function (e) {
            if (e.keyCode !== 8 // backspace
                && e.keyCode !== 9 // tap
                && e.keyCode !== 46 // delete
                && e.keyCode !== 37 // arrow left
                && e.keyCode !== 39 // arrow right
                && !((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) // not number
                // && e.key.match(/[0-9]/g) == null
            ) {
                e.preventDefault();
            }
        });

        tag.addEventListener('change', function () {
            if (this.value.replace(/[^0-9]+/g, '') === '') {
                this.value = '';
            } else {
                this.value = this.value.replace(/[^0-9]+/g, '');
            }
        });
    }

    Validate_IsMonth(tag: HTMLInputElement) {
        if (tag.attributes['ismonth'].value === 'true') {
            tag.addEventListener('keydown', function (e) {
                if (e.keyCode !== 8 // backspace
                    && e.keyCode !== 9 // tap
                    && e.keyCode !== 46 // delete
                    && e.keyCode !== 37 // arrow left
                    && e.keyCode !== 39 // arrow right
                    && !((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) // not number
                    // && e.key.match(/[0-9]/g) == null
                ) {
                    e.preventDefault();
                }
            });

            // if (tag.attributes["name"].value == tag.attributes["target"].value + "Month") {
            if (tag.attributes['name'].value.indexOf('Month') !== -1) {
                tag.addEventListener('keyup', function (e) {
                    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                        // tslint:disable-next-line:radix
                        if (parseInt(this.value) > 11) {
                            this.value = '0';
                        } else {
                            // tslint:disable-next-line:radix
                            this.value = parseInt(this.value).toString().replace(/[^0-9]+/g, '');
                        }
                    }
                });
                tag.addEventListener('blur', function () {
                    this.value = this.value.replace(/[^0-9]+/g, '');
                });
            } else {
                tag.addEventListener('keyup', function (e) {
                    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                        // tslint:disable-next-line:radix
                        this.value = parseInt(this.value).toString().replace(/[^0-9]+/g, '');
                    }
                });
                tag.addEventListener('blur', function () {
                    this.value = this.value.replace(/[^0-9]+/g, '');
                });
            }
        }
    }

    ReactiveFormValidate_IsMonth(tag: HTMLInputElement, form: any, prop: any) {
        if (tag.attributes['ismonth'].value === 'true') {
            tag.addEventListener('keydown', function (e) {
                if (e.keyCode !== 8 // backspace
                    && e.keyCode !== 9 // tap
                    && e.keyCode !== 46 // delete
                    && e.keyCode !== 37 // arrow left
                    && e.keyCode !== 39 // arrow right
                    && !((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) // not number
                    // && e.key.match(/[0-9]/g) == null
                ) {
                    e.preventDefault();
                }
            });

            // if (tag.attributes["name"].value == tag.attributes["target"].value + "Month") {
            if (tag.attributes['name'].value.indexOf('Month') !== -1) {
                tag.addEventListener('keyup', function (e) {
                    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                        // tslint:disable-next-line:radix
                        if (parseInt(this.value) > 11) {

                            // UtilityMedthod.prototype.Alert_FocusBox("กรุณากรอก" + this.attributes["caption"].value + " (เดือน) อยู่ในช่วง 0-11", this);
                            this.value = '';
                            form.controls[prop].setValue(null);
                        } else {
                            // tslint:disable-next-line:radix
                            this.value = parseInt(this.value).toString().replace(/[^0-9]+/g, '');
                        }
                    }
                });
                tag.addEventListener('blur', function () {
                    this.value = this.value.replace(/[^0-9]+/g, '');
                });
            } else {
                tag.addEventListener('keyup', function (e) {
                    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                        // tslint:disable-next-line:radix
                        this.value = parseInt(this.value).toString().replace(/[^0-9]+/g, '');
                    }
                });
                tag.addEventListener('blur', function () {
                    this.value = this.value.replace(/[^0-9]+/g, '');
                });
            }
        }
    }

    Validate_DatatypeDecimal(tag: HTMLInputElement) {
        const that = this;
        tag.addEventListener('keyup', function (e) {
            if (e.key != undefined) {
                if (e.key.match(/\D/g) != null) {
                    this.value = this.value.replace(/\D/g, '')
                }
            }
        });

        tag.addEventListener('keydown', function (e) {
            const keyMatch = (e.key !== undefined) ? e.key.match(/[0-9]/g) : '';
            if (e !== undefined) {
                if (e.key === '.' || e.key === 'Decimal' || this.value.indexOf('.') >= 0) {
                    const msg = 'กรุณากรอกหลักหน่วยขึ้นไป ไม่รับทศนิยมค่ะ';
                    tag.blur();
                    // that._utility.Alert_Box(msg);
                }
                if (e.keyCode !== 8 // backspace
                    && e.keyCode !== 9 // tap
                    && e.keyCode !== 46 // delete
                    && e.keyCode !== 37 // arrow left
                    && e.keyCode !== 39 // arrow right
                    && !((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) // not number
                    // && e.key.match(/[0-9]/g) == null
                ) {
                    e.preventDefault();
                }
            }
        });

        tag.addEventListener('input', function (e) {
            if (this.value.replace(/[^0-9]+/g, '') === '') {
                this.value = '';
                // tslint:disable-next-line:radix
            } else if (parseInt(this.value.replace(/[^0-9]+/g, '')).toString() === '0' && this.value.toString() === '00') {
                this.value = '0';
            }
        });

        tag.addEventListener('change', function () {
            if (this.value.replace(/[^0-9]+/g, '') === '') {
                this.value = '';
            } else {
                // tslint:disable-next-line:radix
                this.value = parseInt(this.value.replace(/[^0-9]+/g, '')).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
        });
    }

    Validate_TextThaiOnly(tag: HTMLInputElement) {
        tag.addEventListener('keydown', function (e) {
            if (e.key != undefined) {
                if (e.key.match(/^[ก-๋์-]+$/g) == null // not thai language
                    && e.keyCode !== 32 // not spece bar
                    && e.keyCode !== 8 // backspace
                    && e.keyCode !== 9 // ta
                    && e.keyCode !== 46 // delete
                    && e.keyCode !== 37 // arrow left
                    && e.keyCode !== 39 // arrow right
                ) {
                    e.preventDefault();
                }
            }
        });

        tag.addEventListener('change', function () {
            if (this.value !== '') {
                if (!this.value.match(/^([ก-๋์-]\s?([ก-๋์-])*)*$/g)) {
                    this.value = '';
                }
            }
            this.value = this.value.replace(/([&!฿"^])*/g, '');
        });
    }

    Validate_TextEngOnly(tag: HTMLInputElement) {
        tag.addEventListener('keydown', function (e) {
            if (e.key.match(/^[a-zA-Z -]+$/g) == null // not thai language
                && e.keyCode !== 32 // not spece bar
                && e.keyCode !== 8 // backspace
                && e.keyCode !== 9 // tap
                && e.keyCode !== 46 // delete
                && e.keyCode !== 37 // arrow left
                && e.keyCode !== 39 // arrow right
            ) {
                e.preventDefault();
            }
        });

        tag.addEventListener('change', function () {
            if (this.value !== '') {
                if (!this.value.match(/^([a-zA-Z -]\s?)+$/g)) {
                    this.value = '';
                }
            }
            this.value = this.value.replace(/([&!฿"^])*/g, '');
        });
    }

    Validate_NotSpecialChar(tag: HTMLInputElement) {
        tag.addEventListener('keydown', function (e) {
            if (e.key.match(/^[ก-๋์a-zA-Z]+$/g) == null // not thai language
                && e.keyCode !== 32 // not spece bar
                && e.keyCode !== 8 // backspace
                && e.keyCode !== 9 // tap
                && e.keyCode !== 46 // delete
                && e.keyCode !== 37 // arrow left
                && e.keyCode !== 39 // arrow right
            ) {
                e.preventDefault();
            }
        });

        tag.addEventListener('change', function () {
            if (this.value !== '') {
                if (!this.value.match(/^[^(๐-๙0-9)]+[a-zA-Zก-๋์]+$/g)) {
                    this.value = '';
                }
            }
            this.value = this.value.replace(/([&!฿"^])*/g, '');
        });
    }

    ShowDivCalculate() {
        $('#showCalculate').slideDown();
        setTimeout(() => {
            $('#modaldivCalculate').removeAttr('style');
            $('#modaldivCalculate').css({
                'display': 'block',
                'opacity': '1',
                'height': '30%'
            });
        }, 400);

    }
    HideDivCalculate() {
        $('#modaldivCalculate').removeAttr('style');
        $('#showCalculate').slideUp();
    }

    ReadPrivacy(consent: string, product: string) {
        let url = "";
        //Term
        if (consent == 'term') {
            //Unsecured
            if (product.toLocaleLowerCase() == 'pc' || product.toLocaleLowerCase() == 'ec') {
                url = this.envService.config.unSecUrlTerm;
            }
            //NH,RH,MP
            else {
                url = this.envService.config.SecUrlTerm;
            }
        }
        // Privacy
        else {
            if (product.toLocaleLowerCase() == 'pc' || product.toLocaleLowerCase() == 'ec') {
                url = this.envService.config.UnSecUrlPrivacy;
            }
            //NH,RH,MP
            else {
                url = this.envService.config.SecUrlPrivacy;
            }
        }
        window.open(url, "", "width=500,height=600,scrollbars=yes");
    }

    TermAndPrivacy(product: string) {
        document.getElementById('term').addEventListener('click', () => {
            this.ReadPrivacy('term', product);
        }
        );
        document.getElementById('privacy').addEventListener('click', () => {
            this.ReadPrivacy('privacy', product);
        }
        );
    }

    InsertAdvtTag(product: string, thxPage = null, refNo = null) {
        let utmSource = sessionStorage.getItem("utmSource");
        if (utmSource != null && utmSource != undefined && utmSource != '') {
            utmSource = utmSource.toLocaleLowerCase();
        }
        else {
            utmSource = sessionStorage.getItem("utm");
            if (utmSource != null && utmSource != undefined && utmSource != '') {
                utmSource = utmSource.toLocaleLowerCase();
            }
        }
        product = product.toLocaleLowerCase();
        if (thxPage == null) {
            if (utmSource == "rf_google") {
                if (product == "pc") {
                    var scriptAsync = document.createElement('script');
                    scriptAsync.async = true;
                    scriptAsync.src = "https://www.googletagmanager.com/gtag/js?id=AW-797449345";
                    document.getElementsByTagName('head')[0].appendChild(scriptAsync);

                    var script = document.createElement('script');
                    script.id = "AdvtTag"
                    script.innerHTML = "window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'AW-797449345');";
                    document.getElementsByTagName('head')[0].appendChild(script);
                }
            }

            if (utmSource == "rf_facebook") {
                var script = document.createElement('script');
                script.id = "AdvtTag"
                if (product == "pc") {
                    script.innerHTML = "!function(f,b,e,v,n,t,s)\
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};\
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\
                n.queue=[];t=b.createElement(e);t.async=!0;\
                t.src=v;s=b.getElementsByTagName(e)[0];\
                s.parentNode.insertBefore(t,s)}(window,document,'script',\
                'https://connect.facebook.net/en_US/fbevents.js');\
                fbq('init', '420250538472828'); \
                fbq('track', 'PageView');";
                    document.getElementsByTagName('head')[0].appendChild(script);
                    (document);
                }

            }

            if (utmSource == "syndacast_google" ||
                utmSource == "syndacast_facebook_domain" ||
                utmSource == "syndacast_facebook_lead" ||
                utmSource == "syndacast_native" ||
                utmSource == "syndacast_adboost") {
                if (product == "ec" || product == "nh" || product == "rh" || product == "mp") {
                    var script = document.createElement('script');
                    script.id = "AdvtTag"
                    script.innerHTML = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\
                                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\
                                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\
                                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\
                                    })(window,document,'script','dataLayer','GTM-MBNZVVH');";
                    document.getElementsByTagName('body')[0].appendChild(script);
                    (document);
                }
            }

            if (utmSource == "bi-google" || utmSource == "facebook.com-bi") {
                if (product == "pc") {
                    var script = document.createElement('script');
                    script.id = "AdvtTag"
                    script.innerHTML = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\
                                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\
                                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\
                                    '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\
                                    })(window,document,'script','dataLayer','GTM-5KX6DW');";
                    document.getElementsByTagName('head')[0].appendChild(script);
                    (document);
                }
            }

            if (utmSource == "df_google") {
                if (product == "ec" || product == "pc") {
                    //<!-- Global site tag (gtag.js) - Google Ads: 763113946 -->
                    var scriptAsync = document.createElement('script');
                    scriptAsync.async = true;
                    scriptAsync.src = "https://www.googletagmanager.com/gtag/js?id=AW-763113946";
                    document.getElementsByTagName('head')[0].appendChild(scriptAsync);

                    var script = document.createElement('script');
                    script.id = "AdvtTag"
                    script.innerHTML = "window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'AW-763113946');";
                    document.getElementsByTagName('head')[0].appendChild(script);

                }                
            }
            if (utmSource == "df_facebook_grab" ||
                utmSource == "df_facebook_starbucks" ||
                utmSource == "df_facebook_netflix" ||
                utmSource == "df_facebook_prism" ||
                utmSource == "df_facebook_interest" ||
                utmSource == "df_facebook_lifestyle") {
                if (product == "ec" || product == "pc") {
                    //<!-- Facebook Pixel Code -->
                    script = document.createElement('script');
                    script.id = "AdvtTag"
                    script.innerHTML = "!function(f,b,e,v,n,t,s)\
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};\
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\
                    n.queue=[];t=b.createElement(e);t.async=!0;\
                    t.src=v;s=b.getElementsByTagName(e)[0];\
                    s.parentNode.insertBefore(t,s)}(window, document,'script',\
                    'https://connect.facebook.net/en_US/fbevents.js');\
                    fbq('init', '768663580174508');\
                    fbq('track', 'PageView');";

                    document.getElementsByTagName('head')[0].appendChild(script);
                    (document);

                }               
            }
        }

        if (thxPage != null) {
            if (utmSource == "rf_google") {
                if (product == "pc") {
                    var scriptAsync = document.createElement('script');
                    scriptAsync.async = true;
                    scriptAsync.src = "https://www.googletagmanager.com/gtag/js?id=AW-797449345";
                    document.getElementsByTagName('head')[0].appendChild(scriptAsync);

                    var script = document.createElement('script');
                    script.id = "AdvtTag"
                    script.innerHTML = "window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'AW-797449345');";
                    document.getElementsByTagName('head')[0].appendChild(script);

                    var script = document.createElement('script');
                    script.id = "AdvtTag"
                    script.innerHTML = "gtag('event', 'conversion', {'send_to': 'AW-797449345/Ycp3CPzsx4UBEIG5oPwC'});"
                    document.getElementsByTagName('head')[0].appendChild(script);
                }
            }

            if (utmSource == "rf_facebook") {
                if (product == "pc") {
                    var script = document.createElement('script');
                    script.id = "AdvtTag"
                    script.innerHTML = "!function(f,b,e,v,n,t,s)\
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\
                     n.callMethod.apply(n,arguments):n.queue.push(arguments)};\
                     if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\
                     n.queue=[];t=b.createElement(e);t.async=!0;\
                    t.src=v;s=b.getElementsByTagName(e)[0];\
                    s.parentNode.insertBefore(t,s)}(window,document,'script',\
                    'https://connect.facebook.net/en_US/fbevents.js');\
                    fbq('init', '420250538472828'); \
                    fbq('track', 'PageView');\
                    fbq('track', 'Lead');";
                    document.getElementsByTagName('head')[0].appendChild(script);
                    (document);
                }
            }

            if (utmSource == "preneco") {
                if (product == "pc") {
                    var img = document.createElement('img');
                    img.id = "AdvtTag"
                    img.src = "https://access.amot.in.th/return.php?return=1&type=img&identifier=" + refNo;
                    img.style.display = 'none';
                    document.getElementsByTagName('head')[0].appendChild(img);
                    (document);
                }
            }

            if (utmSource == "syndacast_google" ||
                utmSource == "syndacast_facebook_domain" ||
                utmSource == "syndacast_facebook_lead" ||
                utmSource == "syndacast_native" ||
                utmSource == "syndacast_adboost") {
                if (product == "ec" || product == "nh" || product == "rh" || product == "mp") {
                    var script = document.createElement('script');
                    script.id = "AdvtTag"
                    script.innerHTML = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\
                                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\
                                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\
                                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\
                                        })(window,document,'script','dataLayer','GTM-MBNZVVH');";
                    document.getElementsByTagName('body')[0].appendChild(script);
                    (document);
                }
            }

            if (utmSource == "bi-google" || utmSource == "facebook.com-bi") {
                if (product == "pc") {
                    var script = document.createElement('script');
                    script.id = "AdvtTag"
                    script.innerHTML = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\
                                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\
                                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\
                                        '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\
                                        })(window,document,'script','dataLayer','GTM-5KX6DW');";
                    document.getElementsByTagName('head')[0].appendChild(script);
                    (document);
                }
            }

            if (utmSource == "df_google") {
                if (product == "ec" || product == "pc") {
                    //<!-- Event snippet for PILOT Thai - Thank you page conversion page  -->
                    var scriptAsync = document.createElement('script');
                    scriptAsync.async = true;
                    scriptAsync.src = "https://www.googletagmanager.com/gtag/js?id=AW-763113946";
                    document.getElementsByTagName('head')[0].appendChild(scriptAsync);

                    var script = document.createElement('script');
                    script.id = "AdvtTag"
                    script.innerHTML = "window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'AW-763113946');";
                    document.getElementsByTagName('head')[0].appendChild(script);

                    var script = document.createElement('script');
                    script.id = "AdvtTag"
                    script.innerHTML = "gtag('event', 'conversion', {'send_to': 'AW-763113946/IxLTCPjajZUBENrj8OsC'});"
                    document.getElementsByTagName('head')[0].appendChild(script);

                }                
            }
            if (utmSource == "df_facebook_grab" ||
                utmSource == "df_facebook_starbucks" ||
                utmSource == "df_facebook_netflix" ||
                utmSource == "df_facebook_prism" ||
                utmSource == "df_facebook_interest" ||
                utmSource == "df_facebook_lifestyle") {
                if (product == "ec" || product == "pc") {
                    //<!-- Facebook Pixel Code -->
                    script = document.createElement('script');
                    script.id = "AdvtTag"
                    script.innerHTML = "!function(f,b,e,v,n,t,s)\
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};\
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\
                    n.queue=[];t=b.createElement(e);t.async=!0;\
                    t.src=v;s=b.getElementsByTagName(e)[0];\
                    s.parentNode.insertBefore(t,s)}(window, document,'script',\
                    'https://connect.facebook.net/en_US/fbevents.js');\
                    fbq('init', '768663580174508');\
                    fbq('track', 'CompleteRegistration');";
                    document.getElementsByTagName('head')[0].appendChild(script);
                    (document);
                }                
            }
        }
    }

    RemoveAdvtTag() {
        var elem = document.getElementById('AdvtTag');

        if (elem != undefined) {
            elem.parentNode.removeChild(elem);
        }
    }

    InterSpaceTag(product: string, refNo: string) {
        product = product.toLocaleLowerCase();
        let utmSource = sessionStorage.getItem("utmSource");
        if (utmSource != null && utmSource != '') {
            utmSource = utmSource.toLocaleLowerCase();
        } else {
            utmSource = sessionStorage.getItem("utm");
            if (utmSource != null && utmSource != '') {
                utmSource = utmSource.toLocaleLowerCase();
            }
        }
        if (utmSource == "interspace") {
            if (product == 'nh' || product == 'rh' || product == 'mp') {
                var script = document.createElement('script');
                script.innerHTML = 'var __atw = __atw || []; __atw.push({"mcn": "019d385eb67632a7e958e23f24bd07d7","param": {"result_id": "1","identifier": "' + refNo + '"}});';
                document.getElementsByTagName('head')[0].appendChild(script);

                (function (d) {
                    var s = d.createElement('script');
                    s.src = 'https://cv.accesstrade.in.th/js/nct/cv.js';
                    s.id = 'interSpace';
                    s.async = true;
                    var e = d.getElementsByTagName('head')[0];
                    e.parentNode.insertBefore(s, e);
                }

                )(document);

            }
            else {
                var script = document.createElement('script');
                script.innerHTML = 'var __atw = __atw || []; __atw.push({"mcn": "8d7d8ee069cb0cbbf816bbb65d56947e","param": {"result_id": "1","identifier": "' + refNo + '"}});';
                document.getElementsByTagName('head')[0].appendChild(script);

                (function (d) {
                    var s = d.createElement('script');
                    s.src = 'https://cv.accesstrade.in.th/js/nct/cv.js';
                    s.id = 'interSpace';
                    s.async = true;
                    var e = d.getElementsByTagName('head')[0];
                    e.parentNode.insertBefore(s, e);
                }

                )(document);
            }
        }
    }

}


