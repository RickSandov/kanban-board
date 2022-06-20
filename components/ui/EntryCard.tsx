import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { UIContext } from 'context/ui';
import { Entry } from 'interfaces';
import { DragEvent, FC, useContext } from 'react';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const { startDragging, endDragging } = useContext(UIContext);

    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('text/plain', entry._id);

        //TODO modify state to indicate dragging
        startDragging();
    }

    const onDragEnd = (event: DragEvent) => {

        //TODO modify state to indicate not dragging
        endDragging();
    }

    return (
        <Card
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }} >
                        {entry.description}
                    </Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 2 }} >
                    <Typography variant='body2' >
                        hace 34 minutos
                    </Typography>
                </CardActions>
            </CardActionArea>

        </Card>
    )
};
