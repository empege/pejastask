import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar/Navbar'
import Users from './components/Users/Users'
import UserForm from './components/Users/UserForm'
import Companies from './components/Companies/Companies'
import CompanyForm from './components/Companies/CompanyForm'
import Newsletter from './components/Newsletter/Newsletter'
import PostDetails from './components/Newsletter/PostDetails'
import { AppProvider } from './context';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Navbar />

        <Switch>
          <Route component={Users} exact path="/" />

          <Route component={Users} exact path="/users" />
          <Route component={UserForm} path="/users/user/:id" />
          <Route component={UserForm} path="/users/:id/:companyIdParam?" />

          <Route component={Companies} exact path="/companies" />
          <Route component={CompanyForm} path="/companies/company/:id" />
          <Route component={CompanyForm} path="/companies/:id" />

          <Route component={Newsletter} path="/newsletter" />
          <Route component={PostDetails} path="/postdetails/:id" />

          <Route path="*">
            <div>ERROR!</div>
          </Route>

        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
