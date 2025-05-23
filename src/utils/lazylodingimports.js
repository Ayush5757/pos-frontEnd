import { lazy } from "react";

export const MainLayout = lazy(() => import('../containers/MainLayout'));
export const AuthLayout = lazy(() => import('../containers/AuthLayout'));
export const Login = lazy(() => import('../containers/Login'));
export const Dashboard = lazy(() => import('../containers/Dashboard'));
export const Profile = lazy(() => import('../containers/Profile'));
export const ListView = lazy(() => import('../containers/ListView'));
export const ShopListing = lazy(() => import('../containers/ShopListing'));
export const ShopMainPage = lazy(() => import('../containers/ShopMainPage'));
export const ShopProduct = lazy(() => import('../containers/ShopProduct'));
export const Inventory = lazy(() => import('../containers/Inventory'));
export const TableContainer = lazy(() => import('../containers/TableContainer'));
export const FoodCategories = lazy(() => import('../containers/Profile/FoodCategories'));
export const ExpenseContainer = lazy(() => import('../containers/Expense/ExpenseContainer'));
export const MenuCard = lazy(() => import('../containers/ShopMainPage/MenuCard'));
// Total Notify
export const NotificationContainer = lazy(() => import('../containers/NotificationContainer'));
export const NotificationRoomContainer = lazy(() => import('../containers/NotificationRoomContainer'));
// Discount Notify
export const GeneralNotificationContainer = lazy(() => import('../containers/GeneralNotificationContainer'));
// Order Notify
export const ShopNotificationOrderPanel = lazy(() => import('../containers/ShopNotificationOrderPanel'));
export const UserProfileStructure = lazy(() => import('../containers/UserProfileStructure'));
export const ShopBanerImagesTaking = lazy(() => import('../containers/ShopBanerImagesTaking/ShopBanerImagesTaking'));
export const FasteOrderContainer = lazy(() => import('../containers/FasteOrderContainer'));
export const KotLogin = lazy(() => import('../containers/KotLogin'));
export const KotUser = lazy(() => import('../containers/kotUser'));
export const KotTicketCounterContainer = lazy(() => import('../containers/KotTicketCounterContainer'));
export const CustomerLayout = lazy(() => import('../containers/CustomerLayout'));
export const OrderList = lazy(() => import('../containers/OrderList'));
export const RoomsTableContainer = lazy(() => import('../containers/RoomsTableContainer'));
export const RoomInventory = lazy(() => import('../containers/RoomInventory'));
export const UserRoomSetting = lazy(() => import('../containers/UserRoomSetting'));
export const RoomMenu = lazy(() => import('../containers/RoomMenu'));
export const StaffPanel = lazy(() => import('../containers/StaffPanel'));
export const FastOrderList = lazy(() => import('../containers/FastOrderList'));
export const WaiterLoginContainer = lazy(() => import('../containers/WaiterLoginContainer'));
export const WaiterUserContainer = lazy(() => import('../containers/WaiterUserContainer'));
export const WaiterContainer = lazy(() => import('../containers/WaiterContainer'));
export const WaiterMainLayout = lazy(() => import('../containers/WaiterMainLayout'));
export const WaiterInventorie = lazy(() => import('../containers/WaiterContainer/WaiterInventorie'));
export const KOTMainLayout = lazy(() => import('../containers/KOTMainLayout'));
export const TableRoomSettings = lazy(() => import('../containers/TableRoomSettings'));
export const RoomOrderList = lazy(() => import('../containers/OrderList/RoomOrderList'));
export const RoomSettings = lazy(() => import('../containers/TableRoomSettings/RoomSettings'));
export const BarCode = lazy(() => import('../containers/BarCode'));
export const HomePage = lazy(() => import('../containers/HomePage'));
export const Reminders = lazy(() => import('../containers/Reminders'));
export const AdminLoginAdminLogin = lazy(() => import('../containers/AdminLogin'));
export const AdminAuth = lazy(() => import('../containers/AdminAuth'));
export const Admin = lazy(() => import('../containers/Admin'));
