class FluentRestaurants {

  constructor(jsonData) {
    this.data = jsonData;
  }

  //fromState(stateStr: string): FluentRestaurants
  fromState(stateStr) {
    return new FluentRestaurants(this.data.filter(e => lib220.getProperty(e, 'state').found ? e.state === stateStr : false));
  }

  //ratingLeq(rating: number): FluentRestaurants
  ratingLeq(rating) {
    return new FluentRestaurants(this.data.filter(e => lib220.getProperty(e, 'stars').found ? e.stars <= rating : false));
  }

  //ratingGeq(rating: number): FluentRestaurants
  ratingGeq(rating) {
    return new FluentRestaurants(this.data.filter(e => lib220.getProperty(e, 'stars').found ? e.stars >= rating : false));
  }

  //category(categoryStr: string): FluentRestaurants
  category(categoryStr) {
    return new FluentRestaurants(this.data.filter(e => lib220.getProperty(e, 'categories').found ? e.categories.includes(categoryStr) : false));
  }

  //hasAmbience(ambienceStr: string): FluentRestaurants
  hasAmbience(ambienceStr) {
    return new FluentRestaurants(this.data.filter(e => lib220.getProperty(e, 'attributes').found
    ? (lib220.getProperty(e.attributes, 'Ambience').found 
      ? (lib220.getProperty(e.attributes.Ambience, ambienceStr).found 
        ? lib220.getProperty(e.attributes.Ambience, ambienceStr).value === true 
        : false)
      : false)
    : false));
  }

  //bestPlace(): Restaurant | {}
  bestPlace() {
    //If current FluentRestaurants object contains no restaurants, return empty object
    if (this.data.length === 0) {
      return {};
    }
    //first find which star rating is highest
    let mostStars = this.data.reduce((acc, e) => lib220.getProperty(e, 'stars').found && e.stars > acc ? e.stars : acc ,-1);
    //if mostStars is -1, no restaurants have a star rating, return empty objct
    if (mostStars === -1) {
      return {};
    }
    //now get restaurants with a rating of moststars
    let bestStarPlaces = [];
    this.data.forEach(e => {
      if(lib220.getProperty(e, 'stars').found && e.stars === mostStars) {
        bestStarPlaces.push(e);    
      }
    });
    //out of restaurants in bestStarPlaces, find what highest review count is
    let highestReviewCount = bestStarPlaces.reduce((acc, e) => lib220.getProperty(e, 'review_count').found && e.review_count > acc ? e.review_count : acc, -1);
    //if highestReviewCount is -1, means no restautants in bestStarPlaces have a review_count property, return first element in bestStarPlaces
    if (highestReviewCount === -1) {
      return bestStarPlaces[0];
    }
    //best places will contain all restaurants from bestStarPlaces with a review count of highestReviewCount
    let bestPlaces = [];
    bestStarPlaces.forEach(e => {
      if (lib220.getProperty(e, 'review_count').found && e.review_count === highestReviewCount) {
        bestPlaces.push(e);
      }
    });
    //Now return bestPlaces[0] because that is the first element of the remaining restaurants
    return bestPlaces[0];
  }

  //mostReviews(): Restaurant | {}
  mostReviews() {
    if (this.data.length === 0) {
      return {};
    }
    //first find which review_count is highest
    let highestReviewCount = this.data.reduce((acc, e) => lib220.getProperty(e, 'review_count').found && e.review_count > acc ? e.review_count : acc, -1);
    //if highestReviewCount is -1, this means no restaurants have a review_count property, return empty object
    if (highestReviewCount === -1) {
      return {};
    }
    //now get restaurants with a review_count of highestReviewCount
    let mostReviewedPlaces = [];
    this.data.forEach(e => {
      if(lib220.getProperty(e, 'review_count').found && e.review_count === highestReviewCount) {
        mostReviewedPlaces.push(e);
      }
    });
    //out of restaurants in mostReviewedPlaces, find what star rating is highest
    let mostStars = mostReviewedPlaces.reduce((acc, e) => lib220.getProperty(e, 'stars').found && e.stars > acc ? e.stars : acc, -1);
    //if mostStars is -1, means no restaurants in mostReviewPlaces have a star rating, return first element of mostReviewPlaces
    if (mostStars === -1) {
      return mostReviewedPlaces[0];
    }
    //best places will contain all restaurants from mostReviewedPlaces with a star rating of mostStars
    let bestPlaces = [];
    mostReviewedPlaces.forEach(e => {
      if(lib220.getProperty(e, 'stars').found && e.stars === mostStars) {
        bestPlaces.push(e);
      }
    });
    //now return bestPlaces[0] because that is the first element of the remaining restaurants
    return bestPlaces[0];
  }
}


//////////TESTING HERE/////////////

const testData = [
  {
    name: "Friendly's",
    state: "MA",
    stars: 5,
    review_count: 200
  },
  {
    name: "Conrad's",
    state: "MA", 
    stars: 4,
    review_count: 200
  },
  {
    name: "The Chateau",
    state: "PA",
    stars: 5,
    review_count : 100, 
    categories: [
      "Italian",
      "Fancy"
    ]
  },
  {
    name: "Applebee's",
    state: "NC",
    stars: 4,
    review_count: 6,
  },
  {
    name: "China Garden",
    state: "NC",
    stars: 4,
    review_count: 10,
    attributes: {
      Ambience: {
        hipster: false,
        trendy: false,
        upscale: true,
        casual: false
      }
    }
  },
  {
    name: "Beach Ventures Roofing",
    state: "AZ",
    stars: 2,
    review_count: 30,
  },
  {
    name: "Alpaul Automobile Wash",
    state: "NC",
    stars: 3,
    review_count: 30,
  }
]


