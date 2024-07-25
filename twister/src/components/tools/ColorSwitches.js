import * as React from 'react';
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

export default function ColorSwitches(props) {
    const checked = props.change;
    return (
        <div>
            <Switch {...label} checked={checked} onChange={props.func}/>
            
        </div>
    );
}