import React from 'react'
import {HashRouter, Switch,Route} from 'react-router-dom'
import Action from '../Pages/Action'
import Comedy from '../Pages/Comedy'
import Home from '../Pages/Home'
import Results from '../Pages/Result'

export default class Router extends React.Component{
    render(){
        return(
            <HashRouter>
                <Switch>
                    <Route exact path ='/home' component={Home} />
                    <Route exact path ='/comedy' component={Comedy} />
                    <Route exact path ='/action' component={Action} />
                    <Route exact path ='/result' component={Results}/>
                </Switch>
            </HashRouter>
        )
    }
}