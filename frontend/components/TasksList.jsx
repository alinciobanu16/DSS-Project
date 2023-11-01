import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

const TASKS = [
  {
    id: 0,
    name: `Download project and run 'npm install' and 'npm run dev'.`,
  },
  {
    id: 1,
    name: `Link the home page and the '/tasks' page together (the tasks page should be reachable from the home page and vice-versa).`,
  },
  {
    id: 2,
    name: `Create an SSR page at '/cats' that displays 3 random cat facts. Use a dedicated Fact component.`,
  },
  {
    id: 3,
    name: `Create an SSG page at '/cats/breeds/' that displays the first 10 breeds in alphabetic order. Use a dedicated Breed component.`,
  },
  {
    id: 4,
    name: `Create a layout for your entire application that adds a header containing a cat logo for all of your pages (you already have the logo in the public directory).`,
  },
  {
    id: 5,
    name: `Link the homepage with the '/cats' page using the 'Link' component and the '/cats/breeds' page using the 'useRouter' hook.`,
  },
  {
    id: 6,
    name: `Create a page at '/dynamic-tasks' that is identical to the '/tasks' page, but it loads the 'TasksList' component dynamically, on the client side.`,
  },
  {
    id: 7,
    name: `Build your application using 'npm run build' and then start your production-ready application using 'npm run start'.`,
  },
  {
    id: 8,
    name: `Open the '/tasks' and '/dynamic-tasks' pages on 2 separate tabs and inspect the page sources for both of them. Discuss your findings with the assistant.`,
  },
  {
    id: 9,
    name: `Create a custom 404 page.`,
  },
];

export default function TasksList() {
  const [checked, setChecked] = React.useState([TASKS[0].id]);

  const handleToggle = (id) => () => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {TASKS.map((task) => {
        const labelId = `checkbox-list-label-${task.id}`;
        return (
          <ListItem key={task.id} disablePadding>
            <ListItemButton onClick={handleToggle(task.id)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(task.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={task.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
