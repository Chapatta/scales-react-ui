interface ViolinFretProps {
  //keys: Keys.Key[];
  position: number,
  finger: number,
  note: string
//   onSelect: (value: string) => void;
}

const ViolinFret: React.FC<ViolinFretProps> = ({ position,finger,note }) => {
  return (
    <div>
        <div className="position">
            {position}
        </div>
        <div className="finger">
            {finger}
        </div>
        <div className="note">
            {note}
        </div>
    </div>
  );
};

export default ViolinFret;