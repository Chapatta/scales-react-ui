//was able to copy this straight over from the javasacript implementation
//except type script was looking for strong datatype for the function parameters
//you were able to quick fix these
//remove  assert { type: "json" } from the import
import scaleTypesJSON from './ScaleTypes.json';
import scalesJSON from './Scales.json';
import fingerPositionJSON from './FingerPositions.json';
import keySignaturesJSON from './KeySignatures.json';
import keyScalesJSON from './KeyScales.json';
import violinNoteJSON from './ViolinNotes.json';
import noteFretsJSON from './NoteFrets.json';

//This was not needed the system is smart enough to infer the interface from the json file!!
// export interface Key {
//     notes: string;
// }

// export function getKeys(): Key[] {
//     let keys: Array<{ notes: string }> = [
//         {notes : "None"},
//         {notes : "F#"},
//         {notes : "F# C#"},
//         {notes : "F# C# G#"},
//         {notes : "F# C# G# D#"},
//         {notes : "F# C# G# D# A#"},
//         {notes : "F# C# G# D# A# E#"},
//         {notes : "F# C# G# D# A# E# B#"},
//         {notes : "Bb"},
//         {notes : "Bb Eb"},
//         {notes : "Bb Eb Ab"},
//         {notes : "Bb Eb Ab Db"},
//         {notes : "Bb Eb Ab Db Gb"},
//         {notes : "Bb Eb Ab Db Gb Cb"},
//         {notes : "Bb Eb Ab Db Gb Cb Fb"}
//     ];
//     return keys;
// }

export function GetKeys()
{
    return keySignaturesJSON;
}

export function GetScaleTypes()
{
    return scaleTypesJSON;
}

export function GetScales(scaleType: number)
{
    return scalesJSON.filter(item => {return item.ScaleType == scaleType}).sort((r1, r2) => (r1.StartingNote > r2.StartingNote) ? 1 : (r1.StartingNote < r2.StartingNote) ? -1 : 0);
}

export function GetMaxFret()
{
    return fingerPositionJSON.reduce((a,b)=>a.Fret>b.Fret?a:b).Fret;
}

export function GetKeyScales(keyNotes: string)
{
    return keyScalesJSON.filter(item => {return item.KeyNotes == keyNotes}).sort((r1, r2) => (r1.ScaleType > r2.ScaleType) ? 1 : (r1.ScaleType < r2.ScaleType) ? -1 : 0);
}

export function GetScale(scaleID: number)
{
    return scalesJSON.find(item => {return item.ID == scaleID})
}

export function GetFingerPositions(scaleID: number,octaves: number)
{
    return fingerPositionJSON.filter(item => {return item.Scale == scaleID && item.Octaves == octaves})
}

export function GetViolinNotes(string: string,fret: number)
{
    return violinNoteJSON.filter(item => {return item.String == string && item.Fret == fret})
}

export function GetNoteFrets()
{
    const noteFretsJS = noteFretsJSON.sort((r1, r2) => (r1.fret > r2.fret) ? 1 : (r1.fret < r2.fret) ? -1 : 0);
    const noteFretsArr = [];
    for(let i in noteFretsJS) { 
        noteFretsArr.push([i,noteFretsJS[i]]); 
     }; 
     return noteFretsArr;
}

