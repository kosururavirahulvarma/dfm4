import { Routes } from '@angular/router';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { AppComponent } from './app.component';
import { BuildComponent } from './components/builder/build/build.component';
import { RulesComponent } from './components/builder/rules/rules.component';
import { PublishComponent } from './components/builder/publish/publish.component';
import { PreviewComponent } from './components/preview/preview.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch :'full'

    },
    {
        path:'home',
        component: NavbarComponent,
        children:[
            {
                path:"build",
                component:BuildComponent
            },
            {
                path:"rules",
                component:RulesComponent
            },
            {
                path:"publish",
                component:PublishComponent
            },
            {
                path:"preview",
                component:PreviewComponent
            }
        ]
            
        
        
    },
    {
        path:'navbar',
        component: NavbarComponent
    }
   
];
