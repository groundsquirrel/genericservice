export class Product {
    constructor(
        public _id?: ObjectId,
        public name?: string,
        public company?: string,
        public os?: number,
        public deliveryDate?: Date,
        public price?: number) { }
}

export class ObjectId {
    constructor(
        public $oid?: string,
        ) { }
}