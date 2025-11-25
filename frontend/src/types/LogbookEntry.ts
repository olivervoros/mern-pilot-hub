export interface LogbookEntry {
  _id?: string;
  title: string;
  departureIcao: string;
  arrivalIcao: string;
  aircraftType: string;
  departureTime: string;
  arrivalTime: string;
  additionalInfo: string;
}
