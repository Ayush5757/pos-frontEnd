import React from "react";
import { createBrowserRouter } from "react-router-dom";
import {
  AuthLayout,
  Dashboard,
  Login,
  MainLayout,
  Profile,
  ListView,
  ShopListing,
  ShopMainPage,
  ShopProduct,
  Inventory,
  TableContainer,
  FoodCategories,
  ExpenseContainer,
  MenuCard,
  NotificationContainer,
  GeneralNotificationContainer,
  ShopNotificationOrderPanel,
  UserProfileStructure,
  ShopBanerImagesTaking,
  FasteOrderContainer,
  KotLogin,
  KotUser,
  KotTicketCounterContainer,
  CustomerLayout,
  OrderList,
  RoomsTableContainer,
  RoomInventory,
  NotificationRoomContainer,
  UserRoomSetting,
  RoomMenu,
  StaffPanel,
  FastOrderList,
  WaiterLoginContainer,
  WaiterUserContainer,
  WaiterContainer,
  WaiterMainLayout,
  WaiterInventorie,
  KOTMainLayout,
  TableRoomSettings,
  RoomOrderList,
  RoomSettings,
  BarCode,
  HomePage,
  Reminders,
  AdminLoginAdminLogin,
  AdminAuth,
  Admin,
} from "../utils/lazylodingimports";
import SignUp from "../containers/SignUp";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: (
      <h2 style={{ textAlign: "center" }}>
        Please go back to Previous Tab and try again
      </h2>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/kotlogin",
        element: <KotLogin />,
      },
      {
        path: "/loginwaiter",
        element: <WaiterLoginContainer />,
      },
    ],
  },

  {
    path: "/",
    element: <AdminAuth />,
    errorElement: (
      <h2 style={{ textAlign: "center" }}>
        Please go back to Previous Tab and try again
      </h2>
    ),
    children: [
      {
        path: "/my-admin-panel",
        element: <Admin />,
      },
    ],
  },

  {
    path: "/",
    element: <MainLayout />,
    errorElement: (
      <h2 style={{ textAlign: "center" }}>
        Please go back to Previous Tab and try again
      </h2>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/list-view",
        element: <ListView />,
      },
      {
        path: "/shop-inventory",
        element: <Inventory />,
      },
      {
        path: "/shop-tables-inventory",
        element: <TableContainer />,
      },
      {
        path: "/shop-dashboard",
        element: <Dashboard />,
      },
      {
        path: "/shop-food-categories",
        element: <FoodCategories />,
      },
      {
        path: "/shop-monthly-expanse-list",
        element: <ExpenseContainer />,
      },

      {
        path: "/general-notify-generalpanel",
        element: <GeneralNotificationContainer />,
      },
      {
        path: "/shop-notify-order-generate-to-confirm",
        element: <ShopNotificationOrderPanel />,
      },
      {
        path: "/user-profile-structure-beam",
        element: <UserProfileStructure />,
      },
      {
        path: "/user-profile-structure-images",
        element: <ShopBanerImagesTaking />,
      },
      {
        path: "/fast-order-customer",
        element: <FasteOrderContainer />,
      },
      {
        path: "/kot-create-user",
        element: <KotUser />,
      },
      {
        path: "/waiter-create-user",
        element: <WaiterUserContainer />,
      },
      {
        path: "/shop-order-list",
        element: <OrderList />,
      },
      {
        path: "/room-order-list",
        element: <RoomOrderList />,
      },
      {
        path: "/user-room-settings",
        element: <UserRoomSetting />,
      },
      {
        path: "/staff-panel",
        element: <StaffPanel />,
      },
      {
        path: "/shop-rooms-inventory",
        element: <RoomsTableContainer />,
      },
      {
        path: "/room-inventory",
        element: <RoomInventory />,
      },
      {
        path: "/fast-order-list",
        element: <FastOrderList />,
      },
      {
        path: "/table-settings",
        element: <TableRoomSettings />,
      },
      {
        path: "/room-settings",
        element: <RoomSettings />,
      },
      {
        path: "/bar-code-panel",
        element: <BarCode />,
      },
      {
        path: "/reminders",
        element: <Reminders />,
      },
    ],
  },
  {
    path: "/",
    element: <KOTMainLayout />,
    errorElement: (
      <h2 style={{ textAlign: "center" }}>
        Please go back to Previous Tab and try again
      </h2>
    ),
    children: [
      {
        path: "/kot-ticket-counter",
        element: <KotTicketCounterContainer />,
      },
    ],
  },

  {
    path: "/",
    element: <WaiterMainLayout />,
    errorElement: (
      <h2 style={{ textAlign: "center" }}>
        Please go back to Previous Tab and try again
      </h2>
    ),
    children: [
      {
        path: "/waiter-table-store",
        element: <WaiterContainer />,
      },
      {
        path: "/waiter-inventorie",
        element: <WaiterInventorie />,
      },
    ],
  },

  {
    path: "/",
    element: <CustomerLayout />,
    errorElement: (
      <h2 style={{ textAlign: "center" }}>
        Please go back to Previous Tab and try again
      </h2>
    ),
    children: [
      {
        path: "/shop-listing",
        element: <ShopListing />,
      },
      {
        path: "/shop-product",
        element: <ShopProduct />,
      },
      {
        path: "/shop-menu-card/:shop_id/:access?/:table_id?/:table_type_id?/:table_name?/:order_type?",
        element: <MenuCard />,
      },
      {
        path: "/shop-profile/:shop_id",
        element: <ShopMainPage />,
      },
      {
        path: "/customer-notification-order-notify",
        element: <NotificationContainer />,
      },
      {
        path: "/customer-room-notification-order-notify",
        element: <NotificationRoomContainer />,
      },
      //  for go to shopmain to Roommenu
      {
        path: "/shop-room-card/:shop_id?",
        element: <RoomMenu />,
      },
      {
        path: "/Maaadmin",
        element: <AdminLoginAdminLogin />,
      },
    ],
  },
]);

export default routes;
