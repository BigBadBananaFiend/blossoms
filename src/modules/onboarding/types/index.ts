export interface ILocation {
    name: string
    id: string
}

export interface ICity extends ILocation {}
export interface ICountry extends ILocation {
    iso2: string
}
