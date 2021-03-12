import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { forecastInterface } from '../../interfaces/utils';
import { Grid } from '@material-ui/core';


interface DrawerInterface {
    open: boolean;
    onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
    data: forecastInterface | null;
    city: string;
}

export default function TemporaryDrawer({open, onClose, data, city}: DrawerInterface) {
  return (
          <Drawer anchor="right" open={open} onClose={onClose}>
              <Grid style={{width: "800px", background: "#FFC371"}} container item sm={12} justify="center" alignItems="center">
                  <Grid container item sm={6} justify="center">
                  <iframe title="city" src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDERFj1udznFe_t0Dw_jQFgsxHG7EGmg2E&q=${city}+France`} sandbox=''/>
                  </Grid>
                  <Grid container item sm={6} justify="center">
                      {`${data?.Temperature.value}°C`}
                      </Grid>
                      <Grid container item sm={6} justify="center">
                      {`${data?.Wind.speed}km/h`}
                      </Grid>
                      <Grid container item sm={6} justify="center">
                     {`${data?.humidity}%`}
                      </Grid>
              </Grid>
          </Drawer>
  );
}
