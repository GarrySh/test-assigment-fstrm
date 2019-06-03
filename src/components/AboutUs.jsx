import React from 'react';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    display: 'flex',
    'min-height': '100vh',
    'flex-direction': 'column',
  },
  header: {
    margin: theme.spacing(2),
  },
  map: {
    height: '100%',
  },
});

const position = [48.4872, 135.08379];

const AboutUs = ({ classes }) => {
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Typography variant="h4" component="h1" className={styles.header}>
        About us
      </Typography>
      <Map className={classes.map} center={position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>We are here</Popup>
        </Marker>
      </Map>
    </main>
  );
};

export default withStyles(styles)(AboutUs);
