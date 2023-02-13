
import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, List, ListItem } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Activity } from "../../../models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];  
  createOrEditActivity: (activity: Activity) =>void;
  deleteActivity:(id:string) => void;
  submitting: boolean
}

export default observer (function ActivityDashboard({ activities, createOrEditActivity,deleteActivity,submitting }: Props) {
    const {activityStore} = useStore();
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList 
            activities={activities}
            deleteActivity = {deleteActivity} 
            submitting ={submitting}
            />
      </Grid.Column>

      <Grid.Column width="6">
        {activityStore.selectedActivity && !activityStore.editMode && <ActivityDetails  />}
        
        {activityStore.editMode && <ActivityForm createOrEditActivity= {createOrEditActivity} submitting={submitting} />}
      </Grid.Column>
    </Grid>
  );
})
