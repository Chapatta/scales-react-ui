import Fret from '../../Classes/Fret'; // Import the default export

interface ViolinFretProps {
  fret: Fret
//   onSelect: (value: string) => void;
}

const ViolinFret: React.FC<ViolinFretProps> = ({ fret }) => {
  return (
    <div>
        <div className="position">
            {fret.position}
        </div>
        <div className="finger">
            {fret.finger}
        </div>
        <div className="note">
            {fret.note}
        </div>
    </div>
  );
};

export default ViolinFret;