import React,{ Component } from 'react'

import { Router,Route,Link } from  'react-router'

class Home extends Component {
    render(){
        return(
            <h1>HOME</h1>
        )
    }
}

class About extends Component {
    render(){
        return(
            <h1>About</h1>
        )
    }
}

class Repos extends Component {
    render(){
        return(
            <h1>Gihub Repos</h1>
        )
    }
}

class Naive extends Component {
    constructor(){
        super(...arguments)
        this.state={
            route: window.location.hash.substr(1)
        }
    }

    componentDidMount(){
        window.addEventListener('hashchange',() => {
            this.setState({
                route: window.location.hash.substr(1)
            })
        })
    }
    
    render(){
       
        return(
            <div>
                <header>App</header>
                <menu>
                    <ul>
                        <li> <Link to="/about">About</Link></li>
                        <li> <Link to="/repos">Repos</Link></li>
                    </ul>
                </menu>
                {this.props.children}
            </div>
        )
    }
}


export default Naive