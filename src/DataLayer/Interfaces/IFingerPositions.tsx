// Define the type for a single finger position
export interface IFingerPositionSource {
    Scale: number;
    Octaves: number;
    FingerBlock: number;
    NotePosition: number;
    String: string;
    Fret: number;
    Direction: string;
    Note: string;
    Finger: number;
    Position: string;
}

export default interface IFingerPosition {
    String: number;
    Fret: number;
    Position: string | null;
    Finger: number | null;
    Note: string  | null;
}

// Define the type for the entire JSON object
export interface IFingerPositionsData {
    positions?: IFingerPositionSource[];
}
  

