import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid, List, ListItem } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const {loadActivities, activityRegistry} = activityStore

  useEffect(() => {
    if(activityRegistry.size<=1) loadActivities(); 
  }, [loadActivities,activityRegistry.size]);

  if (activityStore.loadingIntial) {
    return <LoadingComponent content="Loading App..." />;
  }
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>

      <Grid.Column width="6">
        <h2>Activity Filters</h2>
      </Grid.Column>
    </Grid>
  );
});
