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
        }

    static fromProduct(product: Product) {
        return new Product(
                product._id,
                product.name,
                product.company,
                product.os,
                product.isNfc,
                product.deliveryDate,
                product.screenType,
                product.price,
                product.createdAt,
                product.imgUrl
        );
    }

    fillObject(product: Product) {
        this._id = product._id;
        this.name = product.name;
        this.company =  product.company;
        this.os = product.os;
        this.isNfc = product.isNfc;
        this.deliveryDate = product.deliveryDate;
        this.screenType = product.screenType;
        this.price = product.price;
        this.createdAt = product.createdAt;
        this.imgUrl = product.imgUrl;
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

    getFirstName(arr: simpleObj[], i: number): string {
        let filtered = arr.filter(f => f.value == i);
        return filtered.length > 0 ? filtered[0].viewValue : null;
    }

    getBoolIconName(b: boolean): string {
        return b ? 'done' : 'clear';
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

    
    get screenTypeName(): string {   
        return this.getFirstName(this.screenTypes, this.screenType);
    }

    public get osName(): string {
        return this.getFirstName(this.osList, this.os);
    }

    public get isNfcIcon(): string {
        return this.getBoolIconName(this.isNfc);
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

export interface simpleObj {
    value: number;
    viewValue: string;
  }