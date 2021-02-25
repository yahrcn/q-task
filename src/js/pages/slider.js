import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setImages } from "../redux/actions";
import { ROUTES } from "../routes";

import first from "../../img/1.jpg";
import second from "../../img/2.jpg";
import third from "../../img/3.jpg";

const images = [first, second, third];

const mapStateToProps = (store) => ({
  photos: store.photos,
});

const mapDispatchToProps = (dispatch) => ({
  setImages(images) {
    dispatch(setImages(images));
  },
});

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remote: false,
      text: "remote",
      array: images,
      currentId: 0,
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  componentDidMount() {
    fetch("https://imagesapi.osora.ru/", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        this.props.setImages(result);
      });
  }

  handleNext() {
    const lastIndex = this.state.array.length - 1;
    const resetIndex = this.state.currentId === lastIndex;
    const index = resetIndex ? 0 : this.state.currentId + 1;
    this.setState({
      currentId: index,
    });
  }

  handlePrev() {
    const lastIndex = this.state.array.length - 1;
    const resetIndex = this.state.currentId === 0;
    const index = resetIndex ? lastIndex : this.state.currentId - 1;
    this.setState({
      currentId: index,
    });
  }

  render() {
    return (
      <div className="page">
        <div className="sliderWrapper">
          <div className="button" onClick={this.handlePrev}>
            prev
          </div>
          {this.state.remote ? (
            <img
              className="slider"
              alt=""
              src={this.props.photos[this.state.currentId]}
            />
          ) : (
            <img className="slider" alt="" src={images[this.state.currentId]} />
          )}

          <div className="button" onClick={this.handleNext}>
            next
          </div>
        </div>
        <div
          className="button button_switch"
          onClick={() => {
            this.setState(
              this.state.remote
                ? { remote: false, text: "remote", array: images, currentId: 0 }
                : {
                    remote: true,
                    text: "local",
                    array: this.props.photos,
                    currentId: 0,
                  }
            );
          }}
        >
          switch to {this.state.text}
        </div>
        <Link to={ROUTES.main.path} className="button">
          back to main
        </Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
