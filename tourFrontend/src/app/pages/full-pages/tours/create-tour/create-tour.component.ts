import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { QuillEditorComponent } from 'ngx-quill';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ChangeDetectionStrategy } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import Quill from 'quill';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';
import { UserService } from '../../../../shared/services/user.service';
import { TourService } from '../../../../shared/services/tour.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
const URL = 'http://localhost:3000/api/v1/image/upload-image';

@Component({
    selector: 'app-create-tour',
    templateUrl: './create-tour.component.html',
    styleUrls: ['./create-tour.component.scss']
})
export class CreateTourComponent implements OnInit {
controls:any;

    //Upload single images
    uploader: FileUploader = new FileUploader({
        url: URL,
        isHTML5: true
    });
    response: string;
    uploadedFile: File;
    fileAvalable: boolean;
    selectedFile: any;
    progress: boolean;
    fileUploadProgress: string;

    //upload multiple images
    myFiles = [];
    selectedImageFile: any;
    selectedImages: any;

    //Alert
    error: boolean = false;
    alert: string;
    successAlert: string;
    success: boolean = false;

    //Editor
    @ViewChild('editor') editor: QuillEditorComponent
    selectedCity: any;
    title = 'Quill works!';
    hide = false;
    isReadOnly = false;

    //Arays 
    data = [];
    difficulty = ['easy', 'medium', 'difficult'];
    Tourtype = ['International', 'Domestic'];
    allLocations = [];
    buses = [];
    hotels = [];

    //Start t our dates
    startDatesArray = [];
    addNew: boolean = false;



    dataForm = new FormGroup(
        {
            name: new FormControl('', [
                Validators.required,
            ]),
            duration: new FormControl('', [
                Validators.required,
            ]),
            maxGroupSize: new FormControl('', [
                Validators.required,
            ]),
            difficulty: new FormControl('', [
                Validators.required,
            ]),
            type: new FormControl('', [
                Validators.required,
            ]),
            guides: new FormControl('', [
                Validators.required,
            ]),
            price: new FormControl('', [
                Validators.required,
            ]),
            priceDiscount: new FormControl(''),
            summary: new FormControl('', [
                Validators.required,
                Validators.minLength(9),
                Validators.maxLength(100),

            ]),
            description: new FormControl('', [
                Validators.required,
                Validators.minLength(9),
                Validators.maxLength(500),
            ]),
            startDates: new FormArray([this.addStartDates()]),
            startLocation: new FormGroup(
                {
                    // GeoJSON
                    description: new FormControl('', [
                        Validators.required,
                    ]),
                    day: new FormControl('', [
                        Validators.required,
                    ]),
                    address: new FormControl('', [
                        Validators.required,
                    ]),
                    latitude : new FormControl('', [
                        Validators.required,
                    ]),
                    longitude: new FormControl('', [
                        Validators.required,
                    ]),
                    coordinates: new FormArray([]),
                    type: new FormControl('Point')

                }),

        }
    );

    imageForm = new FormGroup(
        {
            imageCover: new FormControl(''),
           // images: new FormArray([]),

        }
    );


    locationForm = this.fb.group({
        locations: this.fb.array([this.addLocations()]),
    });








    constructor(private userService: UserService, private tourService: TourService, private fb: FormBuilder,) {
    }

    ngOnInit() {
        // Get Users
        this.userService.getUsers().subscribe({
            next: response => {
                this.data = response.data.docs;
            },
            error: err => {
                console.log(err);
            }
        });
        // Get Tours Buses
        this.tourService.getBuses().subscribe({
            next: response => {
                this.buses = response.data.docs.map((i) => { i.busData = i.brand + ' ' + i.color + ' ' + i.busNumber; return i; });
                console.log(this.buses);
            },
            error: err => {
                console.log(err);
            }
        });
        // Get Tours Hotels
        this.tourService.getHotels().subscribe({
            next: response => {
                this.hotels = response.data.docs;
            },
            error: err => {
                console.log(err);
            }
        });


    }


    setFocus($event) {

    }

    // Locations Array

    addLocationButtonClick(): void {
        const locations = this.locationForm.controls.locations as FormArray;
        this.allLocations = locations.value;
        console.log(this.allLocations);
        locations.push(this.addLocations());
    }
    addLocations(): FormGroup {
        return this.fb.group({
            type: ['Point'],
            description: ['', [Validators.required]],
            latitude : ['', [Validators.required]],
            longitude: ['', [Validators.required]],
            address: ['', [Validators.required]],
            day: ['', [Validators.required]],
            buses: ['', [Validators.required]],
            hotels: ['', [Validators.required]],
            guides: ['', [Validators.required]],
            coordinates: [''],
        });
    }
  

    // Srtart dates Array

    addStartDatesButtonClick(): void {
        const startDates = this.dataForm.controls.startDates as FormArray;
        this.startDatesArray = startDates.value;
        startDates.push(this.addStartDates());
        this.addNew = true;
    }
    addStartDates(): FormGroup {
        return this.fb.group({
            date: ['', [Validators.required]],
        });
    }


    // Image upload  ReadAsBase64

    ReadAsBase64(file): Promise<any> {
        const reader = new FileReader();
        const fileValue = new Promise((resolve, reject) => {
            reader.addEventListener('load', () => {
                resolve(reader.result);
            });

            reader.addEventListener('error', (event) => {
                reject(event);
            });
            reader.readAsDataURL(file);
        });
        return fileValue;
    }

