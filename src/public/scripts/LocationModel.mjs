export class LocationModel {
  static {
    console.log("Setting up location models!");
    if (localStorage.getItem("locations") === null) {
      const locations = [];
      localStorage.setItem("locations", JSON.stringify(locations));
    }
  }

  static create(location) {
    // Load up the list of locations
    const locations = this.getAll();

    // Append the new location to the list of locations
    locations.push(location);

    // Save it back to localStorage
    this.storeAll(locations);
  }

  static storeAll(locations) {
    localStorage.setItem("locations", JSON.stringify(locations));
  }


  static getAll() {
    const locations = JSON.parse(localStorage.getItem("locations"));

    return locations.map(locations => new LocationModel(
      location.id,
      location.name,
      location.state,
      location.appliances
    ))
  }


  static getById(id) {
    const locations = this.getAll();

    //TODO: Implement find
    for (const location of locations) {
      if (location.id === id) {
        return location;
      }
    }
    return null;
  }


  static update(updatedLocation) {
    //Load the locations
    const locations = this.getAll();

    //Loop through the locations and find the one that matches the id
    for (let i = 0; i < locations.length; i++) {
      if (locations[i].id === updatedLocation.id) {
        //Update the location
        locations[i] = updatedLocation;
      }
    }
    //Save it back to localStorage
    this.storeAll(locations);
  }

  static delete(id) {
    //Load the locations
    let locations = this.getAll();

    locations = locations.filter((location) => location.id != id);

    this.storeAll(locations);
  }

  //Members fields
  id = "";
  name = "";
  state = "";
  appliances = [];

  constructor(id, name, state, appliances) {
    this.id = id ?? window.crypto.randomUUID();
    this.name = name;
    this.state = state;
    this.appliances = appliances;
  }

  getNumberOfAppliances() {
    return this.appliances.length;
  }

  getTotalEnergyUsePerDay() {
    //TODO: Loop through appliances and calculate total energy use
    let totalEnergy = this.appliances.reduce(
      (total, appliance) => total + (appliance.energyUsePerDay || 0),
      0
    );
    return totalEnergy;
  }
}
