import React from "react";
import { connect } from "react-redux";

class Slider extends React.Component {
  render() {
    return (
      <div className="page">
        <div className="text">Slider</div>
        <div className="slider">{this.props.photos}</div>
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
