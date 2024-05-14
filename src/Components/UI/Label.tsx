interface LabelProps {
    id: string,
    caption: string,
    text: string
}

const Label = (props: LabelProps) => (
  <div className='tableRow'>
    <div>{props.caption}</div>
    <div className="VertSpacer"></div>
    <div id={props.id}>{props.text}</div>
  </div>
);

export default Label;
