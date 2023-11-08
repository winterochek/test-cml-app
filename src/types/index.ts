export type VisitData = {
   location: Location
   timestamp: number
}

export type Location = {
   latitude: number
   longitude: number
}

export type Visit = VisitData & { id: string }
