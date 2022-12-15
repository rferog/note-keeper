import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';

import { Notes, Note } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private noteKeeperApiUrl
  = 'https://note-keeper-f522a-default-rtdb.firebaseio.com/notes';
  private notes: BehaviorSubject<Notes> = new BehaviorSubject<Notes>({
    id: {
      title: '',
      content: '',
    },
  });
  public notes$: Observable<Notes> = this.notes.asObservable();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  createNote(note: Note): Observable<Note> {
    return this.http.post<Note>(
      `${this.noteKeeperApiUrl}.json`, note, this.httpOptions
    ).pipe(
      catchError(this.handleError<Note>('Create note'))
    );
  }

  deleteNote(id: string): Observable<any> {
    return this.http.delete(`${this.noteKeeperApiUrl}/${id}.json`).pipe(
      catchError(this.handleError<Note>('Delete note'))
    );
  }

  getNotes() {
    const request = this.http.get<Notes>(`${this.noteKeeperApiUrl}.json`)
    .pipe(
      catchError(this.handleError<Notes>(
        'getNotes',
        {
          id: {
            title: "",
            content: "",
          }
        }
      )),
    )
    .subscribe(notes => {
      this.updateNotes(notes)});
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (): Observable<T> => {
      this.toastr.error(operation, 'Error');
      return of(result as T);
    };
  }

  updateNotes(updatedNotes: Notes) {
    this.notes.next(updatedNotes);
  }

  updateNote(id: string, note: Note): Observable<any> {
    return this.http.put(
      `${this.noteKeeperApiUrl}/${id}.json`, note, this.httpOptions
    ).pipe(
      catchError(this.handleError<Note>('Update note'))
    );
  }
}
