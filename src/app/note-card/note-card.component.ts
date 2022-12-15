import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateNoteComponent } from '../create-note/create-note.component';
import { Note, Notes } from '../interfaces';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit {
  @Input() notes?: Notes;
  currentNote: string = "";

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(noteId: string, note: Note) {
    this.dialog.open(CreateNoteComponent, {
      data: {
        id: noteId,
        note: note,
      },
      width: "640px"
    });
  }

}
