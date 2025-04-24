import { LocationModel } from "./LocationModel.mjs";

export class LocationEditController{
    static locationId = "?"

    static{
        //Load id from query string
        const urlParams = new URLSearchParams(window.location.search)
        this.locationId = urlParams. get("id")

        // Set up events
        document.getElementById("save-location")
        .addEventListener("click", event => {
            this.handleSaveLocation();
        });

        document.getElementById("back-button")
        .addEventListener("click", event => { 
            this.handleBackButton()
        });

        document.getElementById("Cancel-button")
        .addEventListener("click", event => {
            this.handleCancelButton();
        });

        
        // Render location
        this.renderLocation()
        
    }

    static renderLocation(id){
        console.log(this.locationId)

        const location = LocationModel.getById(this.locationId)
        const locationName = document.getElementById("location-name")
        locationName.value = location.name
        // Render all appliances 
    }

    static loadAppliancePresetList(){

    }

    static loadStateList(){
        const stateList = document.getElementById("state-list")
        stateList.innerHTML = LocationModel.getStates().map(state => `<option value="${state}">${state}</option>`).join("");
        // Set the default value to the current state of the location
        const location = LocationModel.getById(this.locationId)
        stateList.value = location.state
        // Add event listener to update the state of the location when changed
        stateList.addEventListener("change", event => {
            const selectedState = event.target.value
            const location = LocationModel.getById(this.locationId)
            location.state = selectedState
            LocationModel.update(location)
        })

    }

    static handleSaveLocation(){
        console.log("Saving...")
        //TODO: Validate before saving

        // Load th existing version
        const location = LocationModel.getById(this.locationId)


        // Modify as needed, first we update the location name from
        // the location-name input
        const locationName = document.getElementById("location-name")
        location.name = locationName.value

        // Save the modified version back to localstorage
        LocationModel.update(location)
e
        // Redirect back to location
        window.location = "./views/location_list.html";

    }

    static handlePostToLeaderboard(id){
        console.log("Posting to leaderboard...")    
        const leaderboardEntry = { id, locationId: this.locationId, timestamp: Date.now() };
        LeaderboardModel.addEntry(leaderboardEntry);
        console.log("Leaderboard entry added:", leaderboardEntry);
        // Redirect to leaderboard page
        window.location = "/views/leaderboard.html";
        // Notify the user of the successful post
        alert("Successfully posted to the leaderboard!");
    }

    static handleAddAppliance(){
        //TODO: Validate appliance
        const applianceName = document.getElementById("appliance-name").value;
        const appliance = { name: applianceName, locationId: this.locationId };
        ApplianceModel.add(appliance);
        console.log("Appliance added:", appliance);
        // Redirect to appliance list page
        window.location = "/views/appliance_list.html";

    }

    static handleRemoveAppliance(index){
        const appliance = ApplianceModel.getByIndex(this.locationId, index);
        ApplianceModel.remove(appliance);
        console.log("Appliance removed:", appliance);
        // Redirect to appliance list page
        window.location = "/views/appliance_list.html";

    }

    static handleBackButton(){
        console.log("Navigating back to the location list...")
        window.location = "/views/location_list.html"
    }

    static handleCancelButton(){
        console.log("Are you sure want to cancel this changes?")
        if (confirm("All unsaved changes will be lost.")) {
            window.location = "/views/location_list.html"
        }

    }

}

