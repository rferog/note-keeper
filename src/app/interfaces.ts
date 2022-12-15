interface Notes {
  id: Note;
}

interface Note {
  title: string;
  content: string;
}

interface NoteId {
  id: string;
}

export { Note, NoteId, Notes };
