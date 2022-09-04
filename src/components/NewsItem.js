import React, { Component } from "react";
import "./styles/NewsItem.css";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;
    return (
      <div
        className="card my-3 mx-3"
        style={{
          width: "25rem",
          height: "26rem",
        }}
      >
        <img src={imageUrl} height={"250px"} alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a
            href={newsUrl}
            rel="noreferrer"
            target="_blank"
            className="btn btn-dark btn-sm"
          >
            Read More
          </a>
        </div>
      </div>
    );
  }
}
