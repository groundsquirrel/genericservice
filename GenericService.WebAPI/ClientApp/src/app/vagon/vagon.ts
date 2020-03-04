import * as moment from 'moment';

export class Vagon {
    
    constructor(
        public _id?: ObjectId,
        // Модель вагона
        public model?: string,
        // Принадлежность
        public countryOwner?: string,
        // Тип вагона
        public vagonType?: number,
        // Глуходонный
        public isClosedFloor?: boolean,
        // Дата окончания аренды
        public rentalEndDate?: Date,
        // Грузоподъемность(т)
        public capacity?: number,
        // Тара(т)
        public tare?: number,
        // Дата создания
        public createdAt?: Date,
        public imgUrl?: string,
        // Тип собственности
        public ownType?: number,
        // Кол-во осей
        public axlesCount?: number,
        // Объем кузова(м3):
        public volume?: number,
        // Длина(м)
        public length?: number,
        // Собственник
        public ownerName?: string,
        // Арендатор
        public tenant?: string,
        // Оператор
        public operator?: string,
        // Пробег(км)
        public mileage?: number,
        // Год выпуска вагона
        public productionYear?: number,
        // Дата последнего ремонта
        public lastRepairDate?: number,
        // Дата следующего ремонта
        public nextRepairDate?: Date,
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
                product.imgUrl,
                product.ownType,
                product.axlesCount,
                product.volume,
                product.length,
                product.ownerName,
                product.tenant,
                product.operator,
                product.mileage,
                //Год выпуска вагона
                product.productionYear,
                // Дата последнего ремонта:
                product.lastRepairDate,
                // Дата следующего ремонта
                product.nextRepairDate,
                // Дата изменения:
                product.updatedAt
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

    vagonTypeList: simpleObj[] = [
        {value: 0, viewValue: 'Не выбрано'},
        {value: 1, viewValue: 'крытые'},
        {value: 2, viewValue: 'платформы'},
        {value: 3, viewValue: 'полувагоны'},
        {value: 4, viewValue: 'цистерны'}
    ];

    ownTypeList: simpleObj[] = [
        {value: 0, viewValue: 'Не выбрано'},
        {value: 1, viewValue: 'Собственник'},
        {value: 2, viewValue: 'Владелец'},
        {value: 3, viewValue: 'Арендатор'},
        {value: 4, viewValue: 'Оператор'}
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