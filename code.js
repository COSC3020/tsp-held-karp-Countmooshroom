function tsp_hk(dist) {
    // cities is the set of cities not visited so far, including start
    let cities = [];
    for (let i = 0; i < dist.length; i++) {
        cities.push(i);
    }
    let best = Infinity;
    for (let i = 0; i < cities.length; i++) {
        let temp = heldKarp(cities, i);
        if (temp < best) { best = temp; }
    }
    return best;

    //Add some dynamic programming here


    


    function heldKarp(cities, start) {
        if (cities.length == 2) {
            //return length of tour that starts at start, goes directly to other city in cities
            return dist[cities[0]][cities[1]];
        }

        else if (cities.length < 2) {
            return 0;
        }

        else {
            //return the minimum
            let min = Infinity;

            //for each city in cities, unless the city is start
            for (city of cities) {
                if (city != start) {
                    //reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
                    let newCities = [...cities];
                    newCities.splice(cities.indexOf(start), 1);
                    let d = heldKarp(newCities, city) + dist[start][city];
                    if (d < min) { min = d; }
                }
            }
            return min;
        }
    }
}