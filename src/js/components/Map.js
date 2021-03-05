import React from "react";
import { connect } from "react-redux";
import { setId, setMap } from "../redux/actions";

const mapStateToProps = (store) => ({
  currentId: store.currentId,
  isMapOpened: store.isMapOpened,
  data: store.data,
});

const mapDispatchToProps = (dispatch) => ({
  setId(id) {
    dispatch(setId(id));
  },
  setMap(map) {
    dispatch(setMap(map));
  },
});

export class Map extends React.Component {
  onClick = ({ target }) => {
    if (target.classList.contains("map__container")) {
      this.props.app.props.setMap(true);
    } else if (
      target.classList.contains("map__container__dot") &&
      this.props.app.props.isMapOpened
    ) {
      this.props.app.cameraToMarker(parseInt(target.dataset.locationId), false);
      this.props.app.props.setMap(false);
    } else {
      this.props.app.props.setMap(false);
    }
  };
  render() {
    const { data, isMapOpened, currentId } = this.props.app.props;
    return (
      <div
        className={isMapOpened ? "map active" : "map"}
        onClick={this.onClick}
      >
        <div className="map__container">
          {data.map((item) => (
            <div
              className={
                item.id === currentId
                  ? "map__container__dot active"
                  : "map__container__dot"
              }
              style={{
                left: `${item.coords.x * 20 + 50}%`,
                top: `${item.coords.z * 2 + 50}%`,
              }}
              data-location-id={item.id}
              key={item.id}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