    //upload single image

    OnFileSelect(event) {

        const file: File = event[0];
        this.uploadedFile = file;
        const sizeImage = file.size;
        if (sizeImage > 10000000) {
            this.fileAvalable = false;
            alert('File is too big!');
            const fileImage = '';
            this.progress = false;
            this.ReadAsBase64(fileImage).then(result => {
                this.selectedFile = result;
            }).catch(err => console.log(err));
        } else {
            this.ReadAsBase64(file).then(result => {
                this.selectedFile = result;
                console.log('ccc', this.selectedFile);
                console.log('xx989x', this.imageForm);
                this.imageForm.patchValue({
                    imageCover: this.selectedFile
                });
                console.log('xxx', this.imageForm);
            }).catch(err => console.log(err));
        }

    }
    //upload multiple images

    onFileChange(event) {
        this.selectedImages = event.target.files;
        for (var i = 0; i < event.target.files.length; i++) {
            //console.log('size', event.target.files[i].size);
            if (event.target.files[i].size > 10000000) {
                this.fileAvalable = false;
                alert('File is too big!');
            } else {
                this.ReadAsBase64(event.target.files[i]).then(result => {
                    this.selectedImageFile = result;
                    this.myFiles.push(this.selectedImageFile);
                });
            }
        }

    }

    //delete upload image
    removeImage(image) {
        console.log(image);
        this.myFiles.filter(m => m = image);
    }

    // To validate all form fields, we need to iterate throughout all form controls:
    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }


    // On submit link click
    onFirstSubmit() {

        if (this.dataForm.invalid) {
            window.scroll(0, 0); // scroll to top of page;
            this.alert = 'Make sure that you fill out all required fields in first step';
            this.validateAllFormFields(this.dataForm); // Triger postForm validation
            this.error = true;
            setTimeout(() => {
                this.error = false;
            }, 8000);
        }
    }
    // On submit link click
    onSecondgggSubmit() {

        if (this.locationForm.invalid) {
            window.scroll(0, 0); // scroll to top of page;
            this.alert = 'Make sure that you fill out all required fields in second step';
            this.validateAllFormFields(this.locationForm); // Triger postForm validation
            this.error = true;
            setTimeout(() => {
                this.error = false;
            }, 8000);
        }
    }
    onSecondSubmit() {

        if (this.imageForm.invalid) {
            window.scroll(0, 0); // scroll to top of page;
            this.alert = 'Make sure that you fill out all required fields in third step';
            this.validateAllFormFields(this.imageForm); // Triger postForm validation
            this.error = true;
            setTimeout(() => {
                this.error = false;
            }, 8000);
        }
        else {

            // this.dataForm[0].startLocation.patchValue({
            //     coordinates: [ this.dataForm[0].startLocation.longitude, this.dataForm[0].startLocation.latitude]
            //   });
           
            const stepsData = {
                name: this.dataForm.get('name').value,
                duration: this.dataForm.get('duration').value,
                maxGroupSize: this.dataForm.get('maxGroupSize').value,
                difficulty: this.dataForm.get('difficulty').value,
                type: this.dataForm.get('type').value,
                price: this.dataForm.get('price').value,
                priceDiscount: this.dataForm.get('priceDiscount').value,
                summary: this.dataForm.get('summary').value,
                description: this.dataForm.get('description').value,
                startLocation: this.dataForm.get('startLocation').value,
                guides: <FormArray>this.dataForm.controls["guides"].value,
                startDates: <FormArray>this.dataForm.controls["startDates"].value,
                locations: <FormArray>this.locationForm.controls["locations"].value,
                //imageCover: this.selectedFile,
               // images: this.myFiles,
            }
            console.log('stepsData', stepsData);

            this.tourService.createTour(stepsData).subscribe({
                next: response => {
                    console.log(response);
                    window.scroll(0, 0); // scroll to top of page;
                    this.successAlert = 'Your profile is added succeccfuly';
                    this.success = true;
                    setTimeout(() => {
                        this.success = true;
                        // window.location.href = '/job-list';
                    }, 7000);
                },
                error: err => {
                    console.log(err);
                    if (!err.status) {
                        this.dataForm.setErrors({ noConnection: true });
                    } else {
                        this.dataForm.setErrors({ unknownError: true });
                    }
                }
            });
        }
    }


    // validate Select input 
    get hasDifficultyError() {
        return (
            this.dataForm.get('difficulty').touched &&
            this.dataForm.get('difficulty').errors &&
            this.dataForm.get('difficulty').errors.required
        )
    }
    get hasGuidesError() {
        return (
            this.dataForm.get('guides').touched &&
            this.dataForm.get('guides').errors &&
            this.dataForm.get('guides').errors.required
        )
    }
    get hasTourGuidesError() {
        return (
            this.dataForm.get('guides').touched &&
            this.dataForm.get('guides').errors &&
            this.dataForm.get('guides').errors.required
        )
    }
    get hasBusesError() {
        return (
            this.dataForm.controls["buses"].touched &&
            this.dataForm.get('buses').errors &&
            this.dataForm.get('buses').errors.required
        )
    }
    get hasHotelsError() {
        return (
            this.dataForm.get('hotels').touched &&
            this.dataForm.get('hotels').errors &&
            this.dataForm.get('hotels').errors.required
        )
    }
}