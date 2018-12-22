import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './components/shelf'

class BooksApp extends React.Component {
    state = {
        showSearchPage: false,
        booksList : []
    }

    componentDidMount(){
        BooksAPI.getAll().then(data=> {
            console.log("Data > ", data);
            this.setState({booksList:data});
        })
    }

    updateShelf (book, shelf){
        this.setState((prevState)=> ({
            booksList : prevState.booksList.map(b=> {
                if(b.id == book.id){
                    b.shelf = shelf;
                }
                return b;
            })
        }));
        BooksAPI.update(book,{shelf:shelf})
        .then(data=>{
            console.log("book update> ",data);
        });
    }

    render() {
        var shelfs = [{title:"Currently Reading", value:"currentlyReading"},{title:"Want to Read", value:"wantToRead"},{title:"Read", value:"read"}];
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {
                            shelfs.map(shelf=> {
                                return <Shelf key={shelf.value} title={shelf.title} books={this.state.booksList.filter(book=>book.shelf === shelf.value)} updateBookShelf={this.updateShelf.bind(this)} />
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
  
}

export default BooksApp
