
import React from 'react';
import InputDetails from './Users/InputDetailsComponent';
import OverView from './Overview/OverViewComponent';
import {Switch, Route} from 'react-router-dom'
export function AppRouter(){

    return(
        <Switch>
            <Route path="/" exact={true}>
              <OverView />
            </Route>
            <Route path="/OverView" exact={true}>
              <OverView/>
            </Route>
            <Route path="/InputDetails">
              <div style={{position: 'sticky', left: '15%', width:'300px' }}>
                <InputDetails />
              </div>
            </Route>
          </Switch>
    );
}
export default AppRouter;