import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NoteCardComponent,
    CreateNoteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },],
  bootstrap: [AppComponent]
})
export class AppModule { }
