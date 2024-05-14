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

export const emptyScale = () : IScaleSource =>
{
    const scale : IScaleSource = 
    {
        Id: 0,
        Scale: 0,
        ScaleType: 0,
        Octaves: 0,
        StartingNote: '',
        Name: '',
        Notes: '',
        KeyNotes: ''
    };

    return scale;
}


export interface IScaleFilter {
    Type: ScaleFilterType;
    Value: string;
}

export enum ScaleFilterType {
    ScaleType = 1,
    Key = 2
}