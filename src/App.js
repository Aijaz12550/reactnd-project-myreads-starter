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
            this.setState({booksList:data});
        })
    }

    clearSearchResult(){
        this.setState(()=>({
            searchedBookList: []
        }));
    }

    /*
        This functions will be used to update the book and will be passed to two components 
        Bookshelves and Search, both of these components will further pass it to Book component
     */
    updateShelf (book, shelf){
        BooksAPI.update(book,shelf)
        .then(data=>{
            if(this.state.booksList.some(b=> b.id===book.id)){
                this.setState((prevState)=> ({
                    booksList : prevState.booksList.map(b=> {
                        if(b.id === book.id){
                            b.shelf = shelf;
                        }
                        return b;
                    })
                }));
            }
            else {
                book.shelf = shelf;
                this.setState((prevState)=> ({
                    booksList : [...prevState.booksList,book]
                }));
            }            
        });
    }
    
    /*
        This function will be passed to search component and will be called by search component to 
        find books, also we need to match book category in both searched and current books 
    */
    serachBooks(query) {
        if(query){            
            BooksAPI.search(query)
            .then(data=> {
                this.setState(()=>({
                    searchedBookList : data.error? []: data.map(b=> {                        
                        var matchedBook = this.state.booksList.filter(bl=> bl.id===b.id);
                        if(matchedBook && matchedBook.length>0){
                            b.shelf = matchedBook[0].shelf;
                        }
                        else {
                            b.shelf = "none";
                        }
                        return b;
                    })
                }))
            })
        }
        else {
           this.clearSearchResult();
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
                                this.clearSearchResult();
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
