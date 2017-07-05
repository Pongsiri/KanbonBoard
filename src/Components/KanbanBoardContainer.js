import React from 'react'
import 'whatwg-fetch'
import KanbanBoard from './KanbanBoard'
import 'babel-polyfill'
import update from 'react-addons-update'
import {throttle} from './utils'

const API_URL = 'http://kanbanapi.pro-react.com'
const API_HEADERS = {
    'Content-Type': 'application/json',
    //  Authorization:'any-string-you-like'
}

class KanbanBoardContainer extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            cards: []
        }

        this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
        this.updateCardPosition = throttle(this.updateCardPosition.bind(this), 500)

    }

    componentDidMount() {
        fetch('./kanban.json').then((response) => response.json()).then((responseData) => {
            this.setState({cards: responseData})
        }).catch((error) => {
            console.log('Error fetching and parsing data', error)
        })
    }

    addTask(cardId, taskName) {
        let prevState = this.state;
        let cardIndex = this
            .state
            .cards
            .findIndex((card) => card.id == cardId);
        let newTask = {
            id: Date.now(),
            name: taskName,
            done: false
        };
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    $push: [newTask]
                }
            }
        });

        this.setState({cards: nextState})
    }

    deleteTask(cardId, taskId, taskIndex) {
        let cardIndex = this
            .state
            .cards
            .findIndex((card) => card.id == cardId)

        let prevState = this.state;

        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    $splice: [
                        [taskIndex, 1]
                    ]
                }
            }
        })

        this.setState({cards: nextState})
    }

    toggleTask(cardId, taskId, taskIndex) {

        let prevState = this.state;

        let cardIndex = this
            .state
            .cards
            .findIndex((card) => card.id == cardId);

        let newDoneValue;

        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: {
                            $apply: (done) => {
                                newDoneValue = !done
                                return newDoneValue;
                            }
                        }
                    }
                }
            }
        });

        this.setState({cards: nextState});
    }

    updateCardStatus(cardId, listId) {
        let cardIndex = this
            .state
            .cards
            .findIndex((card) => card.id == cardId)
        let card = this.state.cards[cardIndex]
        if (card.status !== listId) {
            this.setState(update(this.state, {
                cards: {
                    [cardIndex]: {
                        status: {
                            $set: listId
                        }
                    }
                }
            }))
        }
    }

    updateCardPosition(cardId, afterId) {

        //console.log(afterId)
        if (cardId !== afterId) {
            let cardIndex = this
                .state
                .cards
                .findIndex((card) => card.id == cardId)
            let card = this.state.cards[cardIndex]
            let afterIndex = this
                .state
                .cards
                .findIndex((card) => card.id == afterId)

            this.setState(update(this.state, {
                cards: {
                    $splice: [
                        [
                            cardIndex, 1
                        ],
                        [afterIndex, 0, card]
                    ]
                }
            }))
        }

    }

    addCard(card)
    {
        let prevState = this.state;
        if (card.id === null) {
            let card = Object.assign({}, card, {
                id: Date.now()
            });
        }
        let nextState = update(this.state.cards, {$push: [card]});

        this.setState({cards: nextState});
    }

    updateCard(card) {
        let prevState = this.state;
        let cardIndex = this
            .state
            .cards
            .findIndex((c) => c.id == card.id);
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                $set: card
            }
        });
        this.setState({cards: nextState});
    }

    persistCardDrag(cardId, status) {
        console.log('status :' + status)
        console.log('cardId :' + cardId)
        let cardIndex = this
            .state
            .cards
            .findIndex((card) => card.id == cardId)
        let card = this.state.cards[cardIndex]
        this.setState(update(this.state, {
            cards: {
                [cardIndex]: {
                    status: {
                        $set: status
                    }
                }
            }
        }))

        console.log(this.state.cards)
    }

    render() {

        let kanbanBoard = this.props.children && React.cloneElement(this.props.children, {
            cards: this.state.cards,
            taskCallbacks: {
                toggle: this
                    .toggleTask
                    .bind(this),
                delete: this
                    .deleteTask
                    .bind(this),
                add: this
                    .addTask
                    .bind(this)
            },
            cardCallbacks: {
                addCard: this
                    .addCard
                    .bind(this),
                updateCard: this
                    .updateCard
                    .bind(this),
                updateStatus: this
                    .updateCardStatus
                    .bind(this),
                updatePosition: throttle(this.updateCardPosition.bind(this), 500),
                persistCardDrag: this
                .persistCardDrag
                .bind(this)
            }
        });
        
        return kanbanBoard;

        
    }
}

export default KanbanBoardContainer