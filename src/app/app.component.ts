import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

import { Notes } from './interfaces';
import { NoteService } from './note.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  localStorageDarkMode = localStorage.getItem('darkMode');
  darkMode = this.localStorageDarkMode === 'true' ? true : false;
  notes: Notes = {
    id: {
      title: '',
      content: '',
    },
  };

  constructor(
    private elementRef: ElementRef,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.noteService.getNotes();
    this.getNotes();
  }

  ngAfterViewInit() {
    document.documentElement.setAttribute(
      'data-theme', this.darkMode ? 'dark' : 'light'
    );
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = this.darkMode ?
      'rgb(38, 38, 38)' : 'rgb(240, 240, 240)';
  }

  getNotes(): void {
    this.noteService.notes$.subscribe(notes => this.notes = notes)
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    document.documentElement.setAttribute(
      'data-theme', this.darkMode ? 'dark' : 'light'
    );
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = this.darkMode ?
      'rgb(38, 38, 38)' : 'rgb(240, 240, 240)';
    localStorage.setItem('darkMode', `${this.darkMode}`);
  }
}
