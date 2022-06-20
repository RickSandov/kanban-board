import { List, Paper } from "@mui/material"
import { EntryCard } from './EntryCard';
import { EntryStatus } from '../../interfaces/entry';
import { DragEvent, FC, useContext, useMemo } from "react";
import { EntriesContext } from '../../context/entries';
import { UIContext } from "context/ui";

import styles from './EntryList.module.css';

interface EntryListProps {
    status: EntryStatus

}

export const EntryList: FC<EntryListProps> = ({ status }) => {

    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging, endDragging } = useContext(UIContext);

    const filteredEntries = useMemo(() => entries.filter(entry => entry.status === status), [status, entries]);

    const allowDrop = (event: DragEvent) => {
        event.preventDefault();
    }

    const onDropEntry = (event: DragEvent) => {
        const id = event.dataTransfer.getData('text/plain');
        const entry = entries.find(e => e._id === id)!;
        entry.status = status;
        updateEntry(entry);
        endDragging();
    }

    return (
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ''}
        >
            <Paper sx={{ height: 'calc(100vh - 250px)', overflowY: 'scroll', backgroundColor: 'transparent', padding: '0 8px' }} >

                <List sx={{ opacity: isDragging ? 0.4 : 1, transition: 'all .3s ease-in-out' }} >
                    {
                        filteredEntries.map(entry => (
                            <EntryCard key={entry._id} entry={entry} />
                        ))
                    }
                </List>
            </Paper>
        </div >
    )
}
