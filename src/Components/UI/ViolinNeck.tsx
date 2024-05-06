import * as IFingerPos from '../../DataLayer/Interfaces/IFingerPositions'

interface ViolinNeckProps {
  violinData: IFingerPos.default[][]
//   onSelect: (value: string) => void;
}

const ViolinNeck = ({violinData}: ViolinNeckProps) => (
    violinData.map((row, rowIndex) => (
        <div key={rowIndex} className="ViolinNeck">
          {row.map((cell, colIndex) => (
          <div key={colIndex}>
            <div className="position finger">
              {/* onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)} */}
              {cell.Finger ? cell.Finger : "\u00a0"} 
            </div>
            <div className="position">
              {cell.Position ? cell.Position : "\u00a0"} 
            </div>
            <div className="position note">
              {cell.Note ? cell.Note : "\u00a0"} 
            </div>
            </div>
          ))}
        </div>
      )
  )
)

export default ViolinNeck;
