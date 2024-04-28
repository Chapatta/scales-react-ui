export const NumNoteDetails = 3;
export const NumStrings = 4;

export const RowAscStart = 1;
export const RowAscEnd = RowAscStart + NumStrings * NumNoteDetails - 1; //12

export const RowDescStart = 15;
export const RowDescEnd = RowDescStart + NumStrings * NumNoteDetails - 1; //26

export const RowDirOffset = RowDescStart - RowAscStart;

export const Empty = "&nbsp;";

//export const NoteFrets = DAL.GetNoteFrets();
export function SetDropDown(dropdown,text)
{
    //var el = document.getElementById("mydropdown");
    for(var i=0; i<dropdown.options.length; i++) 
    {
        if (dropdown.options[i].text.includes(text)) 
        {
            dropdown.selectedIndex = i;
            return dropdown.value;
            break;
        }
    }
}

export var DoesCellHaveElement = (cell,element) => {
    return cell.innerHTML.toLowerCase().indexOf('<' + element) >= 0;
}; 

export function EmptyCell(cellValue)
{
    if (cellValue === undefined )
    {
        return true;
    }
    if (cellValue == Empty )
    {
        return true;
    }
    if (cellValue == "")
    {
        return true;
    }

   return false;
}

export function EmptyCellNumber(cellValue)
{
    if (cellValue === undefined )
    {
        return true;
    }
    if (cellValue == Empty )
    {
        return true;
    }

   return false;
}

export function CellIndex(violin,rowIndex,cellIndex)
{
    //This takes the cell index and pushes it back one if it is a Violine position row
    //This is because this is because the other two rows not and finger don't count as they are merged 
    //into the position row
    if (PositionRow(violin,rowIndex))
    {
        cellIndex = cellIndex - 1;
    }

    return cellIndex;
}

export function CellIndexPosition(violin,rowIndex,cellIndex)
{
    //This takes the cell index and pushes it back one if it is a Violine position row
    //This is because this is because the other two rows not and finger don't count as they are merged 
    //into the position row
    if (PositionRow(violin,rowIndex))
    {
        cellIndex = cellIndex + 1;
    }

    return cellIndex;
}

export function RowStartCell(violin,r)
{
    let startCell = 0;
    if (PositionRow(violin,r)){startCell = 1;}
    return startCell;
}

function PositionRow(violin,rowIndex)
{
    return violin.rows[rowIndex].className == "position";
}

export function NoteRow(violin,rowIndex)
{
    return violin.rows[rowIndex].className == "note";
}

export function GetNoteRow(rowIndex)
{
    let rowNote;
    if (rowIndex <= RowAscEnd)
    {
        rowNote = (Math.floor((rowIndex-RowAscStart)/NumNoteDetails) + 1) * NumNoteDetails;
    }
    else
    {
        rowNote = (Math.floor((rowIndex-RowDescStart)/NumNoteDetails) + 1) * NumNoteDetails + RowDescStart - 1;
    }
    return rowNote;
}

function GetKeyType(keyNotes)
{
    if (keyNotes == "None")
    {
        return "#";
    }  
    if (keyNotes.includes("#"))
    {
        return "#";
    }
    return "b";
}

export function GetScaleNotes(scaleNotes)
{
    let text = scaleNotes;
    text.replace("("," ");
    text.replace(")"," ");

    return text.split(" ");
}