interface LabelProps {
    id: string,
    text: string
}

const Label: React.FC<LabelProps> = ({ id,text}) => {
  return (
    <td><label id={id}>{text}</label></td>
  );
};

export default Label;
