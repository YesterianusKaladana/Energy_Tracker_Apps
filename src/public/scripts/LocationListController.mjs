import { LocationModel } from "./LocationModel.mjs";

export class LocationListController{
    static{
        // Set up events
        document.getElementById("create-location")
        .addEventListener("click", event => {
            this.handleCreateLocation()
        })

        // Render initial views
        this.renderLocations()
    }

    static renderLocations(){
        console.log("Rendering location list!")
        // Render locations view
        const locations = LocationModel.getAll()

        const locationsList = document.getElementById("location-list")

        locationsList.innerHTML = ""

        for(const location of locations){
            const locationItem = document.createElement("li")

            const locationHeading = document.createElement("h2")
            locationHeading.innerText = location.name
            locationItem.appendChild(locationHeading)

            //TODO: Add code to generate others 
            // elements such as state, watts, appliances count,...


            const editButton = document.createElement("input")
            editButton.type = "button"
            editButton.value = "Edit"
            editButton.addEventListener("click",event =>{
                //TODO: Add code to edit location
                this.handleEditLocation(location.id)
            })
            locationItem.appendChild(editButton)

            // Finally add the item to the list
            locationsList.appendChild(locationItem)
        }
    }


    static handleCreateLocation(){
      console.log("Creating new location!")
      //TODO: Add code to create new location
      const location = new LocationModel( null, "", "", [])

      // Create location in localStorage
      LocationModel.create(location)

      this.handleEditLocation(location.id)
    }


    static handleDeleteLocation(){
        // Handle delete location event
    }

    static handleFilterLocations(){
        // Handle filter location event
    }

    static handleEditLocation(id){
       console.log("Editing location with id" + id)

       window.location = "/views/location_edit.html?id=" + id
    }

    static handleViewStats(id){
        console.log("Viewing stats for location with id " + id)
        
        window.location = "/views/location_stats.html?id=" + id;
    }
}