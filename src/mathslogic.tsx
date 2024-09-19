import { useState } from "react";

function MathsLogic(WrappedComponent:any) {
    return function (props:any) {
        // const [area ,setarea] = useState(25)
        
        return <>
        <WrappedComponent {...props}></WrappedComponent>
        MathsLogic
        </>
    }
}

export default MathsLogic;