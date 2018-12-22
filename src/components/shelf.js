import React from 'react'
// import * as BooksAPI from './BooksAPI'
import Book from './book'

class Shelf extends React.Component {
  
  render() {
    return (
        <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { this.props.books.map(book => {
                return <Book key={book.title} book={book}  updateBookShelf={this.props.updateBookShelf}/>
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf
