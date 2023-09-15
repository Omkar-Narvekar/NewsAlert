import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
   let {Title, Description, imgUrl, newsUrl} = this.props;
    
   return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
        <img src={!imgUrl?"https://www.shutterstock.com/shutterstock/photos/1443999785/display_1500/stock-vector-bollywood-word-on-gradient-background-indian-cinema-poster-with-text-and-spot-light-indian-1443999785.jpg":imgUrl} className="card-img-top" alt={Title}/>
        <div className="card-body">
            <h5 className="card-title">{Title}...</h5>
            <p className="card-text">{Description}...</p>
            <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
        </div>
        </div>
    </div>
    )
  }
}

export default NewsItem