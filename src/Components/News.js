import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

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


   capitalizeFirstWord = (string) =>  {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    console.log("this is a constructor")

    this.state = {
      articles : [],
      loading : false,
      page : 1,
      totalResults: 0
    }

    document.title = `${this.capitalizeFirstWord(this.props.category)} - NewsAlert`;
  }


  async updateNews(){
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5c8a2a44925c4529a0580680c1fd4726&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(10);

    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    this.setState({loading:true})
    
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseddata = await data.json();
    this.props.setProgress(80);
    this.setState({
        articles: parseddata.articles, 
        totalResults: parseddata.totalResults, 
        loading: false
    })
    this.props.setProgress(100);
  }

   async componentDidMount(){
       this.updateNews();
    }

    handleprev = ()=>{
      this.setState({ page: this.state.page - 1}, () => { this.updateNews(); });    
  
     }

    handlenext = ()=>{
       this.setState({ page: this.state.page + 1}, () => { this.updateNews(); });    
    }

    fetchMoreData = async () => {
      this.setState({page: this.state.page + 1})
          
          // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5c8a2a44925c4529a0580680c1fd4726&page=${this.state.page}&pageSize=${this.props.pageSize}`; 
          
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`; // temporary email api
          
      let data = await fetch(url);
      let parseddata = await data.json();

      this.setState({
        articles: this.state.articles.concat(parseddata.articles), 
        totalResults: parseddata.totalResults
      })

    };


  render() {

    return (
      <>
        <h1 className='text-center' style={{margin: '35px 0px'}}>NewsAlert Top Headlines - {this.capitalizeFirstWord(this.props.category)}</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          // loader={<Spinner/>}
          loader={<Spinner/>}
        >

        <div className='container'>
        <div className='row'>
          {this.state.articles.map((element)=>{
           return <div className='col-md-4' key={element.url}>
            <NewsItem Title={element.title ? element.title.slice(0, 45) : ""} Description={element.description ? element.description.slice(0, 88) : ""} newsUrl={element.url} imgUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
          })}
        </div>
        </div>
        </InfiniteScroll>
        
        {/* <div className='container d-flex justify-content-around'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprev}>&larr; Previous</button>
          <div className="page-box" style={{border: '1px solid black', borderRadius: '4px', color: "white", backgroundColor: 'black', padding: '8px 16px'}}>
            <label>{this.state.page}/{totalPages}</label>
          </div>
        <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handlenext}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News