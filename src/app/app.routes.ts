import { Routes } from '@angular/router';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { AppComponent } from './app.component';
import { BuildComponent } from './components/builder/build/build.component';
import { RulesComponent } from './components/builder/rules/rules.component';
import { PublishComponent } from './components/builder/publish/publish.component';
import { PreviewComponent } from './components/preview/preview.component';
import { QuickshareComponent } from './components/builder/publish/quickshare/quickshare.component';
import { DownloadComponent } from './components/builder/publish/download/download.component';
import { AssignformsComponent } from './components/builder/publish/assignforms/assignforms.component';

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
                component:PublishComponent,
                children:[
                    {
                        path:"quickshare",
                        component:QuickshareComponent
                    },
                    {
                        path:"download",
                        component:DownloadComponent
                    }
                    ,
                    {
                        path:"assignforms",
                        component:AssignformsComponent
                    }
                ]
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
