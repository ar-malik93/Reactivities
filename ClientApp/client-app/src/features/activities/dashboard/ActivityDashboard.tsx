import React from "react";
import { Grid, List, ListItem } from "semantic-ui-react";
import { Activity } from "../../../models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  selectedActivity :Activity | undefined;
  selectActivity: (id:string) => void;
  cancelActivity:() => void;
  editMode: boolean;
  formOpen: (id:string) =>void;
  formClose: () => void;
  createOrEditActivity: (activity: Activity) =>void;
  deleteActivity:(id:string) => void;
  submitting: boolean
}

export default function ActivityDashboard({ activities, selectedActivity,selectActivity, cancelActivity,editMode, formOpen, formClose,createOrEditActivity,deleteActivity,submitting }: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList 
            activities={activities}
            selectActivity ={selectActivity}
            deleteActivity = {deleteActivity} 
            submitting ={submitting}
            />
      </Grid.Column>

      <Grid.Column width="6">
        {selectedActivity && !editMode && <ActivityDetails activity={selectedActivity} cancelActivity ={cancelActivity} formOpen={formOpen}  />}
        
        {editMode && <ActivityForm formClose= {formClose} activity={selectedActivity} createOrEditActivity= {createOrEditActivity} submitting={submitting} />}
      </Grid.Column>
    </Grid>
  );
}
