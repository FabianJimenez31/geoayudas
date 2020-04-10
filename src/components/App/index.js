import React from 'react';
import Template from '../../template';
import Router from '../../routes';

 const App = () => {
   
    return (
        <Router>
            {
                (content, routeProps) => {
                    return (<Template {...routeProps}>{content}</Template>)
                }
            }
        </Router>
    );
}

export default App;