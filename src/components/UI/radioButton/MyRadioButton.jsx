import classes from './MyRadioButton.module.css'
export const MyRadioButton = (props) =>{
    return (
        <input {...props} type="radio" name='paymentSelection' className={classes.myRadioButton} value='ann'/>
    )
}