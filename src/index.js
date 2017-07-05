import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Grocery from './Grocery'
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import KanbanBoard from './Components/KanbanBoard'
import KanbanBoardContainer from './Components/KanbanBoardContainer'
import ContactsAppContainer from './ContactsAppContainer'
import AnimatedShoppingList from './AnimatedShoppingList'
import Naive from './Naive'

import NewCard from './Components/NewCard'
import EditCard from './Components/EditCard'

let CardsList = [
    {
        id: 1,
        title: "Read the Book",
        description: "I should read the whole book",
        color: "#BD8D31",
        status: "in-progress",
        tasks: []
    }, {
        id: 2,
        title: "Write some code",
        description: "Code along with the samples in the book",
        color: "#3A7E28",
        status: "todo",
        tasks: [
            {
                id: 1,
                name: "ContactList Example",
                done: true
            }, {
                id: 2,
                name: "Kanban Example",
                done: false
            }, {
                id: 3,
                name: "My own experiments",
                done: false
            }
        ]
    }
]

let contacts = [
    {
        name: "Cassio Zen",
        email: "cassiozen@gmail.com"
    }, {
        name: "Dan Abramov",
        email: "gaearon@somewhere.com"
    }, {
        name: "Pete Hunt",
        email: "floydophone@somewhere.com"
    }, {
        name: "Paul O'Sannessy",
        email: "zpao@somewhere.com"
    }, {
        name: "Ryan Florence",
        email: "rpflorence@somewhere.com"
    }, {
        name: "Stian Markbageebas",
        email: "sebmarkbage@here.com"
    }
]

ReactDOM.render((
    <Router history={createBrowserHistory()}>
        <Route component={KanbanBoardContainer}>
            <Route path="/" component={KanbanBoard}>
                <Route path="new" component={NewCard}/>
                <Route path="edit/:card_id" component={EditCard}/>
            </Route>
        </Route>
    </Router>
), document.getElementById('root'))
// ReactDOM.render(<AnimatedShoppingList/>,document.getElementById('root'))
// ReactDOM.render(<KanbanBoardContainer />, document.getElementById('root'));
// ReactDOM.render(<KanbanBoard cards={CardsList} />,
// document.getElementById('root'));
