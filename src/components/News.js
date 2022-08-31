import React, { Component } from "react";
import NewsItem from "./NewsItem";
import "./styles/News.css";

export default class News extends Component {
  constructor() {
    super();
    // console.log("This is a constructor");
    this.state = {
      articles: [],
    };
  }

  async componentDidMount() {
    const url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=a3e2db6c19b747118416e93a3f7317d4";
    const data = await fetch(url);
    const parrsedData = await data.json();
    this.setState({ articles: parrsedData.articles });
  }
  render() {
    return (
      <div className="container">
        <h2>Top HeadLines Today</h2>
        <div className="row">
          {this.state.articles.map((elem) => {
            return (
              <div className="col-md-4" key={elem.url}>
                <NewsItem
                  title={elem.title.slice(0, 45)}
                  description={
                    elem.description != null
                      ? elem.description.slice(0, 80) + "..."
                      : ""
                  }
                  imageUrl={
                    elem.urlToImage != null
                      ? elem.urlToImage
                      : "https://images.moneycontrol.com/static-mcnews/2022/08/Nokia-2660-Flip-770x433.jpg"
                  }
                  newUrl={elem.url}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
