import { useState, useContext } from 'react';

import { Button, TextField, Box } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { EntriesContext } from 'context/entries';
import { UIContext } from 'context/ui';

export const NewEntry = () => {

    const { addNewEntry } = useContext(EntriesContext);
    const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

    const [inputValue, setInputValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const onSave = () => {
        if (inputValue.length === 0) return;
        addNewEntry(inputValue);
        setInputValue('');
        setIsAddingEntry(false);
    }

    return (
        <Box sx={{ marginBottom: 2, paddingX: 1 }} >

            {
                isAddingEntry ? (
                    <>
                        <TextField
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            placeholder="Nueva entrada"
                            autoFocus
                            multiline
                            label='Nueva entrada'
                            helperText={isTouched && inputValue.length === 0 && 'Ingrese un valor'}
                            error={isTouched && inputValue.length === 0}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onBlur={() => setIsTouched(true)}
                        />

                        <Box display='flex' justifyContent='space-between' sx={{ marginTop: 2 }} >

                            <Button
                                variant="text"
                                onClick={() => { setIsAddingEntry(false); setInputValue(''); setIsTouched(false) }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                endIcon={<SaveOutlinedIcon />}
                                onClick={onSave}
                            >
                                Guardar
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Button
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                        fullWidth
                        variant="outlined"
                        onClick={() => setIsAddingEntry(true)}
                    >
                        Agregar tarea
                    </Button>
                )
            }

        </Box>
    )
}
