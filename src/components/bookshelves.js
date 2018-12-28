import React from 'react'
import Shelf from './shelf'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class BookShelves extends React.Component {

    static propTypes = {
        bookList: PropTypes.array.isRequired,
        onUpdateShelf: PropTypes.func.isRequired
    }

    state = {
        shelfs: [
            {title:"Currently Reading", value:"currentlyReading"},
            {title:"Want to Read", value:"wantToRead"},
            {title:"Read", value:"read"}
        ]
    }

    render() {
        var shelfs = this.state.shelfs;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <div className="list-books-title-search">
                        {<Link to="/search">Search</Link>}
                        {/*<button type="button" onClick={()=> this.props.history.push("/search")}>Search</button>*/}
                    </div>
                    <div className="list-books-title-heading">
                        <h1>MyReads</h1>
                    </div>
                </div>
                <div className="list-books-content">
                    <div>
                        {
                            shelfs.map(shelf=> {
                                return <Shelf key={shelf.value} title={shelf.title} books={this.props.bookList.filter(book=>book.shelf === shelf.value)} onUpdateShelf={this.props.onUpdateShelf} />
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default BookShelves
