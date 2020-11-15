import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FullPagesRoutingModule } from "./full-pages-routing.module";
import { ChartistModule } from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GalleryPageComponent } from "./gallery/gallery-page.component";
import { InvoicePageComponent } from "./invoice/invoice-page.component";
import { HorizontalTimelinePageComponent } from "./timeline/horizontal/horizontal-timeline-page.component";
import { HorizontalTimelineComponent } from './timeline/horizontal/component/horizontal-timeline.component';
import { VerticalTimelinePageComponent } from "./timeline/vertical/vertical-timeline-page.component";
import { UserProfilePageComponent } from "./user-profile/user-profile-page.component";
import { SearchComponent } from './search/search.component';
import { FaqComponent } from './faq/faq.component';
import { KnowledgeBaseComponent } from './knowledge-base/knowledge-base.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FileUploadModule } from 'ng2-file-upload';
import { QuillModule } from 'ngx-quill';
import { TagInputModule } from 'ngx-chips';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../shared/shared.module';
import { ArchwizardModule } from 'angular-archwizard';
import { ToursModule } from './tours/tours.module';
import { UsersComponent } from './users/users.component';
import { FullPagesComponent } from './full-pages.component';
import { TravellersComponent } from './travellers/travellers/travellers.component';
import { TransportsComponent } from './transports/transports/transports.component';
import { HotelsComponent } from './hotels/hotels/hotels.component';
import { TravelAgentsComponent } from './travel-agents/travel-agents/travel-agents.component';
import { GuidesComponent } from './guides/guides.component';


@NgModule({
    imports: [
        CommonModule,
        FullPagesRoutingModule,
        FormsModule,
        ChartistModule,
        AgmCoreModule,
        NgbModule,
        Ng2SmartTableModule,
        FileUploadModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        QuillModule,
        TagInputModule,
        HttpModule,
        NgSelectModule,
        SharedModule,
        ArchwizardModule,
        ToursModule,

    ],
    declarations: [
        GalleryPageComponent,
        InvoicePageComponent,
        HorizontalTimelinePageComponent,
        HorizontalTimelineComponent,
        VerticalTimelinePageComponent,
        UserProfilePageComponent,
        SearchComponent,
        FaqComponent,
        KnowledgeBaseComponent,
        FullPagesComponent,
        TransportsComponent,
        UsersComponent,
        HotelsComponent,
        TravellersComponent,
        TravelAgentsComponent,
        GuidesComponent

        
    ]
})
export class FullPagesModule { }
