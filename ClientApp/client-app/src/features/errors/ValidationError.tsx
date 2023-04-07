import { Message } from "semantic-ui-react";

interface Props{
    errors: string[]
}
export default function ValidationError({errors}:Props){

    return(
        <Message error> 
            {errors && (
                <Message.List>
                    {errors.map((err:string, id)=>(
                        <Message.Item key={id}>
                            {err}
                        </Message.Item>
                    ))}
                </Message.List>
            ) }
        </Message>
    )

}