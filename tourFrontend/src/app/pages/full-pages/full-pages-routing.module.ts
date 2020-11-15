import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryPageComponent } from "./gallery/gallery-page.component";
import { InvoicePageComponent } from "./invoice/invoice-page.component";
import { HorizontalTimelinePageComponent } from "./timeline/horizontal/horizontal-timeline-page.component";
import { VerticalTimelinePageComponent } from "./timeline/vertical/vertical-timeline-page.component";
import { UserProfilePageComponent } from "./user-profile/user-profile-page.component";
import { SearchComponent } from './search/search.component';
import { FaqComponent } from './faq/faq.component';
import { KnowledgeBaseComponent } from './knowledge-base/knowledge-base.component';
import { CreateTourComponent } from './tours/create-tour/create-tour.component';
import { TravellersComponent } from './travellers/travellers/travellers.component';
import { HotelsComponent } from './hotels/hotels/hotels.component';
import { TravelAgentsComponent } from './travel-agents/travel-agents/travel-agents.component';
import { TransportsComponent } from './transports/transports/transports.component';
import { UsersComponent } from './users/users.component';
import { GuidesComponent } from './guides/guides.component';

const routes: Routes = [
  {
    path: '',
    children: [
       
      {
        path: 'gallery',
        component: GalleryPageComponent,
        data: {
          title: 'Gallery Page'
        }
      },
      {
        path: 'invoice',
        component: InvoicePageComponent,
        data: {
          title: 'Invoice Page'
        }
      },      
      {
        path: 'horizontaltimeline',
        component: HorizontalTimelinePageComponent,
        data: {
          title: 'Horizontal Timeline Page'
        }
      },
      {
        path: 'verticaltimeline',
        component: VerticalTimelinePageComponent,
        data: {
          title: 'Vertical Timeline Page'
        }
      },
      {
        path: 'search',
        component: SearchComponent,
        data: {
          title: 'Search'
        }
      },
      {
        path: 'faq',
        component: FaqComponent,
        data: {
          title: 'FAQ'
        }
      },
      {
        path: 'kb',
        component: KnowledgeBaseComponent,
        data: {
          title: 'Knowledge Base'
         }
        },
        {
          path: 'createTour',
          component: CreateTourComponent,
          data: {
            title: 'Create tour'
            }
          },
          {
            path: 'users',
            component: UsersComponent,
            data: {
              title: 'Users'
              }
           }, 
           {
            path: 'travellers',
            component: HotelsComponent,
            data: {
              title: 'Travellers'
              }
           },
           {
            path: 'guides',
            component: GuidesComponent,
            data: {
              title: 'Guides'
              }
           },
           {
            path: 'travelAgents',
            component: TravelAgentsComponent,
            data: {
              title: 'TravelAgentS'
              }
           },
           {
            path: 'transports',
            component: TransportsComponent,
            data: {
              title: 'Transports'
              }
           },
           {
            path: 'hotels',
            component: HotelsComponent,
            data: {
              title: 'Hotels'
              }
           },
           {
            path: 'profile',
            component: UserProfilePageComponent,
            data: {
              title: 'Profile'
              }
           },

        // {
        //     path: 'tours',
        //     loadChildren: './tours/tours.module#ToursModule'
        // },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
