import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { Title, Description, imgUrl, newsUrl, author, date } = this.props;

    const eventDate = new Date(date);

    // Convert the date and time to Indian Standard Time (IST)
    const istDateOptions = {
      timeZone: "Asia/Kolkata",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const istDateString = eventDate.toLocaleString("en-IN", istDateOptions);

    return (
      <div className="my-3">
        <div className="card">
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            99+
            <span class="visually-hidden">unread messages</span>
          </span>
          <img
            src={
              !imgUrl
                ? "https://www.shutterstock.com/shutterstock/photos/1443999785/display_1500/stock-vector-bollywood-word-on-gradient-background-indian-cinema-poster-with-text-and-spot-light-indian-1443999785.jpg"
                : imgUrl
            }
            className="card-img-top"
            alt={Title}
          />
          <div className="card-body">
            <h5 className="card-title">{Title}...</h5>
            <p className="card-text">{Description}...</p>
            <p className="card-text">
              <small class="text-body-secondary">
                By {author} on {istDateString} IST
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
