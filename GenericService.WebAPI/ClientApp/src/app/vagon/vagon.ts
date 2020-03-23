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
        public tenantName?: string,
        // Оператор
        public operatorName?: string,
        // Пробег(км)
        public mileage?: number,
        // Год выпуска вагона
        public productionYear?: number,
        // Дата последнего ремонта
        public lastRepairDate?: Date,
        // Дата следующего ремонта
        public nextRepairDate?: Date,
        // Дата изменения:
        public updatedAt?: Date,
        // Номер вагона
        public number?: string) {
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
                product.tenantName,
                product.operatorName,
                product.mileage,
                //Год выпуска вагона
                product.productionYear,
                // Дата последнего ремонта:
                product.lastRepairDate,
                // Дата следующего ремонта
                product.nextRepairDate,
                // Дата изменения:
                product.updatedAt,
                product.number
        );
    }
  
    vagonTypeList: simpleObj[] = [
        {value: 0, viewValue: 'Другое'},
        {value: 1, viewValue: 'Крытый'},
        {value: 2, viewValue: 'Платформа'},
        {value: 3, viewValue: 'Полувагон'},
        {value: 4, viewValue: 'Полувагон инновационный'},
        {value: 5, viewValue: 'Цистерна'}
    ];

    ownTypeList: simpleObj[] = [
        {value: 0, viewValue: 'Другое'},
        {value: 1, viewValue: 'Собственник'},
        {value: 2, viewValue: 'Арендатор'},
        {value: 3, viewValue: 'Оператор'}
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

    
    get vagonTypeName(): string {   
        return this.getFirstName(this.vagonTypeList, this.vagonType);
    }

    public get ownTypeName(): string {
        return this.getFirstName(this.ownTypeList, this.ownType);
    }

    public get rentalEndDateText(): string {
        return this.getFormatDate(this.rentalEndDate);
    }

    public get lastRepairDateText(): string {
        return this.getFormatDate(this.lastRepairDate);
    }

    public get nextRepairDateText(): string {
        return this.getFormatDate(this.nextRepairDate);
    }

    public get createdAtText(): string {
        return this.getFormatDateTime(this.createdAt);
    }

    public get updatedAtText(): string {
        return this.getFormatDateTime(this.updatedAt);
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