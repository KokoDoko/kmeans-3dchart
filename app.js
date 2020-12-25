import { Chart3D } from "./native_modules/Chart3d.js"
import { Kmeans } from "./native_modules/Kmeans.js"
import { createFakeData } from "./fakedata.js"

// fake data
let data = createFakeData()

// create chart
let chart = new Chart3D()

// draw raw data in chart
// chart.addData(data)
// clear chart
// chart.clearGraph()

// kmeans
let km = new Kmeans()

// create 3 clusters 
km.createClusters(data, 3, (clusters, centroids) => {
    chart.addClusters(clusters)
})