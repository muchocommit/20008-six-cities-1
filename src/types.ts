interface Location {
  latitude: number,
  longitude: number,
  zoom: number
}

interface Offer {
  city: {
    name: string,
    location: Location
  },

  preview_image: string,

  images: string[],
  title: string,
  is_favorite: string,
  is_premium: string,
  rating: number,
  type: string,
  bedrooms: number,
  max_adults: number,
  price: number,
  goods: string[],

  host: {
    id: number,
    name: string,
    is_pro: boolean,
    avatar_url: string
  },

  description: string,
  location: Location,
  id: number
}

interface City {
  city: number
}

interface CityName {
  cityName: string
}

interface Cities {
  cities: Offer[]
}

interface Offers {
  offers: [Offer[], CityName],
}

interface CurrentOffers {
  offers: [Offer[], CityName],
}

interface CityNames {
  cityNames: CityName[]
}
