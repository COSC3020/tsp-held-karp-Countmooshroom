function tsp_hk(dist) {
    // cities is the set of cities not visited so far, including start
    let cities = [];
    for (let i = 0; i < dist.length; i++) {
        cities.push(i);
    }
    let best = Infinity;

    //memoization
    let cache = [];

    for (let i = 0; i < cities.length; i++) {
        let temp = heldKarp(cities, i);
        if (temp < best) { best = temp; }
    }
    return best;    


    function heldKarp(cities, start) {
        let key = JSON.stringify([cities, start]);
        if (cache[key] != undefined) { return cache[key]; }

        if (cities.length == 2) {
            //return length of tour that starts at start, goes directly to other city in cities
            cache[key] = dist[cities[0]][cities[1]];
            return dist[cities[0]][cities[1]];
        }

        else if (cities.length < 2) { return 0; }

        else {
            //return the minimum
            let min = Infinity;

            //make list of cities excluding the start
            let newCities = [...cities];
            newCities.splice(cities.indexOf(start), 1);

            //for each city in cities, unless the city is start
            for (let i = 0; i < newCities.length; i++) {
                //reduce the set of cities that are unvisited by one (the old start), set the new start, add on the distance from old start to new start
                let d = heldKarp(newCities, newCities[i]) + dist[start][newCities[i]];
                if (d < min) { min = d; }
            }
            cache[key] = min;
            return min;
        }
    }
}