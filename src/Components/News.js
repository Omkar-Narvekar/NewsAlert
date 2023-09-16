import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country : "in",
    pageSize: 9,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }



  articles =  []

  constructor(){
    super();
    console.log("this is a constructor")

    this.state = {
      articles : [],
      loading : false,
      page : 1
    }
  }

   async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5c8a2a44925c4529a0580680c1fd4726&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
        articles: parseddata.articles, 
        totalResults: parseddata.totalResults, 
        loading: false
    })
    }

    handleprev = async ()=>{
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5c8a2a44925c4529a0580680c1fd4726&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true}) 
      let data = await fetch(url);
      let parseddata = await data.json();
      this.setState({
        page: this.state.page - 1,
        articles: parseddata.articles,
        loading: false
      })   
     }

    handlenext = async ()=>{
      console.log();

      if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5c8a2a44925c4529a0580680c1fd4726&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parseddata = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parseddata.articles,
        loading: false
      })
     }
    }


  render() {

    const totalPages = Math.ceil(this.state.totalResults / this.props.pageSize);

    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin: '35px 0px'}}>News Alert Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className='row'>
          {!this.state.loading && this.state.articles.map((element)=>{
           return <div className='col-md-4' key={element.url}>
            <NewsItem Title={element.title ? element.title.slice(0, 45) : ""} Description={element.description ? element.description.slice(0, 88) : ""} newsUrl={element.url} imgUrl={element.urlToImage} author={element.author} date={element.publishedAt} />
            </div>
          })}
        </div>
        <div className='container d-flex justify-content-around'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprev}>&larr; Previous</button>
          <div className="page-box" style={{border: '1px solid black', borderRadius: '4px', color: "white", backgroundColor: 'black', padding: '8px 16px'}}>
            <label>{this.state.page}/{totalPages}</label>
          </div>
        <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handlenext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News