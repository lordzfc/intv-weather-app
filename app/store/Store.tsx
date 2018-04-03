import { observable, computed, action, runInAction} from "mobx";
import {WeatherFull, WeatherPeriod, City, CityRequest} from './Store.d';
import {BASE_URL, FETCH_CITIES_URL, WEATHER_API_KEY, POST_URL} from '../config/constants';
// 


const START_SEARCH: number = 2;
const MAX_SEARCH_ARR_SIZE: number = 10;

export class AppState {
  @observable weather: WeatherFull;
  @observable searchInput: string;
  @observable state: string;
  @observable cities: City[];


  constructor(initData?: WeatherFull) {
    this.searchInput = '';
    this.state = 'pending';
  }

  autocomplete():City[] {
    const strongCondition = (c:City, input:string): boolean => c.name.includes(input);

    // The reason why I wrote that 'magic function' is simple - there is no default method for checking
    // if *every* element from one array exists in second one.
    // i.e 'if [1, 2] is in [1, 3, 4]'* condition should return false because not every element from first array is in second one
    // but 'if [1, 2] is in [1, 3, 2]' should return true because both 1, 2 we can find in second one
    // Cuz strings are arrays, we can map and check if every element from the input exists in color.name property.
    // If there is at least one 'false' result, we can assume that not every character from the input is in color.name property.
    //
    // pure functional approach -> !input.split('').map(e=>c.name.includes(e)).includes(false);
    // finally I used a bit more imperative approach because it's a bit faster and easier to read
    // *pseudocode

    const lightCondition = (c: City, input: string): boolean => {
      const inputArr = input.split('');
      for(let idx in inputArr) {
        if(!c.name.includes(inputArr[idx])) {
          return false;
        }
      }
      return true;
    }    

    const createEntriesArr = (arr:City[], input:string, filterFunc: Function):City[] => arr.filter(c => filterFunc(c, input));
    
    return [...new Set([
      ...createEntriesArr(this.cities, this.searchInput, strongCondition), 
      ...createEntriesArr(this.cities, this.searchInput, lightCondition)
    ])]; // union of two arrays cuz entries can repeat

  }

  @computed get entriesList() {
    if(this.searchInput.length < START_SEARCH) {
      return [];
    }
    return this.autocomplete();
  }

  // TODO: write one function for fetching

  @action async fetchCities() {
    this.state = "pending"
    try {
      const res = await fetch(FETCH_CITIES_URL);
      
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }

      const cities: City[] = await res.json();
      // after await, modifying state again, needs an actions:
      runInAction(() => {
          this.state = "done";
          this.cities = cities;
      })
    } catch (error) {
      runInAction(() => {
          this.state = "error";
      })
    }
  }

  getCityWithTemperature(city: City, temp: number): CityRequest {
    return {...city, temp: temp};
  }

  @action async fetchWeather(cityId: number) {
    this.state = "pending"
    try {
      const res = await fetch(FETCH_CITIES_URL+`id=${cityId}&units=metric&APPID=${WEATHER_API_KEY}`);
      
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }

      const weather: WeatherFull = await res.json();
      // after await, modifying state again, needs an actions:
      runInAction(() => {
          this.state = "done";
          this.weather = weather;

      })
    } catch (error) {
      runInAction(() => {
          this.state = "error";
      })
    }
  }

  @action async postCity(city: CityRequest) {
    return fetch(POST_URL, {
      method: 'POST',
      body: JSON.stringify(city),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  @action updateSearchInputVal(input: string): void {
    this.searchInput = input;
  }
}
