import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

interface createBus {
    busNumber: string;
    brand: string;
    maxPassengerSize: number;
    size: string;
    color: string;
}


interface editBusData{
    busNumber: string;
    brand: string;
    maxPassengerSize: number;
    size: string;
    color: string;
}
interface createHotel {
    name: string;
    phone: number;
    city: string;
    address: string;
}
interface editHotelData {
    name: string;
    phone: number;
    city: string;
    address: string;
}
interface deletedId {
    id: string;
}
interface editId {
    id: string;
}

@Injectable({
    providedIn: 'root'
})


export class TourService {

    constructor(private http: HttpClient) { }

    public getCountries(): Observable<any> {
        return this.http.get('/api/v1/lookups/countries');
    }

   

    public sendProfileImage(image: string): Observable<any> {
        debugger;
        return this.http.post('/api/v1/image/upload-single-image', { image }, {
            reportProgress: true,
            observe: 'events'
        });
    }

    //Buses Section

    public getBuses(): Observable<any> {
        debugger;
        return this.http.get('/api/v1/buses');
    }
    public createBus(data: createBus): Observable<any> {
        debugger;
        return this.http.post('/api/v1/buses', { data });
    }
    public deleteBus(deleteId: deletedId): Observable<any> {
        debugger;
        return this.http.delete(`/api/v1/buses/${deleteId}`);
    }
    public updateBus(data: editBusData, editId: editId): Observable<any> {
        debugger;
        return this.http.patch(`/api/v1/buses/${editId}`, { data });
    }
    //HotelsSection

    public getHotels(): Observable<any> {
        return this.http.get('/api/v1/hotels');
    }
    public createHotel(data: createHotel): Observable<any> {
        debugger;
        return this.http.post('/api/v1/hotels', { data });
    }
    public deleteHotel(deleteId: deletedId): Observable<any> {
        debugger;
        return this.http.delete(`/api/v1/hotels/${deleteId}`);
    }
    public updateHotel(data: editHotelData, editId: editId): Observable<any> {
        debugger;
        return this.http.patch(`/api/v1/hotels/${editId}`, { data });
    }
    public createTour(data:any): Observable<any> {
        debugger;
      return this.http.post('/api/v1/tours', { data });
    }
}
