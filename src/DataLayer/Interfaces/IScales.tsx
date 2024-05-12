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

// export default interface IScale {
//     String: number;
//     Fret: number;
//     Position: string;
//     Finger: number;
//     Note: string;
// }