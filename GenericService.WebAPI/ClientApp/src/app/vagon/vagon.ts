import * as moment from 'moment';

export class Vagon {
    
    constructor(
        public _id?: ObjectId,
        public model?: string,
        public countryOwner?: string,
        public vagonType?: number,
        public isClosedFloor?: boolean,
        public rentalEndDate?: Date,
        public capacity?: number,
        public tare?: number,
        public createdAt?: Date,
        public imgUrl?: string,
        public ownType?: number,
        public axlesCount?: number,
        public volume?: number,
        public length?: number,
        public ownerName?: string,
        public tenant?: string,
        public operator?: string,
        public mileage?: number,
        //Год выпуска вагона
        public productionYear?: number,
        // Дата последнего ремонта:
        public lastRepairDate?: number,
        // Дата следующего ремонта
        public nextRepairDate?: Date,
        // Дата обновления НСИ:
        public nsiUpdateDate?: Date,
        // Дата изменения:
        public updatedAt?: Date) {
            createdAt = new Date();
        }

    static fromVagon(product: Vagon) {
        return new Vagon(
                product._id,
                product.model,
                product.countryOwner,
                product.vagonType,
                product.isClosedFloor,
                product.rentalEndDate,
                product.capacity,
                product.tare,
                product.createdAt,
                product.imgUrl
        );
    }

    fillObject(product: Vagon) {
        this._id = product._id;
        this.model = product.model;
        this.countryOwner =  product.countryOwner;
        this.vagonType = product.vagonType;
        this.isClosedFloor = product.isClosedFloor;
        this.rentalEndDate = product.rentalEndDate;
        this.capacity = product.capacity;
        this.tare = product.tare;
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
        return this.getFirstName(this.screenTypes, this.capacity);
    }

    public get osName(): string {
        return this.getFirstName(this.osList, this.vagonType);
    }

    public get isNfcIcon(): string {
        return this.getBoolIconName(this.isClosedFloor);
    }

    public get deliveryDateText(): string {
        return this.getFormatDate(this.rentalEndDate);
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