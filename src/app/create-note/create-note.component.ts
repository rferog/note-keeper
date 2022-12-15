import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { Note } from '../interfaces';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {
  updating = false;
  createNoteForm = this.formBuilder.group({
    title: "",
    content: "",
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: string, note: Note},
    private formBuilder: FormBuilder,
    private noteService: NoteService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.updating = this.data.id ? true : false;
    if (this.updating) {
      this.createNoteForm = this.formBuilder.group({
        title: this.data.note.title,
        content: this.data.note.content,
      });
    }
  }

  createNote(note: Note): void {
    note.title = note.title.trim();
    note.content = note.content.trim();
    this.noteService.createNote(note)
    .subscribe(_ => this.noteService.getNotes());
    this.toastr.info('Note created');
  }

  deleteNote() {
    this.noteService.deleteNote(this.data.id)
    .subscribe(_ => this.noteService.getNotes());
    this.toastr.info('Note deleted');
  }

  onSubmit(): void {
    this.updating = this.data.id ? true : false;
    if (this.updating) {
      this.updateNote(
        this.data.id,
        {
          title: this.createNoteForm.value.title ?? "",
          content: this.createNoteForm.value.content ?? "",
        }
      )
    } else {
      this.createNote({
        title: this.createNoteForm.value.title ?? "",
        content: this.createNoteForm.value.content ?? "",
      });
    }
    this.createNoteForm.reset();
  }

  updateNote(id: string, note: Note): void {
    note.title = note.title.trim();
    note.content = note.content.trim();
    this.noteService.updateNote(id, note)
    .subscribe(_ => this.noteService.getNotes());
    this.toastr.info('Note updated');
  }

}
