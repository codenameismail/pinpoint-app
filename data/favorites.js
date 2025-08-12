const artImg = require("../assets/images/art-museum.png");
const bookstoreImg = require("../assets/images/bookstore.png");
const parkImg = require("../assets/images/central-park.png");
const coffeeImg = require("../assets/images/coffee-bean.png");
const restaurantImg = require("../assets/images/restaurant.png");
const beachImg = require("../assets/images/sunny-beach.png");

export const favourites = [
  {
    id: "1",
    title: "The Coffee Bean",
    image: coffeeImg,
    location: {
      latitude: 34.052235,
      longitude: -118.243683,
      address: "123 Main St, Los Angeles, CA, USA",
    },
    description: "A cozy coffee shop with a modern interior and great brews.",
    dateAdded: new Date("2025-08-12T09:00:00Z"),
  },
  {
    id: "2",
    title: "Central Park",
    image: parkImg,
    location: {
      latitude: 40.785091,
      longitude: -73.968285,
      address: "5th Ave, New York, NY, USA",
    },
    description:
      "A large urban park with scenic walking paths, lakes, and greenery.",
    dateAdded: new Date("2025-08-12T09:10:00Z"),
  },
  {
    id: "3",
    title: "The Art Museum",
    image: artImg,
    location: {
      latitude: 38.891298,
      longitude: -77.019965,
      address: "456 Oak Ave, Washington, DC, USA",
    },
    description: "A modern museum showcasing art from around the world.",
    dateAdded: new Date("2025-08-12T09:20:00Z"),
  },
  {
    id: "4",
    title: "The Bookstore",
    image: bookstoreImg,
    location: {
      latitude: 37.774929,
      longitude: -122.419418,
      address: "789 Elm St, San Francisco, CA, USA",
    },
    description: "A quiet bookstore with a curated collection of literature.",
    dateAdded: new Date("2025-08-12T09:30:00Z"),
  },
  {
    id: "5",
    title: "Gourmet Restaurant",
    image: restaurantImg,
    location: {
      latitude: 48.856613,
      longitude: 2.352222,
      address: "101 Pine Ln, Paris, France",
    },
    description:
      "Fine dining with exquisite dishes and a sophisticated atmosphere.",
    dateAdded: new Date("2025-08-12T09:40:00Z"),
  },
  {
    id: "6",
    title: "Sunny Beach",
    image: beachImg,
    location: {
      latitude: 25.790654,
      longitude: -80.1300455,
      address: "Beachfront Rd, Miami Beach, FL, USA",
    },
    description: "A sunny, sandy beach perfect for relaxing and swimming.",
    dateAdded: new Date("2025-08-12T09:50:00Z"),
  },
];
