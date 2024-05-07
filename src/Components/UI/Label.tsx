interface LabelProps {
    id: string,
    caption: string,
    text: string
}

const Label = ({ id,caption,text}: LabelProps) => (
  <div className='tableRow'>
    <div>{caption}</div>
    <div className="VertSpacer"></div>
    <div id={id}>{text}</div>
  </div>
);

export default Label;
