import { forecastInterface } from "../../interfaces/utils";

export const mockedMeteoData = {
  id: 4560,
  pression: "1010.00",
  humidity: "84.00",
  weather: "couvert",
  dateObj: "2021-04-30T09:00:00.000Z",
  icon: "04d",
  createdAt: "2021-04-27T07:34:33.000Z",
  updatedAt: "2021-04-27T08:36:18.000Z",
  cityId: 57,
  cloudId: 4560,
  precipitationId: 4560,
  temperatureId: 4562,
  windId: 4560,
  Precipitation: {
  id: 4560,
  mode: null,
  value: null,
  createdAt: "2021-04-27T07:34:33.000Z",
  updatedAt: "2021-04-27T08:36:18.000Z"
  },
  Cloud: {
  id: 4560,
  cover: 100,
  name: "couvert",
  createdAt: "2021-04-27T07:34:33.000Z",
  updatedAt: "2021-04-27T08:36:18.000Z"
  },
  Temperature: {
  id: 4560,
  value: "10.47",
  value_max: "10.47",
  value_min: "10.47",
  feeling: "9.56",
  createdAt: "2021-04-27T07:34:33.000Z",
  updatedAt: "2021-04-27T07:34:33.000Z"
  },
  Wind: {
  id: 4560,
  direction_degree: "340.00",
  direction_code: "NNW",
  direction_name: "North-northwest",
  speed: "0.69",
  speed_name: "Calm",
  createdAt: "2021-04-27T07:34:33.000Z",
  updatedAt: "2021-04-27T08:36:18.000Z"
  },
  City: null
  };

export const mockedTemperatureCharts = {
  labels: [convertTimeToDay(new Date("2021-04-30T09:00:00.000Z")),convertTimeToDay(new Date("2021-05-30T09:00:00.000Z")), convertTimeToDay(new Date("2021-06-30T09:00:00.000Z")), convertTimeToDay(new Date("2021-07-30T09:00:00.000Z")), convertTimeToDay(new Date("2021-08-30T09:00:00.000Z"))],
  datasets: [
      {
        label: 'Temperature (°C)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [13, 20, 14, 5, 10]
      }
    ]
  };

  export const mockedHumidityCharts = {
    labels: [convertTimeToDay(new Date("2021-04-30T09:00:00.000Z")),convertTimeToDay(new Date("2021-05-30T09:00:00.000Z")), convertTimeToDay(new Date("2021-06-30T09:00:00.000Z")), convertTimeToDay(new Date("2021-07-30T09:00:00.000Z")), convertTimeToDay(new Date("2021-08-30T09:00:00.000Z"))],
    datasets: [
      {
        label: 'Humidity (%)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [50, 60, 40, 55, 75]
      }
    ]
  };

  export const mockedCloudCharts = {
    labels: [convertTimeToDay(new Date("2021-04-30T09:00:00.000Z")),convertTimeToDay(new Date("2021-05-30T09:00:00.000Z")), convertTimeToDay(new Date("2021-06-30T09:00:00.000Z")), convertTimeToDay(new Date("2021-07-30T09:00:00.000Z")), convertTimeToDay(new Date("2021-08-30T09:00:00.000Z"))],
    datasets: [
      {
        label: 'Cloud speed (m/s)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [5, 10, 15, 12, 6]
      }
    ]
  };
  export function convertTimeToDay(currentDate: Date){
    const convertedDate = new Date(currentDate).getUTCDay();
    const day = new Date(currentDate).getUTCDate();
    const month = new Date(currentDate).getUTCMonth() + 1;
    switch (convertedDate) {
      case 1:
        return `Lundi ${day}/${month}`;
      case 2:
        return `Mardi ${day}/${month}`;
      case 3:
        return `Mercredi ${day}/${month}`;
      case 4:
        return `Jeudi ${day}/${month}`;
      case 5:
        return `Vendredi ${day}/${month}`;
      case 6:
        return `Samedi ${day}/${month}`;
      case 0:
        return `Dimanche ${day}/${month}`;
      default:
        return "";
    }
  }
  export function CloudChart(allData: forecastInterface[]){
    return {
            labels: [`${convertTimeToDay(allData[1].dateObj)}`, `${convertTimeToDay(allData[2].dateObj)}`, `${convertTimeToDay(allData[3].dateObj)}`, `${convertTimeToDay(allData[4].dateObj)}`],
            datasets: [
              {
                label: 'Vitesse vent (m/s)',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [+allData[1].Wind.speed, +allData[2].Wind.speed, +allData[3].Wind.speed, +allData[4].Wind.speed]
              }
            ],
          }
    }

  export function HumidityChart(allData: forecastInterface[]){
    return {
            labels: [`${convertTimeToDay(allData[1].dateObj)}`, `${convertTimeToDay(allData[2].dateObj)}`, `${convertTimeToDay(allData[3].dateObj)}`, `${convertTimeToDay(allData[4].dateObj)}`],
            datasets: [
              {
                label: 'Humidité (%)',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [+allData[1].humidity, +allData[2].humidity, +allData[3].humidity, +allData[4].humidity]
              }
            ],
          }
    }

export function TemperatureChart(allData: forecastInterface[]){
return {
        labels: [`${convertTimeToDay(allData[1].dateObj)}`, `${convertTimeToDay(allData[2].dateObj)}`, `${convertTimeToDay(allData[3].dateObj)}`, `${convertTimeToDay(allData[4].dateObj)}`],
        datasets: [
          {
            label: 'Temperature (°C)',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [+allData[1].Temperature.value, +allData[2].Temperature.value, +allData[3].Temperature.value, +allData[4].Temperature.value]
          }
        ],
      }
}

export const rainMarks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 8000,
      label: '8000',
    },
    {
      value: 15000,
      label: '15000',
    },
  ];