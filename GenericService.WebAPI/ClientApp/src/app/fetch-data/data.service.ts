import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Product, ObjectId } from './product';
 
@Injectable()
export class DataService {
 
    private url = "/api/generic";
 
    constructor(private http: HttpClient) {
    }
 
    getProducts() {
        return this.http.get(this.url);
    }

    getProduct(id: string) {
        return this.http.get(this.url + '/' + id);
    }
 
    createProduct(product: Product) {
        product.createdAt = new Date();
        return this.http.post(this.url, product, { observe: 'response' });
    }
    updateProduct(product: Product) {
        return this.http.put(this.url + '/' + product._id.$oid, product, { observe: 'response' });
    }
    deleteProduct(id: ObjectId) {
        return this.http.delete(this.url + '/' + id.$oid, { observe: 'response' });
    }
}