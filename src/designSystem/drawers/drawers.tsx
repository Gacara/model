import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { forecastInterface } from '../../interfaces/utils';
import { Button, createStyles, Grid, makeStyles, Slider } from '@material-ui/core';
import {Bar} from 'react-chartjs-2';
import { meteoInterface } from '../../component/meteoHook';
import { wearablesInterface } from '../../component/wearablesHook';
import { switchModetype } from '../../views/model';
import GradientBtn from '../button/button';
import {
  TemperatureChart,
  mockedTemperatureCharts,
  HumidityChart,
  mockedHumidityCharts,
  CloudChart,
  mockedCloudCharts,
  mockedMeteoData,
} from './utils';

interface DrawerInterface {
    open: boolean;
    switchMode: switchModetype;
    meteoVariables: meteoInterface;
    wearablesVariables: wearablesInterface;
    onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
    allData: forecastInterface[] | null;
    action: (value: unknown, type: string, action: string) => void;
    selectedDate: number;
}

export default function TemporaryDrawer({selectedDate, open, onClose, allData, switchMode, action, meteoVariables, wearablesVariables}: DrawerInterface) {
  const data = setData() || mockedMeteoData;
  const defaultSelectedButton = "Enlever";
  const defaultNotSelectedButton = "Porter";
  const temperatureChart = allData ? TemperatureChart(allData) : mockedTemperatureCharts;
  const humidityChart = allData ? HumidityChart(allData) : mockedHumidityCharts;
  const cloudChart = allData ? CloudChart(allData) : mockedCloudCharts;

  function setData(){
    return allData ? allData[selectedDate] : null;
  }

  const styles = makeStyles(() => createStyles({
    root: {
      position: "relative",
      overflow: "hidden",
      "& .MuiButton-root": {
        fontSize: "1.5rem",
      },
      "& .MuiBackdrop-root": {
        backgroundColor: 'rgba(0, 0, 0, 0)',
      },
      "& .iconButton": {
        height: "40px",
        minWidth: "45px",
        maxWidth: "45px",
        background: "white",
        borderRadius: "5px",
      }
    },
  }))();


  function compareTemperature(value: number){
    const dataToCompare = allData ? +allData[1].Temperature.value : 1;
    const evolution = value-dataToCompare;
    const isPositive = evolution > 0;
    return <span style={{color: isPositive ? "green" : "red"}}>{`${isPositive ? "+" : "-"} ${Math.abs(evolution).toFixed(2)} °C`}</span>;
  }

  function compareHumidity(value: number){
    const dataToCompare = allData ? +allData[1].humidity : 1;
    const evolution = value-dataToCompare;
    const isPositive = evolution > 0;
    return <span style={{color: isPositive ? "green" : "red"}}>{`${isPositive ? "+" : "-"} ${Math.abs(evolution).toFixed(2)} %`}</span>;
  }

function renderOnApiMode(){
  return  (<Grid style={{height: "100%", width: "700px", background: "#FFC371", padding: "25px 30px 0 30px"}} container item sm={12} justify="center">


  <Grid container item sm={12} justify="space-between" alignItems="flex-start" style={{height: "100%"}}>
  <Grid container item sm={6} justify="center">
  <div><h2>Temps actuel :</h2></div>
  <Grid container item sm={12} alignItems="center" justify="flex-start">
    <Grid container item sm={4} justify="center">
      <img src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`} width="60px" height="60px" alt="meteo" />
    </Grid>
    <Grid container item sm={4} justify="flex-start">
      {data.weather}
    </Grid>
  </Grid>

  <Grid container item sm={12} alignItems="center" justify="flex-start">
  <Grid container item sm={4} justify="center">
    <span style={{fontSize: "2rem"}} role="img" aria-label="Temperature">🌡️</span>
    </Grid>
    <Grid container item sm={4} justify="flex-start">
      {data.Temperature.value} °C
    </Grid>
    <Grid container item sm={4} justify="flex-start">
      {selectedDate !== 1 && compareTemperature(+data.Temperature.value)}
    </Grid>
  </Grid>
  <Grid container item sm={12} alignItems="center" justify="flex-start">
  <Grid container item sm={4} justify="center">
    <span style={{fontSize: "2rem"}} role="img" aria-label="Humidity">💧</span>
    </Grid>
    <Grid container item sm={4} justify="flex-start">
      {data.humidity} %
    </Grid>
    <Grid container item sm={4} justify="flex-start">
      {selectedDate !== 1 && compareHumidity(+data.humidity)}
    </Grid>
  </Grid>
    </Grid>
  
    
  <Grid container item sm={6} justify="center" style={{paddingTop: "40px"}} alignItems="flex-end">
      <Bar
      data={temperatureChart}
      width={400}
      height={200}
      options={{
      maintainAspectRatio: false
      }}
      />
      </Grid>
      <Grid container item sm={6} justify="center">
      <Bar
      data={cloudChart}
      width={400}
      height={200}
      options={{
      maintainAspectRatio: false
      }}
      />
      </Grid>
      <Grid container item sm={6} justify="center">
      <Bar
      data={humidityChart}
      width={400}
      height={200}
      options={{
      maintainAspectRatio: false
      }}
      />
      </Grid>
  </Grid>
  
</Grid>);
}


function renderOnTestMode(){
  return  (<Grid style={{height: "100%", width: "500px", background: "#FFC371", overflow: "hidden", padding: "10px 30px"}} container item sm={12}  justify="center" alignItems="flex-start">
  
  <Grid container item sm={12} direction="column" justify="center" style={{minHeight: "33%"}}>
  
  <Grid container item sm={12} justify="space-between" style={{padding: "10px 0"}}>

      <Grid container item sm={12} justify="space-between" alignItems="center" style={{padding: "40px 0 10px 0"}}>
      <Grid container item sm={6} justify="center">
      <Button className="iconButton" color="primary" onClick={() => action(!meteoVariables.sun, "updateMeteoVariables", "sun")}>
      {<span role="img" aria-label="Sun">☀️</span>}
      </Button>
      </Grid>
    
      <Grid container item sm={6} justify="center">
      <Button className="iconButton" color="primary" onClick={() => action(undefined, "stormClick", "storm")}>
      {<span role="img" aria-label="storm">⚡</span>}
      </Button>
      </Grid>
      </Grid>

      <Grid container item sm={12} justify="space-between" alignItems="center" style={{padding: "10px 0"}}>
      <Grid container item sm={6} justify="flex-start">
      <Button className="iconButton" color="primary" onClick={() => action(!meteoVariables.cloud, "updateMeteoVariables", "cloud")}>
      {<span role="img" aria-label="Clouds">☁️</span>}
      </Button>
      </Grid>    

      <Grid container item sm={6} justify="center">
        <Grid container item sm={12} justify="center">
        <Slider
        value={meteoVariables.cloudCover}
        step={1}
        onChange={(_e, value) => {action(value, "updateMeteoVariables", "cloudCover") }}
        min={1}
        max={10}
      />
        </Grid>
        <Grid container item sm={12} justify="center">
        <Slider
        value={meteoVariables.windSpeed}
        step={1}
        onChange={(_e, value) => {action(value, "updateMeteoVariables", "windSpeed")}}
        min={1}
        max={20}
      />
        </Grid>
      </Grid>
      </Grid>

      <Grid container item sm={12} justify="space-between" alignItems="center" style={{padding: "10px 0"}}>
      <Grid container item sm={6} justify="flex-start">
      <Button className="iconButton" color="primary" onClick={() => {action(!meteoVariables.snow, "updateMeteoVariables", "snow")}}>
      {<span role="img" aria-label="Snow">❄️</span>}
      </Button>
      </Grid>
      <Grid container item sm={6} justify="center">
      <Slider
        value={meteoVariables.snowPrecipitation}
        step={2500}
        onChange={(_e, value) => { action(value, "updateMeteoVariables", "snowPrecipitation");}}
        min={0}
        max={40000}
      />
      </Grid>
      </Grid>

      <Grid container item sm={12} justify="space-between" alignItems="center" style={{padding: "10px 0"}}>
      <Grid container item sm={6} justify="flex-start">
      <Button className="iconButton" color="primary" onClick={() => action(!meteoVariables.rain, "updateMeteoVariables", "rain")}>
      {<span role="img" aria-label="Rain">⛆</span>}
      </Button>
      </Grid>
      <Grid container item sm={6} justify="center">
      <Slider
        value={meteoVariables.rainPrecipitation}
        step={5000}
        onChange={(_e, value) => {action(value, "updateMeteoVariables", "rainPrecipitation");}}
        min={0}
        max={80000}
      />
      </Grid>
      </Grid>
    </Grid>
  </Grid>

  <Grid container item sm={12} direction="column" justify="center" style={{minHeight: "33%"}}>

    <Grid container item sm={12} justify="space-between" style={{padding: "10px 0"}}>
      <Grid container item sm={6} alignItems="center" justify="flex-start">
      Porter un chapeau
      </Grid>
      <Grid container item sm={6} justify="center">
      <GradientBtn label={wearablesVariables.wearHat ? defaultSelectedButton : defaultNotSelectedButton} onClick={()=> action(!wearablesVariables.wearHat, "updateWearablesVariables", "wearHat")} />
      </Grid>
    </Grid>

    <Grid container item sm={12} justify="space-between" style={{padding: "10px 0"}}>
      <Grid container item sm={6} alignItems="center" justify="flex-start">
      Mettre des lunettes
      </Grid>
      <Grid container item sm={6} justify="center">
      <GradientBtn label={wearablesVariables.wearSunglasses ? defaultSelectedButton : defaultNotSelectedButton} onClick={()=> action(!wearablesVariables.wearSunglasses, "updateWearablesVariables", "wearSunglasses")} />      </Grid>
    </Grid>

    <Grid container item sm={12} justify="space-between" style={{padding: "10px 0"}}>
      <Grid container item sm={6} alignItems="center" justify="flex-start">
      Mettre un masque
      </Grid>
      <Grid container item sm={6} justify="center">
      <GradientBtn label={wearablesVariables.wearMask ? defaultSelectedButton : defaultNotSelectedButton} onClick={()=> action(!wearablesVariables.wearMask, "updateWearablesVariables", "wearMask")} />      </Grid>
    </Grid>

    <Grid container item sm={12} justify="space-between" style={{padding: "10px 0"}}>
      <Grid container item sm={6} alignItems="center" justify="flex-start">
      Prendre une bouteille
      </Grid>
      <Grid container item sm={6} justify="center">
      <GradientBtn label={wearablesVariables.wearBottle ? defaultSelectedButton : defaultNotSelectedButton} onClick={()=> action(!wearablesVariables.wearBottle, "updateWearablesVariables", "wearBottle")} />
      </Grid>
    </Grid>

    <Grid container item sm={12} justify="space-between" style={{padding: "10px 0"}}>
      <Grid container item sm={6} alignItems="center" justify="flex-start">
      Prendre un parapluie
      </Grid>
      <Grid container item sm={6} justify="center">
      <GradientBtn label={wearablesVariables.wearUmbrella ? defaultSelectedButton : defaultNotSelectedButton} onClick={()=> action(!wearablesVariables.wearUmbrella, "updateWearablesVariables", "wearUmbrella")} />
      </Grid>
    </Grid>

      </Grid>
      <Grid container item sm={12}  direction="column" justify="center" style={{minHeight: "33%"}}>
      <GradientBtn label={<span role="img" aria-label="scene"> Changer le fond</span>} onClick={() => action(undefined, "changeScene", "scene")} />
      </Grid>
     
</Grid>);
}


  return (
          <Drawer anchor="left" open={open} onClose={onClose} classes={styles}>
            <Grid container item sm={12} justify="center" alignItems="flex-end" style={{maxHeight: "100px", backgroundColor: "#FFC371"}}>
            <GradientBtn label={`Changer en mode ${switchMode === "api" ? "Jeu" : "Info"}`} onClick={()=> action(undefined, "setSwitchMode", "switch")} />
            </Grid>

              {
                switchMode === "api"
              ?
              renderOnApiMode()
              :
              renderOnTestMode()
              }
          </Drawer>
  );
}
