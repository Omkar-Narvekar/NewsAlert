import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {


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
    let url=`https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=5c8a2a44925c4529a0580680c1fd4726&page=1&pageSize=${this.props.pageSize}`;
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
      let url=`https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=5c8a2a44925c4529a0580680c1fd4726&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
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
      let url=`https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=5c8a2a44925c4529a0580680c1fd4726&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
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
    return (
      <div className='container my-3'>
        <h1 className='text-center'>News Alert Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className='row'>
          {!this.state.loading && this.state.articles.map((element)=>{
           return <div className='col-md-4' key={element.url}>
            <NewsItem Title={element.title ? element.title.slice(0, 45) : ""} Description={element.description ? element.description.slice(0, 88) : ""} newsUrl={element.url} imgUrl={element.urlToImage}/>
            </div>
          })}
        </div>
        <div className='container d-flex justify-content-around'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprev}>&larr; Previous</button>
        <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize
        )} className="btn btn-dark" onClick={this.handlenext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News