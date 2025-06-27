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
import WsPage from "./pages/WsPage";
import { useCashSocketListener } from "./hook/useCashSocketListener.ts"; 


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
          
          <Route element={<CashflowLayout />}>
            <Route element={<RestrictUser />}>
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
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
