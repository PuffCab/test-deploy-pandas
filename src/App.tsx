import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Outlet,
  Link,
} from "react-router-dom";
import "./App.css";
import CharactersList from "./pages/CharactersList";
import About from "./pages/About";
import MyNavbar from "./components/MyNavbar";
import NoMatchPage from "./pages/NoMatchPage";
// import CharacterDetails from "./pages/CharacterDetails";
import Home from "./pages/Home";
import { CharactersContextProvider } from "./context/CharactersContext";
import Contact from "./pages/Contact";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<NoMatchPage />}>
        <Route index element={<Home />} />
        <Route
          path="characters"
          element={
            <ProtectedRoute>
              <CharactersList />
            </ProtectedRoute>
          }
        />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        {/* <Route path="*" element={<NoMatchPage />} /> */}
      </Route>
    )
  );

  //NOTE below we create our router as an array of routes
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Root />,
  //     children: [
  //       {
  //         index: true,
  //         element: <Home />,
  //       },
  //       {
  //         path: "characters",
  //         element: <CharactersList />,
  //       },
  //       {
  //         path: "about",
  //         element: <About />,
  //       },
  //       {
  //         path: "characters/:name",
  //         element: <CharacterDetails />,
  //       },
  //     ],
  //   },
  // ]);

  return (
    <>
      <h1>Rick and Morty fansite</h1>
      {/*  //! 5-Give access to the context to the components you want by wrapping them inside the context's provider */}
      <AuthContextProvider>
        <CharactersContextProvider>
          <RouterProvider router={router} />
        </CharactersContextProvider>
      </AuthContextProvider>
    </>
  );
}

const Root = () => {
  return (
    <>
      <MyNavbar />
      <Outlet />
    </>
  );
};
export default App;
