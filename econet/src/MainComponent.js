import { BrowserRouter, Routes, Route } from "react-router-dom";
import { theme } from "./theme.js";
import { ThemeProvider } from "@mui/material";

// pages

import MainPage from "./pages/MainPage.js";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage.js";
import SettingPage from "./pages/SettingPage";
import TodayPage from "./pages/TodayPage";
import LocationPage from "./pages/LocationPage.js";
import EcoNewsPage from "./pages/EcoNewsPage.js";
import AccountSettingPage from "./pages/AccountSettingPage.js";
import MyPage from "./pages/MyPage.js";
import App from "./components/App";

function MainComponent() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<MainPage />} />
            <Route path="signin">
              <Route index element={<SignInPage />} />
            </Route>
            <Route path="signup">
              <Route index element={<SignUpPage />} />
            </Route>
            <Route path="setting">
              <Route index element={<SettingPage />} />
            </Route>
            <Route path="today">
              <Route index element={<TodayPage />} />
            </Route>
            <Route path="location">
              <Route index element={<LocationPage />} />
            </Route>
            <Route path="econews">
              <Route index element={<EcoNewsPage />} />
            </Route>
            <Route path="mypage">
              <Route index element={<MyPage />} />
            </Route>
            <Route path="account">
              <Route index element={<AccountSettingPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default MainComponent;
