interface LabelProps {
    id: string,
    caption: string,
    text: string
}

const Label: React.FC<LabelProps> = ({ id,caption,text}) => {
  return (
    <div>
        <td>{caption}:</td><td></td><td><label id={id}>{text}</label></td>
    </div>
  );
};

export default Label;
