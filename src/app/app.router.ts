import {ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat.component';
import { HomeComponent } from './components/home.component';

export const router: Routes = [
    { path: 'logout', redirectTo: '', pathMatch: 'full' },
    { path: '', component: HomeComponent },
    { path: '**', component: ChatComponent },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);