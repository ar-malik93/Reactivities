import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Activity } from "../../../models/activity";

interface Props {
  activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {
  const [Target, setTarget] = useState("");
  const { activityStore } = useStore();
  const { deleteActivity, activitiesByDate: activities } = activityStore;

  function handleActivityDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
            <Icon name='clock' /> {activity.date}
            <Icon name='marker' /> {activity.venue}
        </span>
      </Segment>
      <Segment secondary>
        Attendensee go here
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button as={Link}
        to={`/activities/${activity.id}`} 
        color='teal'
        floated='right'
        content='View' />
      </Segment>
    </Segment.Group>
  );
}
