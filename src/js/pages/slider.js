import React from "react";
import { connect } from "react-redux";
import { setImages } from "../redux/actions";

class Slider extends React.Component {
  componentDidMount() {
    fetch("https://imagesapi.osora.ru/", {
      method: "POST",
      body: "none",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.props.dispatch(setImages([result[0], result[1], result[2]]));
      });
  }

  render() {
    return (
      <div className="page">
        <div className="text">Slider</div>
        <div className="slider">
          {this.props.photos.map((photo, id) => {
            return <img src={photo} key={id} alt="Кошечка" />;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  console.log(store);
  return {
    photos: store.photos,
  };
};

export default connect(mapStateToProps)(Slider);
