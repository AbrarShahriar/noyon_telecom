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
import { QueryClient, QueryClientProvider } from "react-query";

const WithdrawHistory = React.lazy(() =>
  import("./pages/admin/pages/withdraw-history/WithdrawHistory")
);
const MakeWithdraw = React.lazy(() =>
  import("./pages/admin/pages/make-withdraw-req/MakeWithdraw")
);
const OfferList = React.lazy(() =>
  import("./pages/admin/pages/offer-list/OfferList")
);
const Noti = React.lazy(() => import("./pages/admin/pages/notis/Noti"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Offers = React.lazy(() => import("./pages/offers/Offers"));
const Recharge = React.lazy(() => import("./pages/recharge/Recharge"));
const Notifs = React.lazy(() => import("./pages/notification/Notifs"));
const Profile = React.lazy(() => import("./pages/profile/Profile"));
const Topup = React.lazy(() => import("./pages/topup/Topup"));
const Buy = React.lazy(() => import("./pages/buy/Buy"));
const History = React.lazy(() => import("./pages/history/History"));
const VipOffers = React.lazy(() => import("./pages/vip-offers/VipOffers"));
const Admin = React.lazy(() => import("./pages/admin/Admin"));
const AdminLogin = React.lazy(() => import("./pages/auth/AdminLogin"));
const Requests = React.lazy(() =>
  import("./pages/admin/pages/requests/Requests")
);
const ModeratorList = React.lazy(() =>
  import("./pages/admin/pages/moderator-list/ModeratorList")
);
const UserList = React.lazy(() =>
  import("./pages/admin/pages/user-list/UserList")
);
const CreateOffer = React.lazy(() =>
  import("./pages/admin/pages/create-offer/CreateOffer")
);
const AdminHistory = React.lazy(() =>
  import("./pages/admin/pages/history/AdminHistory")
);
const ModeratorLogin = React.lazy(() => import("./pages/auth/ModeratorLogin"));
const Moderator = React.lazy(() => import("./pages/moderator/Moderator"));

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
      <Route
        path="/recharge"
        element={<SuspenseWrapper element={<Recharge />} />}
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
        path="/offer-buy/:offerId"
        element={<SuspenseWrapper element={<Buy page="offer" />} />}
      />
      <Route
        path="/recharge-buy/:amount"
        element={<SuspenseWrapper element={<Buy page="recharge" />} />}
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
            element={
              <Topup type="membership" title="Membership" showBalanceMethod />
            }
          />
        }
      />
      <Route
        path="/vip-offers"
        element={<SuspenseWrapper element={<VipOffers />} />}
      />

      {/* ------------ADMIN ROUTES---------------- */}

      <Route
        path="/admin-login"
        element={<SuspenseWrapper element={<AdminLogin />} />}
      />

      <Route path="/admin">
        <Route
          index
          element={<SuspenseWrapper element={<Admin page={"admin"} />} />}
        />
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
          path="/admin/withdraw-requests"
          element={<SuspenseWrapper element={<Requests type={"withdraw"} />} />}
        />
        <Route
          path="/admin/moderator-list"
          element={<SuspenseWrapper element={<ModeratorList />} />}
        />
        <Route
          path="/admin/user-list"
          element={<SuspenseWrapper element={<UserList />} />}
        />
        <Route
          path="/admin/notification-list"
          element={<SuspenseWrapper element={<Noti />} />}
        />
        <Route
          path="/admin/create-offer"
          element={<SuspenseWrapper element={<CreateOffer />} />}
        />
        <Route
          path="/admin/offer-list"
          element={<SuspenseWrapper element={<OfferList />} />}
        />
        <Route
          path="/admin/admin-history"
          element={<SuspenseWrapper element={<AdminHistory />} />}
        />
        <Route
          path="/admin/withdraw-history"
          element={<SuspenseWrapper element={<WithdrawHistory />} />}
        />
      </Route>

      {/* ------------MODERATOR ROUTES---------------- */}

      <Route
        path="/moderator-login"
        element={<SuspenseWrapper element={<ModeratorLogin />} />}
      />

      <Route path="/moderator">
        <Route
          index
          element={
            <SuspenseWrapper element={<Moderator page={"moderator"} />} />
          }
        />

        <Route
          path="/moderator/offer-buy-requests"
          element={
            <SuspenseWrapper
              element={<Requests type={"offer"} isModerator />}
            />
          }
        />
        <Route
          path="/moderator/recharge-requests"
          element={
            <SuspenseWrapper
              element={<Requests type={"recharge"} isModerator />}
            />
          }
        />

        <Route
          path="/moderator/moderator-history"
          element={<SuspenseWrapper element={<AdminHistory isModerator />} />}
        />
        <Route
          path="/moderator/withdraw"
          element={<SuspenseWrapper element={<MakeWithdraw />} />}
        />
        <Route
          path="/moderator/withdraw-history"
          element={
            <SuspenseWrapper element={<WithdrawHistory isModerator />} />
          }
        />
      </Route>
    </Route>
  )
);

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2, refetchOnWindowFocus: false } },
});

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StateProvider initState={initState} reducer={reducer}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </StateProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
