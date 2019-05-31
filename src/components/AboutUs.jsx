import React from 'react';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

const position = [51.505, -0.09];

const AboutUs = ({ classes }) => {
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <h1>About us</h1>
      <Map center={position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup.
            <br />
            Easily customizable.
          </Popup>
        </Marker>
      </Map>
    </main>
  );
};

export default withStyles(styles)(AboutUs);
