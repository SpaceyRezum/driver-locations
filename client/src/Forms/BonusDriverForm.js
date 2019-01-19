import React, { PureComponent } from 'react';
import styles from './Form.module.css';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

class BonusDriverForm extends PureComponent {
    render() {
        const { x, y, display, toggleDisplay, changeHandler, saveHandler} = this.props;
        return (
            <form className={styles.form}>
                <h2 className={styles.formTitle}>Coordinates of our bonus driver</h2>
                <FormControl className={styles.formElement}>
                    <InputLabel htmlFor="bonusdriver-x-coordinate">X Coordinate</InputLabel>
                    <Input className={styles.inputRight} min="0" max="200" type="number" name="x" id="bonusdriver-x-coordinate" value={x} onChange={changeHandler}/>
                </FormControl>
                <FormControl className={styles.formElement}>
                    <InputLabel htmlFor="bonusdriver-y-coordinate">Y Coordinate</InputLabel>
                    <Input className={styles.inputRight} min="0" max="200" type="number" name="y" id="bonusdriver-y-coordinate" value={y} onChange={changeHandler}/>
                </FormControl>

                <FormControlLabel
                    className={styles.formCheckbox}
                    control={
                        <Checkbox
                            checked={display}
                            onChange={toggleDisplay}
                            name="bonus"
                            classes={{ root: styles.colorOrange, checked: styles.colorOrange }}
                        />
                    }
                    label="Display Bonus Driver"
                />

                <Button className={styles.formElement} variant="contained" onClick={saveHandler}>Save</Button>
            </form>
        )
    }
}

export default BonusDriverForm;