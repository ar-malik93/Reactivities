import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Activity } from "../../../models/activity";

interface Props {
    createOrEditActivity: (activity: Activity) =>void;
    submitting: boolean
}
export default function ActivityForm({ createOrEditActivity, submitting} : Props) {

    const {activityStore} = useStore();
    const {selectedActivity} = activityStore;

    const intialState = selectedActivity ?? {
        id:'',
        title:'',
        description:'',
        category:'',
        date:'',
        city:'',
        venue:''
    }

    const [activity,setActivity] = useState(intialState);

    function handleFormSubmit(){
        createOrEditActivity(activity)
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement |HTMLTextAreaElement>){
        const{name,value} = event.target;
        setActivity({...activity, [name]: value})
    }

  return (
    <Segment clearing>
      <Form onSubmit={handleFormSubmit} autoComplete='off'>
        <Form.Input  placeholder="Title" name='title' value={activity?.title} onChange={handleInputChange} />
        <Form.TextArea placeholder="Description" name='description' value={activity?.description} onChange={handleInputChange} />
        <Form.Input placeholder="Category" name='category' value={activity?.category} onChange={handleInputChange}/>
        <Form.Input placeholder="Date" type="date" name='date' value={activity?.date} onChange={handleInputChange} />
        <Form.Input placeholder="City" name='city' value={activity?.city} onChange={handleInputChange} />
        <Form.Input placeholder="Venue" name='venue' value={activity?.venue} onChange={handleInputChange}/>
        <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
        <Button onClick={()=> activityStore.closeForm()} floated="right" type="submit" content="Cancel" />
      </Form>
    </Segment>
  );
}
