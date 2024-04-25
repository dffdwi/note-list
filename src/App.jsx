import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import NoteDetailPage from "./pages/NoteDetailPage";
import ArchivePage from "./pages/ArchivePage";
import AddNotePage from "./pages/AddNotePage";
import NotFoundPage from "./pages/NotFoundPage";
import "./style/style.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { getUserLogged, putAccessToken } from "./utils/api";
import Navigation from "./component/Navigation";
import { ThemeProvider } from "./contexts/ThemeContext";
import ToggleTheme from "./component/ToggleTheme";
import { LocaleProvider } from "./contexts/LocaleContext";
import ToggleLocale from "./component/ToggleLocale";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem("theme") || "light",
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === "light" ? "dark" : "light";
          localStorage.setItem("theme", newTheme);
          return {
            theme: newTheme,
          };
        });
      },
      localeContext: {
        locale: localStorage.getItem("locale") || "id",
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale =
              prevState.localeContext.locale === "id" ? "en" : "id";
            localStorage.setItem("locale", newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale,
              },
            };
          });
        },
      },
    };
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    document.documentElement.setAttribute("data-theme", this.state.theme);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute("data-theme", this.state.theme);
    }
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });
    putAccessToken("");
  }

  render() {
    const { locale } = this.state.localeContext;

    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <ThemeProvider value={this.state}>
          <LocaleProvider value={this.state.localeContext}>
            <div className="note-app">
              <header className="note-app__header">
                <h1>
                  {locale === "id" ? "Catatan Pribadi" : "Personal Notes"}
                </h1>
                <ToggleLocale />
                <ToggleTheme />
              </header>
              <main>
                <Routes>
                  <Route
                    path="/*"
                    element={<LoginPage loginSuccess={this.onLoginSuccess} />}
                  />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
              </main>
            </div>
          </LocaleProvider>
        </ThemeProvider>
      );
    }
    return (
      <ThemeProvider value={this.state}>
        <LocaleProvider value={this.state.localeContext}>
          <Navigation
            logout={this.onLogout}
            name={this.state.authedUser.name}
          />
          <Routes>
            <Route path="/" element={<NotesPage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/add-note" element={<AddNotePage />} />
            <Route path="/note/:id" element={<NoteDetailPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </LocaleProvider>
      </ThemeProvider>
    );
  }
}

export default App;
