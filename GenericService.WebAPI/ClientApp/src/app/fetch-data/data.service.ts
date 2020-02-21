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
 
    createProduct(product: Product) {
        console.log(product);
        return this.http.post(this.url, product);
    }
    updateProduct(product: Product) {
        console.log(product);
        return this.http.put(this.url + '/' + product._id.$oid, product);
    }
    deleteProduct(id: ObjectId) {
        return this.http.delete(this.url + '/' + id.$oid);
    }
}