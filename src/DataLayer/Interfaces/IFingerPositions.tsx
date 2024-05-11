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

const rows = 4;
const columns = 18;

const updateCell = (fingerPositions : IFingerPosition[][], fingerPosition: IFingerPositionSource) => {
    const rowIndex = getStringIndex(fingerPosition);
    const colIndex = fingerPosition.Fret;
    fingerPositions.map((row, rIdx) => {
        if (rIdx === rowIndex) {  
          return row.map((cell, cIdx) => {
                if (cIdx === colIndex) {
                  cell.Position = fingerPosition.Position;
                  cell.Finger = fingerPosition.Finger;
                  cell.Note = fingerPosition.Note;
                  return cell;
                } else {
                  return cell;
                } 
              });
        } else {
          return row;
        }
    });
}

const displayViolinData = (fingerPositions : IFingerPosition[][]) => {
    // Use forEach to iterate through rows and columns
    fingerPositions.forEach((row, rowIndex) => {
        row.forEach((element, columnIndex) => {
        console.log(`Element at row ${rowIndex}, column ${columnIndex}: ${element.String} ${element.Fret} ${element.Position} ${element.Finger}  ${element.Note}`);
        });
    });
}

const getStringIndex = (fingerPosition: IFingerPositionSource) => {
    let stringIndex = 0; 
    switch (fingerPosition.String) {
        case "E":
        stringIndex = 0;
        //console.log("Start of the work week!");
        break;
        case "A":
        stringIndex = 1;
        //console.log("Start of the work week!");
        break;
        case "D":
        stringIndex = 2;
        //console.log("Start of the work week!");
        break;
        case "G":
        stringIndex = 3;
        //console.log("Start of the work week!");
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


