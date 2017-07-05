import React from 'react'
import 'whatwg-fetch';
import ContactsApp from './ContactsApp'

class ContactsAppContainer extends React.Component {
    constructor(){
        super()
        this.state = {
            contacts:[]
        }
    }

    componentDidMount(){
        fetch('./contact.json')
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({contacts:responseData})
        })
        .catch((error) => {
            console.log('Error fetching and parsing data',error)
        })
    
    }

    render(){
        return(
            <ContactsApp contacts={this.state.contacts}/>
        )
    }

}

export default ContactsAppContainer