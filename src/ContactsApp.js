import React,{Component} from 'react'

class ContactsApp extends Component {
    constructor(){
        super()
        this.state = {
            filterText:''
        }
    }

    handleUserInput(searchTerm){
        this.setState({filterText:searchTerm})
    }

    render(){
        return(
            <div>
                <SearchBar filterText={this.state.filterText}
                           onUserInput={this.handleUserInput.bind(this)}/>
                <ContactList contacts={this.props.contacts}
                             filterText={this.state.filterText}/>
            </div>
        )
    }
}


class SearchBar extends React.Component {
    
    handleChange(event){
        this.props.onUserInput(event.target.value)
    }

    render(){
        return(
            <input type="search" placeholder="search" onChange={this.handleChange.bind(this)}/>
        )
    }
}

class ContactList extends React.Component {
    render(){

        let filteredContacts = this.props.contacts.filter(
            (contact) => contact.name.indexOf(this.props.filterText) !== -1
        )

        return(
            <ul>
                {
                    filteredContacts.map(
                        (contact) => <ContactItem key={contact.email}
                                           name={contact.name}
                                           email={contact.email} />
                    )}
            </ul>
        )
    }
}

class ContactItem extends React.Component {
    render(){
        return(
            <li>{this.props.name} - {this.props.email}</li>
        )
    }
}


export default ContactsApp