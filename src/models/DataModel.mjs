export class DataModel {

    static data = []
    
    static insert(task) {
        this.data.push(task)
    }

    static update(id, task) {
        // Loop through the tasks and find the one that matches the id
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id == id) {
                this.data[i] = task
                return
            }
        }
    }
    
    static getAll() {
        return this.data
    }
    
    static getById(id) {
        // Loop through the tasks and find the one that matches the id
        for (const task of this.data) {
            if (task.id == id) {
                return task
            }
        }
        return null
    }
    
    static toggleById(id) {
        const task = this.getById(id)
        
        if (task != null) {
            task.complete = !task.complete
        }
    }

    // Member fields (exists locally for each object. i.e, every 
    // object gets it's own copy)
    id = ""
    name = ""
    state = ""
    appliances = []
   
    
    constructor(id, name, state, appliances) {

        // A little but fancy but short
        this.id = id ?? crypto.randomUUID()
        this.name = name
        this.state = state
        this.appliances = appliances
    }
}

// Add some testing data

DataModel.insert(new DataModel(null, "New Location", appliances))
