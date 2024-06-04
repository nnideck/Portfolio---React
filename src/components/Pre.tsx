
interface iProps {
  load: boolean
}

function Pre(props: iProps) {
  return <div id={props.load ? "preloader" : "preloader-none"}></div>;
}

export default Pre;
