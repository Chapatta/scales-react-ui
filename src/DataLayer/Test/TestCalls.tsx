import scaleTypesJSON from './ScaleTypes.json';
import scalesJSON from './Scales.json';
import fingerPositionJSON from './FingerPositions.json';
import keySignaturesJSON from './KeySignatures.json';
import violinNoteJSON from './ViolinNotes.json';
import noteFretsJSON from './NoteFrets.json';

//Interfaces
import * as IFingerPos from '../Interfaces/IFingerPositions'
import IScale from '../Interfaces/IScales'

export function GetKeys()
{
    return keySignaturesJSON;
}

export function GetScaleTypes()
{
    return scaleTypesJSON;
}

export function GetScaleTypeScales(scaleType: number) : IScale[]
{
    return scalesJSON.filter(item => {return item.ScaleType == scaleType}).sort((r1, r2) => (r1.StartingNote > r2.StartingNote) ? 1 : (r1.StartingNote < r2.StartingNote) ? -1 : 0);
}

export function GetMaxFret()
{
    return fingerPositionJSON.reduce((a,b)=>a.Fret>b.Fret?a:b).Fret;
}

export function GetKeyScales(keyNotes: string) : IScale[]
{
    return scalesJSON.filter(item => {return item.KeyNotes == keyNotes}).sort((r1, r2) => (r1.ScaleType > r2.ScaleType) ? 1 : (r1.ScaleType < r2.ScaleType) ? -1 : 0);
}

export function GetScale(scaleID: number) : IScale
{
    return scalesJSON.find(item => {return item.ID == scaleID})
}

export function GetFingerPositions(scaleID: number,octaves: number) : IFingerPos.IFingerPositionSource[]
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

