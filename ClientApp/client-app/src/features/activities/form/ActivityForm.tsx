import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { Activity } from "../../../models/activity";
import {v4 as uuid} from 'uuid'

export default observer(function ActivityForm() {

    const {activityStore} = useStore();
    const {createActivity, updateActivity,selectedActivity,loading,loadingIntial,loadActivity} = activityStore;

    const {id} = useParams();
    const navigate = useNavigate();   
    
    const [activity,setActivity] = useState<Activity>({
      id:'',
      title:'',
      description:'',
      category:'',
      date:'',
      city:'',
      venue:''
  });

  useEffect(()=>{
    if(id) loadActivity(id).then(activity=>setActivity(activity!));
  },[id,loadActivity])

    function handleFormSubmit(){
      if(!activity.id){
        activity.id = uuid();
        createActivity(activity).then(()=> navigate(`/activities/${activity.id}`))
      }
      else{
        updateActivity(activity).then(()=> navigate(`/activities/${activity.id}`))
      }
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement |HTMLTextAreaElement>){
        const{name,value} = event.target;
        setActivity({...activity, [name]: value})
    }

    if(loadingIntial) return <LoadingComponent content="Loading content....."/>

  return (
    <Segment clearing>
      <Form onSubmit={handleFormSubmit} autoComplete='off'>
        <Form.Input  placeholder="Title" name='title' value={activity?.title} onChange={handleInputChange} />
        <Form.TextArea placeholder="Description" name='description' value={activity?.description} onChange={handleInputChange} />
        <Form.Input placeholder="Category" name='category' value={activity?.category} onChange={handleInputChange}/>
        <Form.Input placeholder="Date" type="date" name='date' value={activity?.date} onChange={handleInputChange} />
        <Form.Input placeholder="City" name='city' value={activity?.city} onChange={handleInputChange} />
        <Form.Input placeholder="Venue" name='venue' value={activity?.venue} onChange={handleInputChange}/>
        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
        <Button as={Link} to={'/activities'}  floated="right" type="submit" content="Cancel" />
      </Form>
    </Segment>
  );
})
