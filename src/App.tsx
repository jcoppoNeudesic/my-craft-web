import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppProvider } from "./providers/AppProvider";
import AppNavigator from "./components/AppNavigator";
import MyItemsList from "./components/MyItemsList";
import RawItemsList from "./components/RawItemsList";
import CraftingPage from "./components/CraftingPage";
import "./App.css";

const App: FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppNavigator />}>
            <Route path="explore" element={<RawItemsList />} />
            <Route path="my-items" element={<MyItemsList />} />
            <Route path="crafting" element={<CraftingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
