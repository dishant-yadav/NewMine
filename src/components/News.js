import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import logo from "./logo.png";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    const suffix = " News || NewsMine - Best News App";
    document.title =
      props.category[0].toUpperCase() + props.category.slice(1) + suffix;
    console.log(this.state.totalResults);
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=40c38ba5eefd4fb094758dd46ba59226&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      loading: false,
    });
  }
  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    await this.setState({
      page: this.state.page - 1,
    });
    this.updateNews();
  };

  handleNextClick = async () => {
    await this.setState({
      page: this.state.page + 1,
    });
    this.updateNews();
  };

  render() {
    return (
      <div className="container my-3">
        <h1
          className="text-center"
          style={{
            margin: "35px 0px",
            textDecoration: "underline",
          }}
        >
          Top headlines from{" "}
          {`${
            this.props.category[0].toUpperCase() + this.props.category.slice(1)
          }`}
        </h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={
                      element.description
                        ? element.description.slice(0, 80)
                        : "No desciption Provided"
                    }
                    imageUrl={element.urlToImage ? element.urlToImage : logo}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
        </div>
        <br />
        <br />
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
