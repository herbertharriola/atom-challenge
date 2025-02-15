import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { LayoutModule } from '@angular/cdk/layout';

import { AppComponent } from "./app.component";
import { LoginComponent } from './pages/login/login.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskItemComponent } from './pages/tasks/task-item/task-item.component';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './services/task.service';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [AppComponent, LoginComponent, TasksComponent, TaskItemComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    LayoutModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),  //Inicializar Firebase sin `compat`
    provideFirestore(() => getFirestore()),  //Firestore
    provideAuth(() => getAuth())
  ],
  providers: [TaskService],
  bootstrap: [AppComponent],
})
export class AppModule {}
