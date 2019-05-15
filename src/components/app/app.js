import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import TodoList from '../todo-list';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

    maxid = 100;

    state = {
        todoData : [
            this.createTodoItem('Drink Cofee'),
            this.createTodoItem('Make awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        term :'',
        filter : 'all'
    }

    createTodoItem(label) {
        return {
            label,
            important:false,
            done:false,
            id: this.maxid++
        };
    }

    deleteItem = (id) => {
        this.setState(({todoData})=>{
            const ind = todoData.findIndex((el) => el.id===id);
            const newArr = [
                ...todoData.slice(0,ind), 
                ...todoData.slice(ind+1)
            ];
            return {
                todoData : newArr
            }
        });
    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({todoData}) => {
            const newArr = [...todoData, newItem];
            return {
                todoData:newArr
            };
        })
    };


    toggleProperty(arr, id, propName) {
            const ind = arr.findIndex((el) => el.id===id);
            const oldItem = arr[ind];
            const newItem = {...oldItem,
                     [propName]: !oldItem[propName]};

            return [
                ...arr.slice(0,ind),
                newItem, 
                ...arr.slice(ind+1)
            ];
    };


    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData : this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData : this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    search = (items, text) => {
        if (text === ''){
            return items;
        }
        return items.filter((el) => {
            return el.label.toLowerCase()
                    .indexOf(text.toLowerCase()) > -1;
        });
    }

    onSearchChange = (term) => {
        this.setState({ term });
    }

    filter = (items, filter) => {
        switch(filter){
            case('all') :
                return items;
            case('done') :
                return items.filter(el => el.done);
            case('active') :
                return items.filter(el => !el.done);
            default :
                return items;
        }
    }

    onFilterChange = (filter) => {
        this.setState({ filter });
    }


render() {

    const {todoData, term, filter} = this.state;

    const visibleItem = this.filter(
        this.search(todoData, term), filter);


    const doneCount = todoData
                        .filter((el) => el.done).length;
    
    const todoCount = todoData.length - doneCount;

    return (
        <div className ='todo-app'>
            <AppHeader toDo={todoCount} done={doneCount} />
            <div className="top-panel d-flex">
                <SearchPanel 
                    onSearchChange={this.onSearchChange}/>
                <ItemStatusFilter
                    filter={filter}
                    onFilterChange={this.onFilterChange}/>
            </div>

            <TodoList 
                todos={visibleItem}
                onDeleted={this.deleteItem} 
                onToggleImportant={this.onToggleImportant}
                onToggleDone={this.onToggleDone}/>
            
            <ItemAddForm 
                onItemAdded={this.addItem} />
        </div>
    );
};
};

