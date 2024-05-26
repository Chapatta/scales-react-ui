// Define the type for a single finger position
import ViolinString from '../../Components/ViolinString'
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

const rows = 4;
const columns = 18;

const updateCell = (fingerPositions : IFingerPosition[][], fingerPosition: IFingerPositionSource) => {
    const rowIndex = getStringIndex(fingerPosition.String);
    const colIndex = fingerPosition.Fret;
    fingerPositions[rowIndex][colIndex].Position = fingerPosition.Position;
    fingerPositions[rowIndex][colIndex].Finger = fingerPosition.Finger;
    fingerPositions[rowIndex][colIndex].Note = fingerPosition.Note;
}

const displayViolinData = (fingerPositions : IFingerPosition[][]) => {
    // Use forEach to iterate through rows and columns
    fingerPositions.forEach((row, rowIndex) => {
        row.forEach((element, columnIndex) => {
        console.log(`Element at row ${rowIndex}, column ${columnIndex}: ${element.String} ${element.Fret} ${element.Position} ${element.Finger}  ${element.Note}`);
        });
    });
}

export function cellValue(item: IFingerPosition,cellType : string) : string
{
    const value: string = (cellType == "Position" ? item.Position : item.Finger?.toString()) ?? "";
    return value;
}

function getStringIndex(stringName : string) : number {
    let stringIndex = 0; 
    switch (stringName) {
        case "E":
        stringIndex = ViolinString.E;
        break;
        case "A":
        stringIndex = ViolinString.A;
        break;
        case "D":
        stringIndex = ViolinString.D;
        break;
        case "G":
        stringIndex = ViolinString.G;
        break;
        default:
        console.log("Invalid String.");
        break;
    }
    return stringIndex;
}
  
export const getScale = (fingerPositions: IFingerPositionSource[]) : IFingerPosition[][] =>
{
    // Initialize the 2D array with a default object in each cell
    const twoDimArray : IFingerPosition[][] = emptyViolinNeck()
    
    fingerPositions.forEach((fingerPosition) => {
        updateCell(twoDimArray,fingerPosition)
        //console.log(`Index ${index}: ${value}`);
    });
    //  displayViolinData(twoDimArray);
    return twoDimArray;
}

export const emptyViolinNeck = () : IFingerPosition[][] =>
{
    const twoDimArray : IFingerPosition[][] = Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: columns }, (_, colIndex) => ({
        String: rowIndex,
        Fret: colIndex,
        Position: null,
        Finger: null,
        Note: null
            }))
        );
    return twoDimArray;
}


