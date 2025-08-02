import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { useCashSocketListener } from "./hook/useCashSocketListener";

const Loader = () => <div className="p-8 text-center text-lg font-semibold">⏳ Loading...</div>;



const Home = lazy(() => import("./pages/home"));
const Auth = lazy(() => import("./pages/auth"));
const HomeLayout = lazy(() => import("./components/homeLayout"));
const Team = lazy(() => import("./pages/team"));
const Gallery = lazy(() => import("./pages/gallery"));
const CashflowLayout = lazy(() => import("./components/cashflowLayout"));
const AddExpenseEQ = lazy(() => import("./pages/addExpenseEQ"));
const AddExpenseMD = lazy(() => import("./pages/addExpenseMD"));
const ViewdataEQ = lazy(() => import("./pages/viewdataEQ"));
const ViewdataMD = lazy(() => import("./pages/viewDataMD"));
const ViewdataLayout = lazy(() => import("./components/ViewdataLayout"));
const Chashflow = lazy(() => import("./pages/cashflow"));
const AddContribution = lazy(() => import("./pages/addContribution"));
const SessionDetails = lazy(() => import("./pages/SessionDetails"));
const AdminPanel = lazy(() => import("./pages/adminPanel"));
const ProfilePage = lazy(() => import("./pages/profilePage"));
const Checklist = lazy(() => import("./components/checkList"));
const RestrictUser = lazy(() => import("./components/RestrictUser"));
const MemberOnly = lazy(() => import("./components/memberOnly"));


function App() {
   useCashSocketListener();
  return (
    <>
      <Toaster />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/team" element={<Team />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route element={<RestrictUser />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route element={<CashflowLayout />}>
                <Route element={<MemberOnly />}>
                  <Route path="/admin-panel" element={<AdminPanel />} />
                  <Route path="/cashflow" element={<Chashflow />} />
                  <Route path="/checklist" element={<Checklist />} />
                  <Route
                    path="/cashflow/equip/add-expense"
                    element={<AddExpenseEQ />}
                  />
                  <Route element={<ViewdataLayout />}>
                    <Route
                      path="/cashflow/equip/view-data"
                      element={<ViewdataEQ />}
                    />
                    <Route
                      path="/cashflow/matchday/view-data"
                      element={<ViewdataMD />}
                    />
                  </Route>
                  <Route
                    path="/cashflow/matchday/add-expense"
                    element={<AddExpenseMD />}
                  />
                  <Route
                    path="/cashflow/matchday/add-contribution"
                    element={<AddContribution />}
                  />
                  <Route path="/session/:id" element={<SessionDetails />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
