import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  
   const capitalizeFirstWord = (string) =>  {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews =  async () => {

    props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)    
    let data = await fetch(url);
    props.setProgress(30);
    let parseddata = await data.json();
    props.setProgress(80);
    setArticles(parseddata.articles)
    setTotalResults(parseddata.totalResults)
    setLoading(false)

    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstWord(props.category)} - NewsAlert`;
    updateNews();
  }, [])

    // const handleprev = ()=>{
    //   setPage(page-1)  
    //   updateNews();
    //  }

    // const handlenext = ()=>{
    //    setPage(page+1)  
    //    updateNews()
    // }

    const fetchMoreData = async () => {
      const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`; // temporary email api
      setPage(page+1)    
      let data = await fetch(url);
      let parseddata = await data.json();
      setArticles(articles.concat(parseddata.articles))
      setTotalResults(parseddata.totalResults)
    };

    return (
      <>
        <h1 className='text-center' style={{margin: '35px 0px', marginTop: "90px"}}>NewsAlert Top Headlines - {capitalizeFirstWord(props.category)}</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >

        <div className='container'>
        <div className='row'>
          {articles.map((element)=>{
           return <div className='col-md-4' key={element.url}>
            <NewsItem Title={element.title ? element.title.slice(0, 45) : ""} Description={element.description ? element.description.slice(0, 88) : ""} newsUrl={element.url} imgUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
          })}
        </div>
        </div>
        </InfiniteScroll>
        
        {/* <div className='container d-flex justify-content-around'>
        <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handleprev}>&larr; Previous</button>
          <div className="page-box" style={{border: '1px solid black', borderRadius: '4px', color: "white", backgroundColor: 'black', padding: '8px 16px'}}>
            <label>{page}/{totalPages}</label>
          </div>
        <button type="button" disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} className="btn btn-dark" onClick={handlenext}>Next &rarr;</button>
        </div> */}
      </>
    )
}


News.defaultProps = {
    country : "in",
    pageSize: 9,
    category: "general"
  }

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

export default News