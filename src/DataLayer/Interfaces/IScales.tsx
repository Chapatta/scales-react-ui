// Define the type for a single finger position
export default interface IScaleSource {
    Id: number;
    Scale: number;
    ScaleType: number;
    Octaves: number;
    StartingNote: string;
    Name: string;
    Notes: string;
    KeyNotes: string;
}

export interface IScaleFilter {
    Type: ScaleFilterType;
    Value: string;
}

export enum ScaleFilterType {
    ScaleType = 1,
    Key = 2
}