const testData2 = [
  {
    name: "Friendly's",
    state: "MA",
    stars: 5,
  },
  {
    name: "Conrad's",
    state: "MA", 
    stars: 4,
  },
  {
    name: "The Chateau",
    state: "PA",
    stars: 5,
    categories: [
      "Italian",
      "Fancy"
    ]
  },
  {
    name: "Applebee's",
    state: "NC",
    stars: 4,
  },
  {
    name: "China Garden",
    state: "NC",
    stars: 4,
  },
  {
    name: "Beach Ventures Roofing",
    state: "AZ",
    stars: 3,
  },
  {
    name: "Alpaul Automobile Wash",
    state: "NC",
    stars: 3,
  }
]

const testData3 = [
  {
    name: "Friendly's",
    state: "MA",
    review_count: 20
  },
  {
    name: "Conrad's",
    state: "MA", 
    review_count: 40
  },
  {
    name: "The Chateau",
    state: "PA",
    review_count : 100, 
    categories: [
      "Italian",
      "Fancy"
    ]
  },
  {
    name: "Applebee's",
    state: "NC",
    review_count: 6,
  },
  {
    name: "China Garden",
    state: "NC",
    review_count: 10,
  },
  {
    name: "Beach Ventures Roofing",
    state: "AZ",
    review_count: 30,
  },
  {
    name: "Alpaul Automobile Wash",
    state: "NC",
    review_count: 30,
  }
]

test('fromState filters correctly', function() {
  let tObj = new FluentRestaurants(testData);
  let list = tObj.fromState('NC').data;
  assert(list.length === 3);
  assert(list[0].name === "Applebee's");
  assert(list[1].name === "China Garden");
  assert(list[2].name === "Alpaul Automobile Wash");
});

test('ratingLeq filters correctly', function() {
  let tObj = new FluentRestaurants(testData);
  let newTObj = tObj.ratingLeq(3);
  assert(newTObj.data.length === 2);
  assert(newTObj.data[0].name === "Beach Ventures Roofing");
  assert(newTObj.data[1].name === "Alpaul Automobile Wash");
});

test('ratingGeq filters correctly', function() {
  let tObj = new FluentRestaurants(testData);
  let newTObj = tObj.ratingGeq(4);
  assert(newTObj.data.length === 5);
  assert(newTObj.data[0].name === "Friendly's");
  assert(newTObj.data[4].name === "China Garden");
});

test('ratingLeq filters correctly for rating of 0', function() {
  let tObj = new FluentRestaurants(testData);
  let newTObj = tObj.ratingLeq(0);
  assert(newTObj.data.length === 0);
});

test('ratingGeq filters correctly for rating of 6', function() {
  let tObj = new FluentRestaurants(testData);
  let newTObj = tObj.ratingGeq(6);
  assert(newTObj.data.length === 0);
});

test('bestPlace tie-breaking', function() {
  let tObj = new FluentRestaurants(testData);
  let place = tObj.fromState('NC').bestPlace();
  assert(place.name === 'China Garden');
});

test('mostReviews tie-breaking', function() {
  let tObj = new FluentRestaurants(testData);
  let newTObj = tObj.mostReviews();
  console.log(newTObj);
  assert(newTObj.name === "Friendly's");
});

test('test category returns 1 restaurant', function() {
  let tObj = new FluentRestaurants(testData);
  let newTObj = tObj.category("Italian");
  assert(newTObj.data.length === 1);
  assert(newTObj.data[0].name === "The Chateau");
});

test('test category returns 0 restaurants', function() {
  let tObj = new FluentRestaurants(testData);
  let newTObj = tObj.category("French");
  assert(newTObj.data.length === 0);
});

test('test mostReviews returns empty object', function() {
  let tObj = new FluentRestaurants(testData2);
  let newTObj = tObj.mostReviews();
  //checking to see that newTObj is empty
  assert(Object.keys(newTObj).length === 0 && Object.getPrototypeOf(newTObj) === Object.prototype);
});

test('test bestPlace returns empty object', function() {
  let tObj = new FluentRestaurants(testData3);
  let newTObj = tObj.bestPlace();
  //checking to see that newTObj is empty
  assert(Object.keys(newTObj).length === 0 && Object.getPrototypeOf(newTObj) === Object.prototype);
});

test('test hasAmbience', function() {
  let tObj = new FluentRestaurants(testData);
  let newTObj = tObj.hasAmbience("upscale");
  assert(newTObj.data[0].name === "China Garden");
});

test('test hasAmbience returns 0 restaurants', function() {
  let tObj = new FluentRestaurants(testData);
  let newTObj = tObj.hasAmbience('hipster');
  let newTObj2 = tObj.hasAmbience('swaggy');
  assert(newTObj.data.length === 0);
  assert(newTObj2.data.length === 0);
});