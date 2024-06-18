import Typewriter from "typewriter-effect";

interface IinitialValues {
  value: string[];
}

function Type( value: IinitialValues) {
  if (!value){
    return ("")
  } else {
  return (
     <Typewriter
      options={{
        strings: value.value,
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    /> 
  );}
}

export default Type;
