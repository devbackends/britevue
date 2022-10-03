export interface IGooglePlace{
    id?: string,
    place_id?: string,
    name: string,
    icon?: string,
    formatted_phone_number?: string,
    formatted_address?: string,
    website?: string,
    user_ratings_total?: number,
    rating: number,
    photos?: any[],
    vicinity?: string,
    plus_code?: any,
    types?: string[],
    opening_hours: {
      open_now: boolean,
      periods?: any,
      weekday_text?: string[]
    },
    price_level?: number,
    business_status: string,
    geometry: {
      location: {
        lat: number,
        lng: number,
      }
      viewport: {
        northeast: {
          lat: number,
          lng: number,
        }
        southwest: {
          lat: number,
          lng: number,
        }
      }
    },
}
