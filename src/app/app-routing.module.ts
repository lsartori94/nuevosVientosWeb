import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from '../pages/admin-page/admin-page.component';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { EventDetailsComponent } from '../pages/event-details/event-details.component';


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },
    // { path: 'detail/:id', component: HeroDetailComponent },
    { path: 'admin', component: AdminPageComponent }
];

export const RoutableComponents = [
    AdminPageComponent,
    HomePageComponent,
    EventDetailsComponent
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}