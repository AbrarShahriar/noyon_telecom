import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import Home from "./pages/home/Home";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import SuspenseWrapper from "./pages/shared/SuspenseWrapper";
import StateProvider from "./pages/shared/StateProvider";
import { initState, reducer } from "./reducer";
import AuthProvider from "./pages/auth/AuthProvider";
import BottomNav from "./pages/shared/BottomNav";
import Header from "./pages/shared/Header";

const Login = React.lazy(() => import("./pages/auth/Login"));
const Offers = React.lazy(() => import("./pages/offers/Offers"));
const Notifs = React.lazy(() => import("./pages/notification/Notifs"));
const Profile = React.lazy(() => import("./pages/profile/Profile"));
const Topup = React.lazy(() => import("./pages/topup/Topup"));
const History = React.lazy(() => import("./pages/history/History"));
const Admin = React.lazy(() => import("./pages/admin/Admin"));
const AdminLogin = React.lazy(() => import("./pages/auth/AdminLogin"));
const Requests = React.lazy(() =>
  import("./pages/admin/pages/requests/Requests")
);
const ModeratorList = React.lazy(() =>
  import("./pages/admin/pages/moderator-list/ModeratorList")
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <>
          <Header /> <BottomNav />
        </>
      }
    >
      <Route index element={<SuspenseWrapper element={<Home />} />} />
      <Route
        path="/offers"
        element={<SuspenseWrapper element={<Offers />} />}
      />
      <Route path="login" element={<SuspenseWrapper element={<Login />} />} />
      <Route
        path="/history"
        element={<SuspenseWrapper element={<History />} />}
      />
      <Route
        path="/profile"
        element={<SuspenseWrapper element={<Profile />} />}
      />
      <Route
        path="/notifications"
        element={<SuspenseWrapper element={<Notifs />} />}
      />
      <Route
        path="/topup"
        element={
          <SuspenseWrapper
            element={<Topup type="topup" title="Add Balance" />}
          />
        }
      />
      <Route
        path="/buy/:offerId"
        element={
          <SuspenseWrapper element={<Topup type="offer" title="Buy Offer" />} />
        }
      />
      <Route
        path="/recharge/:id"
        element={
          <SuspenseWrapper
            element={<Topup type="recharge" title="Recharge" />}
          />
        }
      />
      <Route
        path="/membership"
        element={
          <SuspenseWrapper
            element={<Topup type="membership" title="Membership" />}
          />
        }
      />

      {/* ------------ADMIN ROUTES---------------- */}

      <Route
        path="/admin-login"
        element={<SuspenseWrapper element={<AdminLogin />} />}
      />

      <Route path="/admin">
        <Route index element={<SuspenseWrapper element={<Admin />} />} />
        <Route
          path="/admin/membership-requests"
          element={
            <SuspenseWrapper element={<Requests type={"membership"} />} />
          }
        />
        <Route
          path="/admin/offer-buy-requests"
          element={<SuspenseWrapper element={<Requests type={"offer"} />} />}
        />
        <Route
          path="/admin/recharge-requests"
          element={<SuspenseWrapper element={<Requests type={"recharge"} />} />}
        />
        <Route
          path="/admin/topup-requests"
          element={<SuspenseWrapper element={<Requests type={"topup"} />} />}
        />
        <Route
          path="/admin/moderator-list"
          element={<SuspenseWrapper element={<ModeratorList />} />}
        />
      </Route>
    </Route>
  )
);

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider initState={initState} reducer={reducer}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </StateProvider>
  </React.StrictMode>
);
