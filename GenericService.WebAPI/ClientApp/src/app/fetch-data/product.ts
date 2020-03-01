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
}

export class ObjectId {
    constructor(
        public $oid?: string,
        ) { }
}