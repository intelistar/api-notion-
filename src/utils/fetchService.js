export class FetchService {
  constructor(url) {
    this.url = url;
  }
  handleFetch = (URL) => {
    return fetch(URL).then((r) => {
      if (!r.ok) throw new Error(`Fetch error: ${r.status}`);
      return r.json();
    });
  };
  getNotes = (authorId) =>
    this.handleFetch(`${this.url}/notes?authorId=${authorId}`);

  getNote = (id) => this.handleFetch(`${this.url}/notes/${id}`);

  getUser = (authorId) => this.handleFetch(`${this.url}/users/${authorId}`);

  getUserByEmail = (email) =>
    this.handleFetch(`${this.url}/users?email=${email}`);

  deleteNote = (id) =>
    fetch(`http://localhost:5001/notes/${id}`, {
      method: "DELETE",
    });

  addNote = async (newNote) => {
    await fetch(`http://localhost:5001/notes/`, {
      method: "POST",
      body: JSON.stringify(newNote),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  addUser = async (newUser) => {
    await fetch(`http://localhost:5001/users/`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  editNote = async (id, changedNote) => {
    await fetch(`http://localhost:5001/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changedNote),
    });
  };
}
