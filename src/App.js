import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelves from './components/bookshelves'
import Search from './components/search'
import { Route, Router, Switch } from 'react-router-dom'
import history from "./History";

class BooksApp extends React.Component {
    state = {
        showSearchPage: false,
        booksList : [],
        searchedBookList: []
    }

    componentDidMount(){
        BooksAPI.getAll().then(data=> {
            console.log("Data > ", data);
            this.setState({booksList:data});
        })
    }

    updateShelf (book, shelf){
        
        BooksAPI.update(book,shelf)
        .then(data=>{
            console.log("book update> ",data);
            /*
            var newBook = this.state.booksList.filter(b=>{
                return b.id === book.id;
            });
            if(newBook.length>0){
                this.setState ((prevState)=> ({
                    booksList : prevState.booksList.push(newBook[0])
                }));
            }*/
            this.setState((prevState)=> ({
                booksList : prevState.booksList.map(b=> {
                    if(b.id === book.id){
                        b.shelf = shelf;
                    }
                    return b;
                })
            }));
        });
    }

    
    serachBooks(query) {
        if(query){
            BooksAPI.search(query)
            .then(data=> {
                console.log("search result ",data);
                this.setState(()=>({
                    searchedBookList : data.error? []: data.map(b=> {
                        b.shelf = "none";
                        return b;
                    })
                }))
            })
        }
        else {
            this.setState(()=>({
                searchedBookList: []
            }));
        }
    }

    render() {
        
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" render={()=> (
                            <BookShelves bookList={this.state.booksList} onUpdateShelf={this.updateShelf.bind(this)}/>
                        )} />
                        <Route path="/search" render={({history})=> (
                            <Search searchedBookList={this.state.searchedBookList} serachBooks={this.serachBooks.bind(this)} onUpdateShelf={this.updateShelf.bind(this)} onBackPress={()=> {
                                this.setState(()=>({
                                    searchedBookList: []
                                }));
                                history.push("/");
                            }} />
                        )} />
                    </Switch>
                </Router>
                
            </div>
        );
    }
  
}

export default BooksApp
