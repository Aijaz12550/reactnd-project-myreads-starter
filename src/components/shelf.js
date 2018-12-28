import React from 'react'
import Book from './book'
import PropTypes from 'prop-types';

class Shelf extends React.Component {
  
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  render() {
    return (
        <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { this.props.books.map((book,index) => {
                return <Book key={index} book={book}  onUpdateShelf={this.props.onUpdateShelf}/>
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf
