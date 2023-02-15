import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button,  Card, Grid, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { Activity } from "../../../models/activity";
import ActivityDetailChat from "./ActivityDetailChat";
import ActivityDetailHeader from "./ActivityDetailHeader";
import ActivityDetailInfo from "./ActivityDetailInfo";
import ActivityDetailSideBar from "./ActivityDetailSidebar";


export default observer(function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity:activity, loadActivity, loadingIntial} = activityStore;

    const{id} = useParams();

    useEffect(()=> {
      if(id) { loadActivity(id);}
    },[id,loadActivity])

    if(loadingIntial || !activity) return <LoadingComponent />;

  return (
  <Grid>
    <Grid.Column width={10}>
      <ActivityDetailHeader activity={activity} />
      <ActivityDetailInfo activity={activity} />
      <ActivityDetailChat />
    </Grid.Column>
    <Grid.Column width={6}>
      <ActivityDetailSideBar />
    </Grid.Column>
  </Grid>

  );
})
