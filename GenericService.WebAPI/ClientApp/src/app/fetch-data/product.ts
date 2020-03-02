import { simpleObj } from "./fetch-data.component";
import * as moment from 'moment';

export class Product {
    
    constructor(
        public _id?: ObjectId,
        public name?: string,
        public company?: string,
        public os?: number,
        public isNfc?: boolean,
        public deliveryDate?: Date,
        public screenType?: number,
        public price?: number,
        public createdAt?: Date,
        public imgUrl?: string) {
            createdAt = new Date();
            console.debug('new Product()');
         }
         
    osList: simpleObj[] = [
        {value: 0, viewValue: 'Не выбрано'},
        {value: 1, viewValue: 'Android'},
        {value: 2, viewValue: 'IOS'},
        {value: 3, viewValue: 'Другое'}
    ];

    screenTypes: simpleObj[] = [
        {value: 0, viewValue: 'Не выбрано'},
        {value: 1, viewValue: 'AMOLED'},
        {value: 2, viewValue: 'IPS'},
        {value: 3, viewValue: 'TFT'},
    ];
    
    screenTypeName(): string {   
        console.debug('ScreenTypeName()');
        //return this.getFirstName(this.screenTypes, this.screenType) ?? 'qweqwe';
        return this.screenType.toString();
    }

    public get OsName(): string {
        return this.getFirstName(this.osList, this.os);
    }

    getFirstName(arr: simpleObj[], i: number): string {
        let filtered = arr.filter(f => f.value == i);
        return filtered.length > 0 ? filtered[0].viewValue : null;
    }

    public get isNfcIcon(): string {
        return this.getBoolIconName(this.isNfc);
    }

    getBoolIconName(b: boolean): string {
        return b ? 'done' : '';
    }

    getFormattedDate(d: Date, format: string): string {
        return d != null ? moment(d).format(format) : '';
    }

    getFormatDate(d: Date): string {
        return this.getFormattedDate(d, 'DD.MM.YYYY');
    }

    getFormatDateTime(d: Date): string {
        return this.getFormattedDate(d, 'DD.MM.YYYY HH:mm:ss');
    }

    public get deliveryDateText(): string {
        return this.getFormatDate(this.deliveryDate);
    }

    public get createdAtText(): string {
        return this.getFormatDateTime(this.createdAt);
    }
}

export class ObjectId {
    constructor(
        public $oid?: string,
        ) { }
}

export class ProductExt
{
    static osList: simpleObj[] = [
        {value: 0, viewValue: 'Не выбрано'},
        {value: 1, viewValue: 'Android'},
        {value: 2, viewValue: 'IOS'},
        {value: 3, viewValue: 'Другое'}
    ];

    static screenTypes: simpleObj[] = [
        {value: 0, viewValue: 'Не выбрано'},
        {value: 1, viewValue: 'AMOLED'},
        {value: 2, viewValue: 'IPS'},
        {value: 3, viewValue: 'TFT'},
    ];
    
    static get screenTypeName(): string {   
        
        //return this.getFirstName(this.screenTypes, this.screenType) ?? 'qweqwe';
        return 'ScreenTypeName()';
    }
}