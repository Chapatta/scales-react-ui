// import React from 'react';
import * as useApi from '../Services/API/APITool'; 
import IScale from './Interfaces/IScales';
import IScaleType from './Interfaces/IScalesType';
import scalesJSON from './Scales.json';
import fingerPositionJSON from './FingerPositions.json';
import keySignaturesJSON from './KeySignatures.json';
import violinNoteJSON from './ViolinNotes.json';
import noteFretsJSON from './NoteFrets.json';

const RestAPIURL : string = "https://localhost:7148/Keys";

export function GetKeys()
{
    return keySignaturesJSON;
}

export function GetScaleTypes(apiResult : useApi.ApiResult<IScaleType>)
{
    apiResult = useApi.default<IScaleType[]>(RestAPIURL);
    return apiResult;
}

export function GetScaleTypeScales(scaleType: number) : IScale[]
{
    return scalesJSON.filter(item => {return item.ScaleType == scaleType}).sort((r1, r2) => (r1.StartingNote > r2.StartingNote) ? 1 : (r1.StartingNote < r2.StartingNote) ? -1 : 0);
}

export function GetKeyScales(keyNotes: string) : IScale[]
{
    return scalesJSON.filter(item => {return item.KeyNotes == keyNotes}).sort((r1, r2) => (r1.ScaleType > r2.ScaleType) ? 1 : (r1.ScaleType < r2.ScaleType) ? -1 : 0);
}

export function GetScale(scaleID: number) : IScale
{
    return scalesJSON.find(item => {return item.Id == scaleID})
}

export function GetFingerPositions(scaleID: number,octaves: number) : IFingerPos.IFingerPositionSource[]
{
    return fingerPositionJSON.filter(item => {return item.Scale == scaleID && item.Octaves == octaves})
}



