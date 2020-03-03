import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Vagon as Vagon, ObjectId } from './vagon';
 
@Injectable()
export class DataService {
 
    private url = "/api/generic";
 
    constructor(private http: HttpClient) {
    }
 
    getVagons() {
        return this.http.get(this.url);
    }

    getVagon(id: string) {
        return this.http.get(this.url + '/' + id);
    }
 
    createVagon(vagon: Vagon) {
        vagon.createdAt = new Date();
        return this.http.post(this.url, vagon, { observe: 'response' });
    }
    updateVagon(product: Vagon) {
        return this.http.put(this.url + '/' + product._id.$oid, product, { observe: 'response' });
    }
    deleteVagon(id: ObjectId) {
        return this.http.delete(this.url + '/' + id.$oid, { observe: 'response' });
    }
}