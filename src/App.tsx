import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Auth from "./pages/auth";
import HomeLayout from "./components/homeLayout";
import Team from "./pages/team";
import Gallery from "./pages/gallery";
import CashflowLayout from "./components/cashflowLayout";
import AddExpenseEQ from "./pages/addExpenseEQ";
import AddExpenseMD from "./pages/addExpenseMD";
import ViewdataEQ from "./pages/viewdataEQ";
import CheckListEQ from "./pages/checkListEQ";
import RestrictUser from "./components/RestrictUser";
import { ViewdataLayout } from "./components/ViewdataLayout";
import ViewdataMD from "./pages/viewDataMD";
import Chashflow from "./pages/cashflow";
import AddContribution from "./pages/addContribution";
import { useCashSocketListener } from "./hook/useCashSocketListener.ts";
import SessionDetails from "./pages/SessionDetails.tsx";
import AdminPanel from "./pages/adminPanel.tsx";

function App() {
  useCashSocketListener();
  return (
    <>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/team" element={<Team />} />
          <Route path="/gallery" element={<Gallery />} />
          {/* <Route path="/ws" element={<WsPage />} /> */}

          <Route element={<RestrictUser />}>
          <Route path="/admin-panel" element={<AdminPanel />} />
            <Route element={<CashflowLayout />}>
              
              <Route path="/cashflow" element={<Chashflow />} />
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
                  path="/cashflow/equip/checklist"
                  element={<CheckListEQ />}
                />
                <Route
                  path="/cashflow/matchday/view-data"
                  element={<ViewdataMD />}
                />
              </Route>
              <Route path="/cashflow/eqip/chcklist" element={<CheckListEQ />} />
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
      </Routes>
    </>
  );
}

export default App;
