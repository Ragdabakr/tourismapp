import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

interface createUserProfileData{
    name: string;
    gender: string;
    birthplace: string;
    birthday: Date;
    livesin: string;
    occupation: string;
    phoneNumber: number;
    phoneCode: any;
    photo: string,
    about: string;
}
interface editUserProfileData{
    name: string;
    email: string;
    role: string;
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


export class UserService {

    constructor(private http: HttpClient) { }

    public getCountries(): Observable<any> {
        return this.http.get('/api/v1/lookups/countries');
    }

    public createUserProfile(data: createUserProfileData): Observable<any> {
        debugger;
        return this.http.post('/api/v1/users/create-profile', {data});
    }

    public sendProfileImage(image: string): Observable<any> {
        debugger;
        return this.http.post('/api/v1/image/upload-single-image', { image }, {
            reportProgress: true,
            observe: 'events'
        });
    }

    public getUsers(): Observable<any> {
        return this.http.get('/api/v1/users');
    }
    public deleteUser(deleteId: deletedId): Observable<any> {
        debugger;
        return this.http.delete(`/api/v1/users/${deleteId}`);
    }
    public updateUserProfile(data: editUserProfileData, editId: editId ): Observable<any> {
        debugger;
        return this.http.patch(`/api/v1/users/${editId}`, {data});
      }
    }