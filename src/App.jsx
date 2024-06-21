import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";
import { useState } from "react";

function App() {
  // Use initialEmails for state
  console.log(initialEmails);

  const [emails, setEmails] = useState(initialEmails);
  const [hideReadChecked, setHideReadChecked] = useState(false);
  const starredEmails = emails.filter((email) => email.starred === true);
  const emailsUnread = emails.filter((email) => email.read === false);

  // eslint-disable-next-line no-unused-vars
  function toggleRead(emailId) {
    const newEmails = emails.map((email) =>
      email.id === emailId ? { ...email, read: !email.read } : email
    );
    setEmails(newEmails);
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            onClick={() => {
              setEmails(initialEmails);
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{emailsUnread.length}</span>
          </li>
          <li
            className="item"
            onClick={() => {
              setEmails(starredEmails);
            }}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideReadChecked}
              onChange={() => {
                setHideReadChecked(hideReadChecked === false ? true : false);
                setEmails(
                  hideReadChecked === true ? initialEmails : emailsUnread
                );
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {emails.map((email) => (
          <li
            key={email.id}
            className={`email ${email.read ? "read" : "unread"}`}
            // onClick={toggleRead(email.id)}
          >
            <div className="select">
              <input
                className="select-checkbox"
                type="checkbox"
                checked={email.read}
              />
            </div>
            <div className="star">
              <input
                className="star-checkbox"
                type="checkbox"
                checked={email.starred}
              />
            </div>
            <div className="sender">{email.sender}</div>
            <div className="title">{email.title}</div>
          </li>
        ))}
      </main>
    </div>
  );
}

export default App;
