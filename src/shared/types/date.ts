type IanaTimeZoneArea =
    | 'Africa'
    | 'America'
    | 'Antarctica'
    | 'Arctic'
    | 'Asia'
    | 'Atlantic'
    | 'Australia'
    | 'Etc'
    | 'Europe'
    | 'Indian'
    | 'Pacific';

export type TimeZone = 'UTC' | `${IanaTimeZoneArea}/${string}`;
