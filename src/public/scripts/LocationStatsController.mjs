export class LocationStatsController{
    static{
        const leaderboardData = []
        
        // Set up events
        document.getElementById("back-button")
        .addEventListener("click", event =>{
            this.handleBackButton();
        })

    }

   

    static renderLocationStatistics = (req, res) => {

        const locationName = req.params.location; 
    
        if (locationData[locationName]) {
            const statistics = locationData[locationName].energyUsage;
            res.render('locationStatistics', { location: locationData[locationName], statistics });
        } else {
            res.status(404).send('Location not found');
        }
    };

    static postToLeaderboard() {
        const form = document.getElementById('leaderboardForm');
        const formData = new FormData(form);

        fetch('/leaderboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: new URLSearchParams(formData).toString(),
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) })
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('message').innerText = data;
            // Optionally, clear the form after successful submission
            form.reset();
        })
        .catch(error => {
            document.getElementById('message').innerText = 'Error posting to leaderboard: ' + error;
        });
    }

    static handleBackButton(){
       // Redirect to location list
        window.location = "/views/location_list.html"
    }


    // static postToLeaderboard = (req, res) => {

    //     const { locationName, statisticName, statisticValue } = req.body;
    
    //     if (locationData[locationName]) {
    //         leaderboardData.push({
    //             location: locationData[locationName].name,
    //             statistic: statisticName,
    //             value: parseFloat(statisticValue),
    //             timestamp: new Date(),
    //         });
    //          // TODO: save this to  databasesave this to  localstorage
    //          this.saveToLocalStorage(leaderboardData);
            
    
    //         console.log('Leaderboard updated:', leaderboardData);
    //         res.status(200).send('Statistics posted to leaderboard successfully!');
    //     } else {
    //         res.status(404).send('Location not found');
    //     }
    // };

    static saveToLocalStorage(data) {
        // Implementation to
        localStorage.setItem('leaderboardData', JSON.stringify(data));
        console.log('Data saved to local storage.');

}
}


// data models
const locationData = {
    brisbane: {
        name: 'Brisbane',
        energyUsage: {
            solar: 1500,
            wind: 800,
            fossilFuels: 2200,
        },
    },
    sydney: {
        name: 'Sydney',
        energyUsage: {
            solar: 1200,
            wind: 1000,
            nuclear: 500,
            fossilFuels: 2500,
        },
    },
    NSW: {
        name: 'NSW',
        energyUsage: {
            solar: 1200,
            wind: 1000,
            nuclear: 500,
            fossilFuels: 2500,
        },
    },
};


module.exports = {
    renderLocationStatistics,
    postToLeaderboard,
};