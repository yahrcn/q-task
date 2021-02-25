import React from "react";
import { connect } from "react-redux";
import { setImages } from "../redux/actions";

const mapStateToProps = (store) => ({
  photos: store.photos,
});

const mapDispatchToProps = (dispatch) => ({
  setImages(images) {
    dispatch(setImages(images));
  },
});

class Slider extends React.Component {
  componentDidMount() {
    fetch("https://imagesapi.osora.ru/", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        this.props.setImages(result);
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

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
