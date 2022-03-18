// Importar los modulos del router de angular
import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

// Importar componentes a las cuales les quiero hacer una pagina exclusiva
import{HomeComponent} from './components/home/home.component';
import{FormularioComponent} from './components/formulario/formulario.component';
import { BookComponent } from './components/book/book.component';
import { SearchComponent } from './components/search/search.component';
import { ErrorComponent } from './components/error/error.component';

// Array de rutas
const appRoutes: Routes =[
    {path: '', component :HomeComponent},
    {path:'home', component: HomeComponent},
    {path:'book/:id', component: BookComponent},  
    {path:'buscar/:search', component: SearchComponent},
    {path:'formulario', component: FormularioComponent},
    {path:'**',component: ErrorComponent}
];

// Exportar el modulo de rutas
export const appRoutingProviders: any[]=[];
export const routing : ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);